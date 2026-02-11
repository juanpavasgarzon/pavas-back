import { Controller, Get, Query } from '@nestjs/common';
import { Permission, RequirePermissions } from 'src/modules/auth';
import { SalesByPeriodUseCase } from '../use-cases/sales-by-period.use-case';
import { LowStockProductsUseCase } from '../use-cases/low-stock-products.use-case';
import { TopProductsUseCase } from '../use-cases/top-products.use-case';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly salesByPeriodUseCase: SalesByPeriodUseCase,
    private readonly lowStockProductsUseCase: LowStockProductsUseCase,
    private readonly topProductsUseCase: TopProductsUseCase,
  ) {}

  @Get('sales-by-period')
  @RequirePermissions(Permission.REPORTS_READ)
  async salesByPeriod(@Query('from') from: string, @Query('to') to: string) {
    const fromDate = new Date(from || Date.now());
    const toDate = new Date(to || Date.now());
    return this.salesByPeriodUseCase.execute(fromDate, toDate);
  }

  @Get('low-stock-products')
  @RequirePermissions(Permission.REPORTS_READ)
  async lowStockProducts(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 20;
    return this.lowStockProductsUseCase.execute(limitNum);
  }

  @Get('top-products')
  @RequirePermissions(Permission.REPORTS_READ)
  async topProducts(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('limit') limit?: string,
  ) {
    const fromDate = new Date(from || Date.now());
    const toDate = new Date(to || Date.now());
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.topProductsUseCase.execute(fromDate, toDate, limitNum);
  }
}
