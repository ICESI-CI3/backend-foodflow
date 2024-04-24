/* eslint-disable prettier/prettier */
import { Ingredient } from "src/ingredients/entities/ingredient.entity";
import { Logistic } from "src/logistic/entities/logistic.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {unique: true, nullable: false})
    name: string;

    @Column('text', {unique: true, nullable: false})
    location: string;

    @Column('text', {unique: true})
    slug: string

    @OneToMany(() => Ingredient, (ingredient) => ingredient.location)
    ingredients: Ingredient[];

    @OneToMany(() => Logistic, (logistic) => logistic.location)
    logistic: Logistic[];

    @BeforeInsert()
    checkSlugInsert() {

        if (!this.slug) {

        this.slug = this.name

        }

        this.slug = this.slug.toLowerCase().replaceAll(' ','-').replaceAll("'",'')

    }

}
