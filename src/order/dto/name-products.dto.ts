/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class NameProductsOrderDto {

    @IsString()
    @IsEmpty({ message: "La orden debe tener productos asociados" })
    readonly name: string;

}