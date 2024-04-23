/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CategoryProduct } from 'src/enum/category-product.enum';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsNumber()
    @IsOptional()
    readonly price?: number;

    @IsEnum(CategoryProduct)
    @IsOptional()
    readonly category?: CategoryProduct;
    
}
