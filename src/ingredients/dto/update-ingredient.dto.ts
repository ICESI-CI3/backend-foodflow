/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientDto } from './create-ingredient.dto';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {

    @IsUUID()
    @IsOptional()
    readonly id?: string;

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsNumber()
    @IsOptional()
    readonly quantity?: number;

    @IsNumber()
    @IsOptional()
    readonly dangerQuantity?: number;

    @IsNumber()
    @IsOptional()
    readonly purchasePrice?: number;

    @IsNumber()
    @IsOptional()
    readonly salePrice?: number

}
