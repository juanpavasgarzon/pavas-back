import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { InvoiceStatus } from '../../enums/invoice-status.enum';

export class CreateInvoiceRequest {
  @IsUUID()
  clientId: string;

  @IsUUID()
  saleId: string;

  @IsNumber()
  @Min(0)
  subtotal: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  taxAmount?: number;

  @IsNumber()
  @Min(0)
  total: number;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string | null;
}
