/* eslint-disable prettier/prettier */
import { CategoryProduct } from 'src/enum/category-product.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, BeforeInsert} from "typeorm";
import { ProductToIngredient } from './productToIngredient.entity';
import { Order } from 'src/order/entities/order.entity';

@Entity()
export class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {unique: true, nullable: false})
  name: string;

  @Column('text', {nullable: true})
  description: string;

  @Column('money', {nullable: false})
  price: number;

  @Column('text', {unique: true})
  slug: string
  
  @Column({
    type: "enum",
    enum: CategoryProduct,
    nullable: false,
  })
  category: CategoryProduct;

  @OneToMany(() => ProductToIngredient, (productToIngredient) => productToIngredient.product, {cascade: true})
  productToIngredient: ProductToIngredient[];

  @ManyToMany(() => Order, (order) => order.products)
  order: Order[];

  @Column('timestamp', {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
  createdAt: number;

  @BeforeInsert()
  checkSlugInsert() {

    if (!this.slug) {

      this.slug = this.name

    }

    this.slug = this.slug.toLowerCase().replaceAll(' ','-').replaceAll("'",'')

  }

}
