import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationRequest } from 'src/common';
import { InvoiceStatus } from '../../enums/invoice-status.enum';

export class InvoicesQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @IsUUID()
  saleId?: string;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
