/* eslint-disable prettier/prettier */
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {

    constructor(

        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Ingredient) private ingrRepo: Repository<Ingredient>,
        @InjectRepository(ProductToIngredient) private productToIngredientRepo: Repository<ProductToIngredient>

    ){}

    async findAll() {

        const products = await this.productRepo.find({relations: ["productToIngredient"]})

        if (products.length === 0) {

            throw new NotFoundException('No hay productos creados');

        }

        const product_ingredient: ProductToIngredient [] = await this.productToIngredientRepo.find()

        const ingredients = await this.ingrRepo.find();

        const productsNotToShow = [] as string[]

        for (let i = 0; i < product_ingredient.length; i++) {

            for (let j = 0; j < ingredients.length; j++) {

                if (product_ingredient[i].ingredientId === ingredients[j].id) {

                    if (ingredients[j].quantity <= ingredients[j].dangerQuantity) {

                        productsNotToShow.push(product_ingredient[i].productId)

                    }

                }

            }

        }

        const productsToShow = products.filter(product => product.id != productsNotToShow.find(i => i))

        return productsToShow;

    }

    async findOne(id: any) {

        const product = await this.productRepo.findOne({relations: ["productToIngredient"], where: {id: id}})

        if (!product) {

            throw new NotFoundException(`Producto con ID "${id}" no encontrado`);

        }

        return product;

    }

}
