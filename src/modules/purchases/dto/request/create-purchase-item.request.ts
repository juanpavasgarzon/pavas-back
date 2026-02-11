import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePurchaseItemRequest {
  @IsUUID()
  purchaseOrderItemId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  quantityReceived: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;
}
