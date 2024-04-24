/* eslint-disable prettier/prettier */
import { IsEmpty, IsString } from "class-validator";

export class CreateLocationDto {

    @IsString()
    @IsEmpty({message: "The site should have name"})
    readonly name: string;

    @IsString()
    @IsEmpty({message: "The site should have location"})
    readonly location: string;

}
