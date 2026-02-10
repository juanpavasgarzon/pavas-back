import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuotationStatus } from '../../enums/quotation-status.enum';
import { CreateQuotationItemRequest } from './create-quotation-item.request';

export class CreateQuotationRequest {
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @IsEnum(QuotationStatus)
  @IsOptional()
  status?: QuotationStatus = QuotationStatus.DRAFT;

  @IsOptional()
  @IsDateString()
  validUntil?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuotationItemRequest)
  items: CreateQuotationItemRequest[];
}
