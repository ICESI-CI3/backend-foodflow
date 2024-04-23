/* eslint-disable prettier/prettier */
import { IsEmpty, IsNotEmpty, IsObject } from "class-validator";

export class AddDeleteProductIngredientDto {

    @IsObject()
    @IsEmpty({ message: "El producto debe tener al menos un ingrediente" })
    readonly ingredients: any[];

}