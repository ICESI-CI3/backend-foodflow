/* eslint-disable prettier/prettier */
import { IsEmpty, IsString } from "class-validator";

export class ReportDto {

    @IsString()
    @IsEmpty({ message: "El reporte debe tener un nombre" })
    readonly name: string;

    @IsString()
    @IsEmpty({message: "El reporte debe tener una fecha de inicio"})
    readonly startDate: string;

    @IsString()
    @IsEmpty({message: "El reporte debe tener una fecha de finalización"})
    readonly endDate: string;

}