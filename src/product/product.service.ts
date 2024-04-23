/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
//import { Product } from 'src/product/entities/product.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as UUID } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import  { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { AddDeleteProductIngredientDto } from './dto/add_delete_product-ingredient.dto';
import { ProductToIngredient } from './entities/productToIngredient.entity';

@Injectable()
export class ProductService {

  constructor (

    @InjectRepository(Product)  private productRepo: Repository<Product>,
    @InjectRepository(Ingredient) private ingredientRepo :  Repository <Ingredient>,
    @InjectRepository(ProductToIngredient) private  productToIngredientRepo : Repository <ProductToIngredient>

  ){}

  async findAll() {

    this.findAllIngredient()
    
    const products = await this.productRepo.find({relations: ["productToIngredient", "order"]})

    if (products.length === 0) {

      throw new NotFoundException('No hay productos creados');

    }

    return products;

  }

  async findOneById(id: any) {

    this.findAllIngredient()
    
    const product = this.productRepo.findOne({relations: ["productToIngredient", "order"], where: {id: id}})

    if (!product) {

      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);

    }

    return product;

  }

  async findAllIngredient () {

    const ingredientCheck = await this.ingredientRepo.find();

    if (ingredientCheck.length === 0) {

      throw new NotFoundException("Al menos un ingrediente debe existir para crear productos");

    }

    return ingredientCheck;

  }

  async create(createProductDto: CreateProductDto) {

    this.findAllIngredient()
    
    const existingProduct = await this.productRepo.findOneBy({ name: createProductDto.name });
    
    if (existingProduct) {

      throw new ConflictException(`Ingrediente con nombre "${createProductDto.name}" ya existe`);

    }

    let ingredientNames = []

    for (let i = 0; i < createProductDto.productToIngredient.length; i++) {

      ingredientNames.push(await this.ingredientRepo.findOne({where: {name: createProductDto.productToIngredient[i].name}}));

    }

    if (!ingredientNames) {

      throw new NotFoundException("Ingredientes con esos nombres no existen");

    }

    const product = new Product()
    product.id = UUID()
    product.name = createProductDto.name
    product.description = createProductDto.description
    product.price = createProductDto.price
    product.category = createProductDto.category

    let tablePI = ingredientNames.map(ingredient =>{
      let current = createProductDto.productToIngredient.find(i => { return i.name == ingredient.name});
      return this.productToIngredientRepo.create(
        {
          productId: product.id, 
          product: product,
          ingredientId: ingredient.id,
          ingredient: ingredient, 
          quantityIngredient: current.quantityIngredient
        }
      ) 
    })
    

    product.productToIngredient = tablePI; 

    await this.productRepo.save(product);

    await this.productToIngredientRepo.save(tablePI)

    return

  }

  async update(id: any, updateProductDto: UpdateProductDto) {
    
    const product = await this.productRepo.findOneBy({id: id});

    if (!product) {

      throw new NotFoundException('Producto no encontrado');

    }

    const updatedProduct = new Product()
    updatedProduct.name = updateProductDto.name;
    updatedProduct.description = updateProductDto.description;
    updatedProduct.price = updateProductDto.price;
    updatedProduct.category = updateProductDto.category; 

    this.productRepo.merge(product, updatedProduct);

    return this.productRepo.save(product);
  }


  async addIngredient(productId: any, ingredientNames: AddDeleteProductIngredientDto) {

    const product = await this.productRepo.findOne({ relations: ['productToIngredient'], where: {id: productId} });

    if (!product) {

      throw new NotFoundException('Producto no encontrado');

    }

    this.findAllIngredient()

    let ingredients = []

    for (let i = 0; i < ingredientNames.ingredients.length; i++) {

      ingredients.push(await this.ingredientRepo.findOne({where: {name: ingredientNames.ingredients[i].name}}));

    }

    let tablePI = ingredients.map(ingredient =>{
      let current = ingredientNames.ingredients.find(i => { return i.name == ingredient.name});
      return this.productToIngredientRepo.create(
        {
          productId: product.id, 
          product: product,
          ingredientId: ingredient.id,
          ingredient: ingredient, 
          quantityIngredient: current.quantityIngredient
        }
      ) 
    })

    tablePI.map(ingredient => {

      product.productToIngredient.map(productToIngredient => {

        if (productToIngredient.ingredientId === ingredient.ingredientId) {

          throw new ConflictException('Ingrediente ya existente');

        }

      })

    })

    product.productToIngredient.push(...tablePI);
    
    await this.productRepo.save(product);

    return await this.productToIngredientRepo.save(tablePI);

  }


  async deleteIngredient(productId: any, ingredientNames: AddDeleteProductIngredientDto) {

    const product = await this.productRepo.findOne({ relations: ['productToIngredient'], where: {id: productId} });

    if (!product) {

      throw new Error('Producto no encontrado');

    }

    this.findAllIngredient()

    let ingredients = []

    for (let i = 0; i < ingredientNames.ingredients.length; i++) {

      ingredients.push(await this.ingredientRepo.findOne({where: {name: ingredientNames.ingredients[i].name}}));

    }


    if (ingredients.length == 0) {

      throw new NotFoundException("El ingrediente ingresado no existe")

    }

    const ingredientToDelete = await this.productToIngredientRepo.find({where: {ingredientId: ingredients.find(i => i.id).id, productId: product.id}})

    if (ingredientToDelete.length == 0) {

      throw new ConflictException("El ingrediente no existe en este producto")

    }

    product.productToIngredient = product.productToIngredient.filter(pToi => {

      const ingredientIdsToDelete = ingredientToDelete.map(ing => ing.ingredientId);

      return !ingredientIdsToDelete.includes(pToi.ingredientId);

    });

    await this.productToIngredientRepo.remove(ingredientToDelete);
    
    await this.productRepo.save(product);

    return await this.productToIngredientRepo.save(product.productToIngredient)

  }


  async remove(productId: any) {
    
    const product = await this.productRepo.findOne({ relations: ['productToIngredient'], where: {id: productId} });

    if (!product) {

      throw new Error('Producto no encontrado');

    }

    await this.productRepo.remove(product);

  }

}
