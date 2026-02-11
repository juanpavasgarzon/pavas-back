import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseItemRequest } from './create-purchase-item.request';

export class CreatePurchaseRequest {
  @IsUUID()
  @IsNotEmpty()
  purchaseOrderId: string;

  @IsDateString()
  receiptDate: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseItemRequest)
  items: CreatePurchaseItemRequest[];
}
