/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logistic } from 'src/logistic/entities/logistic.entity';
import { Order } from 'src/order/entities/order.entity';
import { Between, Repository } from 'typeorm';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class ReportService {

    constructor (

        @InjectRepository(Logistic) private logisRepo: Repository<Logistic>,
        @InjectRepository(Order) private orderRepo: Repository<Order>

    ){}

    async generateLogisticReport(createReportDto: ReportDto) {

        const startDateTime = new Date(createReportDto.startDate);
        const endDateTime = new Date(createReportDto.endDate);
    
        const logistic: Logistic[] = await this.logisRepo.find({where: {date: Between(startDateTime, endDateTime)}});

        if (logistic.length === 0) {

            throw new NotFoundException("No hay órdenes de abastecimiento dentro de las fechas ingresadas")

        }

        let report = "";

        for (let i = 0; i < logistic.length; i++) {

            report += "Nombre del reporte: " + createReportDto.name + "\nNombre de abastecimiento: " + logistic[i].name + "\nFecha de abastecimiento: " + logistic[i].date + "\nPrecio total de abastecimiento: " + logistic[i].totalPrice + "\nFecha de inicio ingresada: " + startDateTime + "\nFecha de finalización ingresada: " + endDateTime + "\n\n"

        }
    
        return report;
    
    }

    async generateOrderReport(createReportDto: ReportDto) {

        const startDateTime = new Date(createReportDto.startDate);
        const endDateTime = new Date(createReportDto.endDate);
    
        const orders = await this.orderRepo.find({where: {createdAt: Between(startDateTime, endDateTime)}, relations: ["products"]});

        let total = "";

        let report = "";

        for (let i = 0; i < orders.length; i++){

            report += "Nombre del reporte: " + createReportDto.name + "\nNombre de la órden: " + orders[i].name + "\nMesa de la órden: " + orders[i].tableNumber + "\nEstado de la órden: " + orders[i].status + "\nFecha de la órden: " + orders[i].createdAt + "\nFecha de inicio ingresada: " + startDateTime + "\nFecha de finalización ingresada: " + endDateTime;

            for (let j = 0; j < orders[i].products.length; j++) {

                report += "\nProductos de la orden: " + orders[i].products[j].name + " --- Precio del producto: " + orders[i].products[j].price + "\n"

                total += orders[i].products[j].price;

            }

            report += "Venta Total: " + total

        }

        return report;
    
    }

}
