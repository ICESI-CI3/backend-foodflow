/* eslint-disable prettier/prettier */
import { Body, Controller, Get} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';

@Controller('report')
export class ReportController {

    constructor (

        private readonly reportService: ReportService

    ){}

    @Get('logistic')
    findAllLogistic(@Body() createReportDto: ReportDto) {

        const report = this.reportService.generateLogisticReport(createReportDto);

        return report;

    }

    @Get('orders')
    findAllOrders(@Body() createReportDto: ReportDto) {

        const report = this.reportService.generateOrderReport(createReportDto);

        return report;
    }

}
