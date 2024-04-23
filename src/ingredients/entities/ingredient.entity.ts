/* eslint-disable prettier/prettier */
import { CategoryIngredient } from "src/enum/category-ingredient.enum";
import { Location } from "src/location/entities/location.entity";
import { Logistic } from "src/logistic/entities/logistic.entity";
import { ProductToIngredient } from "src/product/entities/productToIngredient.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class Ingredient {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true, nullable: false })
  name: string;

  @Column({
    type: "enum",
    enum: CategoryIngredient,
    default: CategoryIngredient.OTROS,
  })
  category: CategoryIngredient;

  @Column('text', {nullable: false})
  unitMeasurement: string;

  @Column('int', {nullable: false})
  quantity: number;

  @Column('int', {nullable: false})
  dangerQuantity: number;

  @Column('money', {nullable: false})
  purchasePrice: number;

  @Column('money', {nullable: true})
  salePrice: number;

  @Column('text', {unique: true})
  slug: string

  @OneToMany(() => ProductToIngredient, (productToIngredient) => productToIngredient.ingredient)
  productToIngredient: ProductToIngredient[];

  @ManyToOne(() => Location, (location) => location.ingredients, {cascade: true})
  @JoinColumn({name: 'location_id'})
  location: Location;

  @ManyToMany(() => Logistic, (logistic) => logistic.ingredients)
  logistic: Logistic[]

  @BeforeInsert()
  checkSlugInsert() {

    if (!this.slug) {

      this.slug = this.name

    }

    this.slug = this.slug.toLowerCase().replaceAll(' ','-').replaceAll("'",'')

  }

}
