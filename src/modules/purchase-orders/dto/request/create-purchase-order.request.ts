import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseOrderStatus } from '../../enums/purchase-order-status.enum';
import { CreatePurchaseOrderItemRequest } from './create-purchase-order-item.request';

export class CreatePurchaseOrderRequest {
  @IsOptional()
  @IsUUID()
  supplierId?: string | null;

  @IsOptional()
  @IsEnum(PurchaseOrderStatus)
  status?: PurchaseOrderStatus;

  @IsOptional()
  @IsDateString()
  expectedDate?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseOrderItemRequest)
  items: CreatePurchaseOrderItemRequest[];
}
