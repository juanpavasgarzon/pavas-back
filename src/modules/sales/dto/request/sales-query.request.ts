import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common';
import { SaleStatus } from '../../enums/sale-status.enum';
import { SaleType } from '../../enums/sale-type.enum';

export class SalesQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsEnum(SaleStatus)
  status?: SaleStatus;

  @IsOptional()
  @IsEnum(SaleType)
  type?: SaleType;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
