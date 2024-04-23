/* eslint-disable prettier/prettier */
import { IsEmpty, IsObject } from "class-validator";

export class AddDeleteOrderProductDto {

    @IsObject()
    @IsEmpty({ message: "El producto debe tener al menos un ingrediente" })
    readonly products: any[];

}