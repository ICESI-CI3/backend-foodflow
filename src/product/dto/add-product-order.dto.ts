/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class AddProductOrderDto{

    @IsString()
    name: string;

}