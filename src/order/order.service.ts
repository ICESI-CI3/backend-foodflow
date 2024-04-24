/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { AddDeleteOrderProductDto } from './dto/add_delete_order-product.dto';

@Injectable()
export class OrderService {

  constructor(

    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Ingredient) private ingrRepo: Repository<Ingredient>,
    @InjectRepository(ProductToIngredient) private productToIngredientRepo: Repository<ProductToIngredient>

  ){}

  async findAll() {

    this.findAllProducts()

    const orders = await this.orderRepo.find({relations: ["products"]})

    if (orders.length === 0) {

      throw new NotFoundException('No hay ordenes creadas');

    }

    return orders;

  }

  findOne(id: any) {

    this.findAllProducts()

    const order = this.orderRepo.findOne({relations: ["products"], where: {id: id}})

    if (!order) {

      throw new NotFoundException(`Orden con id "${id}" no encontrada`);

    }

    return order;

  }

  async findAllProducts () {

    const productCheck = await this.productRepo.find({relations: ["order"]});

    if (productCheck.length === 0) {

      throw new NotFoundException("Al menos un producto debe ser creado");

    }

    return productCheck;

  }

  async create(createOrderDto: CreateOrderDto) {

    this.findAllProducts()

    const orders = await this.orderRepo.find({relations: ["products"]})

    for (let i = 0; i < orders.length; i++) {

      if (createOrderDto.tableNumber === orders[i].tableNumber) {

        throw new BadRequestException(`Orden con el número de mesa "${createOrderDto.tableNumber}" ya existe`);

      }

    }

    const products = await this.productRepo.find({where: {name: createOrderDto.products.find(i => i)}})

    if (!products) {

      throw new NotFoundException("Productos con esos nombres no existen");

    }

    this.saleProduct(products);

    let order = new Order();
    order.name = createOrderDto.name;
    order.tableNumber = createOrderDto.tableNumber;
    order.status = createOrderDto.status;
    order.products = products;

    return await this.orderRepo.save(order);
    
  }

  async update(id: any, updateOrderDto: UpdateOrderDto) {

    const order = await this.orderRepo.findOneBy({id: id});

    if (!order) {

      throw new NotFoundException("Orden no encontrada");

    }

    const updatedOrder = new Order()
    updatedOrder.id = updateOrderDto.id;
    updatedOrder.name = updateOrderDto.name;
    updatedOrder.status = updateOrderDto.status;

    this.orderRepo.merge(order, updatedOrder)

    return await this.orderRepo.save(order);

  }

  async remove(id: any) {

    const order = await this.orderRepo.findOne({where: {id: id}, relations: ["products"]});

    if (!order) {

      throw new NotFoundException("Orden no encontrada");

    }

    return await this.orderRepo.remove(order);

  }

  //TODO: No estoy seguro si se debería poder añadir un producto luego de creada la orden, igual con borrar un producto
  
  async addProduct(orderId: any, productNames: AddDeleteOrderProductDto) {

    const order = await this.orderRepo.findOne({ relations: ['products'], where: {id: orderId} });

    if (!order) {

      throw new NotFoundException('Orden no encontrada');

    }

    this.findAllProducts()

    let products = []

    for (let i = 0; i < productNames.products.length; i++) {

      products.push(await this.productRepo.findOne({where: {name: productNames.products[i].name}}));

    }

    if (products.length == 0) {

      throw new NotFoundException("Productos con esos nombres no existen")

    }

    order.products.map(productsExist => {

      products.map(product => {

        if (productsExist.name === product.name) {

          throw new ConflictException('Producto ya existente');

        } else {

          order.products.push(product);

        }

      })

    })
    
    await this.orderRepo.save(order);

  }


  async deleteOrder(orderId: any, productNames: AddDeleteOrderProductDto) {

    const order = await this.orderRepo.findOne({ relations: ['products'], where: {id: orderId} });

    if (!order) {

      throw new NotFoundException('Order not found');

    }

    this.findAllProducts()

    let products = []

    for (let i = 0; i < productNames.products.length; i++) {

      products.push(await this.productRepo.findOne({where: {name: productNames.products[i].name}}));

    }

    if (products.length == 0) {

      throw new NotFoundException("Products with those names not exist")

    }

    order.products = order.products.filter(oToP => {

      const productsIdsToDelete = products.map(prd => prd.id);

      return !productsIdsToDelete.includes(oToP.id);

    });

    return await this.orderRepo.save(order);

  }

  //Methods of funciontality

  async saleProduct(products: Product[]) {

    const product_ingredient = await this.productToIngredientRepo.find({where: {productId: products.find(i => i).id}})

    let ingredients: Ingredient[] = await this.ingrRepo.find({where: {id: product_ingredient.find(i => i).ingredientId}})

    for (let j = 0; j < ingredients.length; j++) {

      let currentIngredientSave = ingredients[j]

      if (product_ingredient[j].ingredientId == currentIngredientSave.id) {

        currentIngredientSave.quantity = currentIngredientSave.quantity - product_ingredient[j].quantityIngredient

        this.ingrRepo.merge(ingredients[j], currentIngredientSave)
  
        this.ingrRepo.save(currentIngredientSave)
  
      }

    }

    return

  }

}
