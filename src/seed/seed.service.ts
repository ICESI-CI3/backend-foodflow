/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { CategoryIngredient } from 'src/enum/category-ingredient.enum';
import { CategoryProduct } from 'src/enum/category-product.enum';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { OrderStatus } from 'src/enum/status_order.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as UUID } from 'uuid';

@Injectable()
export class SeedService {
  constructor(

    private readonly datasource: DataSource,
    @InjectRepository(Logistic) private logisticRepo: Repository<Logistic>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Ingredient) private ingredientRepo: Repository<Ingredient>,
    @InjectRepository(ProductToIngredient) private productToIngredientRepo: Repository<ProductToIngredient>,
    @InjectRepository(Location) private locationRepo: Repository<Location>

  ) { }

  async seed() {

    const logistic = await this.logisticRepo.find()
    //await this.logisticRepo.remove(logistic)

    const ingredients = await this.ingredientRepo.find()
    //await this.ingredientRepo.remove(ingredients)

    const locations = await this.locationRepo.find()
    //await this.locationRepo.remove(locations)

    const orders = await this.orderRepo.find()
    //await this.orderRepo.remove(orders)

    const products = await this.productRepo.find()
    //await this.productRepo.remove(products)

    const proToIng = await this.productToIngredientRepo.find()
    //await this.productToIngredientRepo.remove(proToIng)

    const loc1 = this.locationRepo.create({
      id: UUID(),
      name: "qbano",
      location: "Melendez",
    })
    loc1.slug = loc1.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    await this.locationRepo.save(loc1)

    const ing1 = this.ingredientRepo.create({
      id: UUID(), name: "salchicha", category: CategoryIngredient.CARNE_PESCADO, unitMeasurement: "und", quantity: 10, dangerQuantity: 3, purchasePrice: 2000, salePrice: 3000, location: loc1
    })
    ing1.slug = ing1.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing2 = this.ingredientRepo.create({
      id: UUID(), name: "pan", category: CategoryIngredient.HORNEAR, unitMeasurement: "und", quantity: 15, dangerQuantity: 2, purchasePrice: 1500, salePrice: 2500, location: loc1
    })
    ing2.slug = ing2.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing3 = this.ingredientRepo.create({
      id: UUID(), name: "cebolla", category: CategoryIngredient.VERDURAS, unitMeasurement: "kg", quantity: 5, dangerQuantity: 1, purchasePrice: 4500, salePrice: 7000, location: loc1
    })
    ing3.slug = ing3.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing4 = this.ingredientRepo.create({
      id: UUID(), name: "ripio", category: CategoryIngredient.OTROS, unitMeasurement: "und", quantity: 50, dangerQuantity: 10, purchasePrice: 3000, salePrice: 5000, location: loc1
    })
    ing4.slug = ing4.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing5 = this.ingredientRepo.create({
      name: "tomate", category: CategoryIngredient.VERDURAS, unitMeasurement: "kg", quantity: 8, dangerQuantity: 2, purchasePrice: 3700, salePrice: 6200, location: loc1
    })
    ing5.slug = ing5.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing6 = this.ingredientRepo.create({
      id: UUID(), name: "arroz", category: CategoryIngredient.PASTA_ARROZ_LEGUMBRES, unitMeasurement: "und", quantity: 20, dangerQuantity: 3, purchasePrice: 2000, salePrice: 3000, location: loc1
    })
    ing6.slug = ing6.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing7 = this.ingredientRepo.create({
      id: UUID(), name: "frijol", category: CategoryIngredient.PASTA_ARROZ_LEGUMBRES, unitMeasurement: "und", quantity: 15, dangerQuantity: 2, purchasePrice: 1500, salePrice: 2500, location: loc1
    })
    ing7.slug = ing7.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing8 = this.ingredientRepo.create({
      id: UUID(), name: "carne", category: CategoryIngredient.CARNE_PESCADO, unitMeasurement: "kg", quantity: 15, dangerQuantity: 4, purchasePrice: 8000, salePrice: 12000, location: loc1
    })
    ing8.slug = ing8.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const ing9 = this.ingredientRepo.create({
      id: UUID(), name: "papas", category: CategoryIngredient.OTROS, unitMeasurement: "kg", quantity: 20, dangerQuantity: 5, purchasePrice: 3000, salePrice: 5000, location: loc1
    })
    ing9.slug = ing9.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    await this.ingredientRepo.save(ing1)
    await this.ingredientRepo.save(ing2)
    await this.ingredientRepo.save(ing3)
    await this.ingredientRepo.save(ing4)
    await this.ingredientRepo.save(ing5)
    await this.ingredientRepo.save(ing6)
    await this.ingredientRepo.save(ing7)
    await this.ingredientRepo.save(ing8)
    await this.ingredientRepo.save(ing9)

    const log1 = this.logisticRepo.create({
      id: UUID(),
      name: "Logistica 1",
      location: loc1,
      ingredients: [
        ing1, ing2, ing3
      ]
    })

    log1.slug = log1.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 
    log1.totalPrice = ing1.purchasePrice + ing2.purchasePrice + ing3.purchasePrice

    const log2 = this.logisticRepo.create({
      id: UUID(),
      name: "Logistica 2",
      location: loc1,
      ingredients: [
        ing4, ing5
      ]
    })

    log2.slug = log2.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 
    log2.totalPrice = ing4.purchasePrice + ing5.purchasePrice

    const log3 = this.logisticRepo.create({
      id: UUID(),
      name: "Logistica 3",
      location: loc1,
      ingredients: [
        ing6, ing7, ing8, ing9
      ]
    })

    log3.slug = log3.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 
    log3.totalPrice = ing6.purchasePrice + ing7.purchasePrice + ing8.purchasePrice + ing9.purchasePrice

    await this.logisticRepo.save(log1)
    await this.logisticRepo.save(log2)
    await this.logisticRepo.save(log3)

    const prod1 = this.productRepo.create({
      id: UUID(),
      name: "perro caliente",
      description: "Perro sencillo",
      price: 17500,
      category: CategoryProduct.PLATOS_FUERTES,
    })
    prod1.slug = prod1.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const prod2 = this.productRepo.create({
      id: UUID(),
      name: "Almuerzo caleño",
      description: "Almuerzo caleño simple con una combinación de sabores única",
      price: 30000,
      category: CategoryProduct.PLATOS_FUERTES,
    })
    prod2.slug = prod2.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    const prod3 = this.productRepo.create({
      id: UUID(),
      name: "Ensalada robo",
      description: "Ensalada muy simple",
      price: 10000,
      category: CategoryProduct.PLATOS_FUERTES,
    })
    prod3.slug = prod3.name.toLowerCase().replaceAll(' ','-').replaceAll("'",'') 

    await this.productRepo.save(prod1)
    await this.productRepo.save(prod2)
    await this.productRepo.save(prod3)

    const prodToIng1_1 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing1,
      ingredientId: ing1.id,
      product: prod1,
      productId: prod1.id
    })
    const prodToIng1_2 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing2,
      ingredientId: ing2.id,
      product: prod1,
      productId: prod1.id
    })
    const prodToIng1_4 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing4,
      ingredientId: ing4.id,
      product: prod1,
      productId: prod1.id
    })

    const prodToIng1_3 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing3,
      ingredientId: ing3.id,
      product: prod3,
      productId: prod3.id
    })
    const prodToIng1_5 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing5,
      ingredientId: ing5.id,
      product: prod3,
      productId: prod3.id
    })

    const prodToIng2_1 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing6,
      ingredientId: ing6.id,
      product: prod2,
      productId: prod2.id
    })
    const prodToIng2_2 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing7,
      ingredientId: ing7.id,
      product: prod2,
      productId: prod2.id
    })
    const prodToIng2_3 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing8,
      ingredientId: ing8.id,
      product: prod2,
      productId: prod2.id
    })
    const prodToIng2_4 = this.productToIngredientRepo.create({
      id: UUID(),
      ingredient: ing9,
      ingredientId: ing9.id,
      product: prod2,
      productId: prod2.id
    })

    await this.productToIngredientRepo.save(prodToIng1_1)
    await this.productToIngredientRepo.save(prodToIng1_2)
    await this.productToIngredientRepo.save(prodToIng1_3)
    await this.productToIngredientRepo.save(prodToIng1_4)
    await this.productToIngredientRepo.save(prodToIng1_5)
    await this.productToIngredientRepo.save(prodToIng2_1)
    await this.productToIngredientRepo.save(prodToIng2_2)
    await this.productToIngredientRepo.save(prodToIng2_3)
    await this.productToIngredientRepo.save(prodToIng2_4)

    const ord1 = this.orderRepo.create({
      id: UUID(),
      name: "orden 1",
      tableNumber: 1,
      status: OrderStatus.CREATE,
      products: [
        prod1,
        prod3
      ]
    })

    const ord2 = this.orderRepo.create({
      id: UUID(),
      name: "orden 2",
      tableNumber: 2,
      status: OrderStatus.CREATE,
      products: [
        prod2
      ]
    })

    await this.orderRepo.save(ord1)
    await this.orderRepo.save(ord2)

    return 'seed complete'

  }

}