/* eslint-disable prettier/prettier */
import { Body, Controller, Get, UseGuards} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportDto } from './dto/report.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guard/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('report')
export class ReportController {

    constructor (

        private readonly reportService: ReportService

    ){}

    @Get('logistic')
    @UseGuards(AuthGuard('bearer'), UserRoleGuard)
    @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
    findAllLogistic(@Body() createReportDto: ReportDto) {

        const report = this.reportService.generateLogisticReport(createReportDto);

        return report;

    }

    @Get('orders')
    @UseGuards(AuthGuard('bearer'), UserRoleGuard)
    @RoleProtected(ValidRoles.admin, ValidRoles.superUser)
    findAllOrders(@Body() createReportDto: ReportDto) {

        const report = this.reportService.generateOrderReport(createReportDto);

        return report;
    }

}
