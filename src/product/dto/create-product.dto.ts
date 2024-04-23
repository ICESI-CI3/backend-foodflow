/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { CategoryProduct } from 'src/enum/category-product.enum';



export class CreateProductDto {

    @IsString()
    @IsEmpty({ message: "El producto debe tener nombre" })
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsNumber()
    @IsEmpty({ message: "El producto debe tener precio" })
    readonly price: number;

    @IsEnum(CategoryProduct)
    @IsEmpty({message:"La categoria del producto no puede estar vacia"})
    readonly category: CategoryProduct;

    @IsObject()
    @IsEmpty({ message: "Product should have at least one ingredient" })
    readonly productToIngredient: any[];

}
