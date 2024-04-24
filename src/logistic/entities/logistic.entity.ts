/* eslint-disable prettier/prettier */
import { Ingredient } from "src/ingredients/entities/ingredient.entity";
import { Location } from "src/location/entities/location.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

/* eslint-disable prettier/prettier */
@Entity()
export class Logistic {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text', {unique: true, nullable: false})
    name: string

    @Column('timestamp', {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @Column('money', {nullable: false})
    totalPrice: number

    @Column('text', {unique: true})
    slug: string

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.logistic, {cascade: true})
    @JoinTable()
    ingredients: Ingredient[] 
    
    @ManyToOne(() => Location, (location) => location.logistic, {cascade: true})
    @JoinColumn({name: 'location_id'})
    location: Location

}
