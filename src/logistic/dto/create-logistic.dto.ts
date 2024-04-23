/* eslint-disable prettier/prettier */
import { IsEmpty, IsObject, IsString } from "class-validator";
import { CreateIngredientDto } from "src/ingredients/dto/create-ingredient.dto";

export class CreateLogisticDto {

    @IsString()
    @IsEmpty({message: "El abastecimiento debe tener un nombre"})
    readonly name: string;

    @IsObject()
    @IsEmpty({message: "El abastecimiento debe tener una lista de ingredientes"})
    readonly ingredients: CreateIngredientDto[]

    @IsString()
    @IsEmpty({ message: "El abastecimiento debe tener una sede asociada" })
    readonly locationName: string;

}
