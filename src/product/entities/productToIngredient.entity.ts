import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Ingredient } from "src/ingredients/entities/ingredient.entity";

@Entity()
export class ProductToIngredient {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column()
    ingredientId: string;

    @Column('int', {nullable: false, default: 1})
    quantityIngredient: number;

    @ManyToOne(() => Product, (product) => product.productToIngredient)
    public product: Product;

    @ManyToOne(() => Ingredient, (ingredient) => ingredient.productToIngredient)
    public ingredient: Ingredient;

}