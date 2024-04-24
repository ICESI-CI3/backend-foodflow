/* eslint-disable prettier/prettier */
import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryIngredient } from "src/enum/category-ingredient.enum";

export class CreateIngredientDto {

    @IsString()
    @IsEmpty({ message: "El ingrediente debe tener un nombre" })
    readonly name: string;

    @IsEnum(CategoryIngredient)
    @IsEmpty({ message: "La categoría de ingrediente no puede estas vacía"})
    readonly category: CategoryIngredient;

    @IsString()
    @IsEmpty({ message: "El ingrediente debe tener una unidad de medida" })
    readonly unitMeasurement: string;

    @IsNumber()
    @IsEmpty({ message: "El ingrediente debe tener una cantidad inicial" })
    readonly quantity: number;

    @IsNumber()
    @IsEmpty({ message: "El ingrediente debe tener una cantidad mínima" })
    readonly dangerQuantity: number;

    @IsNumber()
    @IsNotEmpty({ message: "El ingrediente debe tener un precio de compra" })
    readonly purchasePrice: number;

    @IsNumber()
    @IsOptional()
    readonly salePrice: number;

    @IsString()
    @IsEmpty({ message: "El ingrediente debe tener una sede asociada" })
    readonly locationName: string;
    
}
