/* eslint-disable prettier/prettier */

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/enum/status_order.enum';

export class UpdateOrderDto {

    @IsString()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsEnum(OrderStatus)
    @IsOptional()
    readonly status?: OrderStatus;

}
