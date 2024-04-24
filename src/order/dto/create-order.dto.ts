/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { OrderStatus } from "src/enum/status_order.enum";

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty({ message: "La orden debe tener nombre" })
    readonly name: string;

    @IsNumber()
    @IsNotEmpty({ message: "La orden debe tener el número de la mesa" })
    readonly tableNumber: number;

    @IsObject()
    readonly products: string[];

    @IsEnum(OrderStatus)
    @IsNotEmpty({message:"La categoria de la orden no puede estar vacia"})
    readonly status: OrderStatus;

}
