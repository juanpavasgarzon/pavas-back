import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SaleStatus } from '../../enums/sale-status.enum';
import { SaleType } from '../../enums/sale-type.enum';
import { CreateSaleItemRequest } from './create-sale-item.request';

export class CreateSaleRequest {
  @IsEnum(SaleType)
  @IsOptional()
  type?: SaleType = SaleType.RETAIL;

  @IsOptional()
  @IsUUID()
  quotationId?: string | null;

  @IsOptional()
  @IsUUID()
  clientId?: string | null;

  @IsOptional()
  @IsString()
  clientName?: string | null;

  @IsEnum(SaleStatus)
  @IsOptional()
  status?: SaleStatus = SaleStatus.DRAFT;

  @IsOptional()
  @IsDateString()
  saleDate?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemRequest)
  items: CreateSaleItemRequest[];
}
