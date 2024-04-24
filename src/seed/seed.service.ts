/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Location } from 'src/location/entities/location.entity';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from 'src/order/entities/order.entity';
import { CategoryIngredient } from 'src/enum/category-ingredient.enum';
import { CategoryProduct } from 'src/enum/category-product.enum';
import { ProductToIngredient } from 'src/product/entities/productToIngredient.entity';
import { OrderStatus } from 'src/enum/status_order.enum';
import { User } from 'src/auth/entities/user.entity';
import { ValidRoles } from 'src/auth/interfaces/valid-role';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(private readonly datasource: DataSource){}

  async seed() {

    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

        const locationRepo = queryRunner.manager.getRepository(Location)
        const logisticRepo = queryRunner.manager.getRepository(Logistic)
        const ingredientRepo = queryRunner.manager.getRepository(Ingredient)
        const productRepo = queryRunner.manager.getRepository(Product)
        const orderRepo = queryRunner.manager.getRepository(Order)
        const productToIngredientRepo = queryRunner.manager.getRepository(ProductToIngredient)
        const userRepo = queryRunner.manager.getRepository(User)

        const locations = await locationRepo.find()
        await locationRepo.remove(locations)

        const logistic = await logisticRepo.find()
        await logisticRepo.remove(logistic)

        const ingredients = await ingredientRepo.find()
        await ingredientRepo.remove(ingredients)

        const products = await productRepo.find()
        await productRepo.remove(products)

        const orders = await orderRepo.find()
        await orderRepo.remove(orders)

        const productToIngredients = await productToIngredientRepo.find()
        await productToIngredientRepo.remove(productToIngredients)

        const users = await userRepo.find()
        await userRepo.remove(users)

        const user1 = userRepo.create({

          fullName: "María García",
          email: "maria.garcia@example.com",
          password: "B8p#sUq!m2",
          roles: [ValidRoles.admin]

        })
        const user2 = userRepo.create({

          fullName: "Alejandro Martínez",
          email: "alejandro.martinez@example.com",
          password: "X6d@rNt#p9",
          roles: [ValidRoles.mesero]

        })
        const user3 = userRepo.create({

          fullName: "Laura Rodríguez",
          email: "laura.rodriguez@example.com",
          password: "T3g$mPv@k7",
          roles: [ValidRoles.chef]

        })
        const user4 = userRepo.create({

          fullName: "Juan Pérez",
          email: "juan.perez@example.com",
          password: "H4k@wQx8f",
          roles: [ValidRoles.superUser]

        })
        const user5 = userRepo.create({

          fullName: "Ana López",
          email: "ana.lopez@example.com",
          password: "R9v#pLb$z3",
          roles: [ValidRoles.mesero]

        })
        const user6 = userRepo.create({

          fullName: "Carlos Sánchez",
          email: "carlos.sanchez@example.com",
          password: "Y7s@fPx2kW",
          roles: [ValidRoles.chef]

        })

        user1.password = bcrypt.hashSync(user1.password, 15)
        user2.password = bcrypt.hashSync(user2.password, 15)
        user3.password = bcrypt.hashSync(user3.password, 15)
        user4.password = bcrypt.hashSync(user4.password, 15)
        user5.password = bcrypt.hashSync(user5.password, 15)
        user6.password = bcrypt.hashSync(user6.password, 15)

        await userRepo.save([user1, user2, user3, user4, user5, user6])

        const loc1 = locationRepo.create({
          name: "qbano", 
          location: "Melendez"
        })

        await locationRepo.save([loc1])

        const ing1 = ingredientRepo.create({
          name: "salchicha", category: CategoryIngredient.CARNE_PESCADO, unitMeasurement: "und", quantity: 10, dangerQuantity: 3, purchasePrice: 2000, salePrice: 3000, location: loc1    
        })
        const ing2 = ingredientRepo.create({
          name: "pan", category: CategoryIngredient.HORNEAR, unitMeasurement: "und", quantity: 15, dangerQuantity: 2, purchasePrice: 1500, salePrice: 2500, location: loc1    
        })
        const ing3 = ingredientRepo.create({
          name: "cebolla", category: CategoryIngredient.VERDURAS, unitMeasurement: "kg", quantity: 5, dangerQuantity: 1.5, purchasePrice: 4500, salePrice: 7000, location: loc1    
        })
        const ing4 = ingredientRepo.create({
          name: "ripio", category: CategoryIngredient.OTROS, unitMeasurement: "und", quantity: 50, dangerQuantity: 10, purchasePrice: 3000, salePrice: 5000, location: loc1    
        })
        const ing5 = ingredientRepo.create({
          name: "tomate", category: CategoryIngredient.VERDURAS, unitMeasurement: "kg", quantity: 8, dangerQuantity: 2, purchasePrice: 3700, salePrice: 6200, location: loc1    
        })

        const ing6 = ingredientRepo.create({
          name: "arroz", category: CategoryIngredient.PASTA_ARROZ_LEGUMBRES, unitMeasurement: "und", quantity: 20, dangerQuantity: 3, purchasePrice: 2000, salePrice: 3000, location: loc1    
        })
        const ing7 = ingredientRepo.create({
          name: "frijol", category: CategoryIngredient.PASTA_ARROZ_LEGUMBRES, unitMeasurement: "und", quantity: 15, dangerQuantity: 2, purchasePrice: 1500, salePrice: 2500, location: loc1    
        })
        const ing8 = ingredientRepo.create({
          name: "carne", category: CategoryIngredient.CARNE_PESCADO, unitMeasurement: "kg", quantity: 15, dangerQuantity: 4, purchasePrice: 8000, salePrice: 12000, location: loc1    
        })
        const ing9 = ingredientRepo.create({
          name: "papas", category: CategoryIngredient.OTROS, unitMeasurement: "kg", quantity: 20, dangerQuantity: 5, purchasePrice: 3000, salePrice: 5000, location: loc1 
        })

        await ingredientRepo.save([ing1, ing2, ing3, ing4, ing5, ing6, ing7, ing8, ing9])
      
        const log1 = logisticRepo.create({
          name: "Logistica 1",
          location: loc1,
          ingredients: [
            ing1, ing2, ing3
          ]
        })
        const log2 = logisticRepo.create({
          name: "Logistica 2",
          location: loc1,
          ingredients: [
            ing4, ing5
          ]
        })

        const log3 = logisticRepo.create({
          name: "Logistica 1",
          location: loc1,
          ingredients: [
            ing6, ing7, ing8, ing9
          ]
        })

        await logisticRepo.save([log1, log2, log3])

        const prod1 = productRepo.create({
          name: "perro caliente",
          description: "Perro sencillo",
          price: 17500,
          category: CategoryProduct.PLATOS_FUERTES,
        })
        const prod2 = productRepo.create({
          name: "Almuerzo caleño",
          description: "Almuerzo caleño simple con una combinación de sabores única",
          price: 30000,
          category: CategoryProduct.PLATOS_FUERTES,
        })
        const prod3 = productRepo.create({
          name: "Ensalada robo",
          description: "Ensalada muy simple",
          price: 10000,
          category: CategoryProduct.PLATOS_FUERTES,
        })

        await productRepo.save([prod1, prod2])

        const prodToIng1_1 = productToIngredientRepo.create({
          ingredient: ing1,
          ingredientId: ing1.id,
          product: prod1,
          productId: prod1.id
        }) 
        const prodToIng1_2 = productToIngredientRepo.create({
          ingredient: ing2,
          ingredientId: ing2.id,
          product: prod1,
          productId: prod1.id
        }) 
        const prodToIng1_4 = productToIngredientRepo.create({
          ingredient: ing4,
          ingredientId: ing4.id,
          product: prod1,
          productId: prod1.id
        }) 

        const prodToIng1_3 = productToIngredientRepo.create({
          ingredient: ing3,
          ingredientId: ing3.id,
          product: prod3,
          productId: prod3.id
        })
        const prodToIng1_5 = productToIngredientRepo.create({
          ingredient: ing5,
          ingredientId: ing5.id,
          product: prod3,
          productId: prod3.id
        }) 

        const prodToIng2_1 = productToIngredientRepo.create({
          ingredient: ing6,
          ingredientId: ing6.id,
          product: prod2,
          productId: prod2.id
        })
        const prodToIng2_2 = productToIngredientRepo.create({
          ingredient: ing7,
          ingredientId: ing7.id,
          product: prod2,
          productId: prod2.id
        })
        const prodToIng2_3 = productToIngredientRepo.create({
          ingredient: ing8,
          ingredientId: ing8.id,
          product: prod2,
          productId: prod2.id
        }) 
        const prodToIng2_4 = productToIngredientRepo.create({
          ingredient: ing9,
          ingredientId: ing9.id,
          product: prod2,
          productId: prod2.id
        }) 

        await productToIngredientRepo.save([prodToIng1_1, prodToIng1_2, prodToIng1_4, prodToIng1_3, prodToIng1_5, prodToIng2_1, prodToIng2_2, prodToIng2_3, prodToIng2_4])
      
        const ord1 = orderRepo.create({
          name: "orden 1",
          tableNumber: 1,
          status: OrderStatus.CREATE,
          products: [
            prod1,
            prod3
          ]
        })
        const ord2 = orderRepo.create({
          name: "orden 1",
          tableNumber: 1,
          status: OrderStatus.CREATE,
          products: [
            prod2
          ]
        }) 

        await orderRepo.save([ord1, ord2])
  
        await queryRunner.commitTransaction();

    } catch(error){

      await queryRunner.rollbackTransaction();
      throw error;
      return HttpCode(500)
      
    } finally {

      await queryRunner.release();
      return 'The seeder was succesful';

    }

  }

}
