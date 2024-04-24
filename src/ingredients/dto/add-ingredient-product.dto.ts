/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class AddIngredientProductDto{

    @IsString()
    name: string;

}