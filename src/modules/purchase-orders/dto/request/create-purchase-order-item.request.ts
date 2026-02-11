import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ItemType } from 'src/common/enums/item-type.enum';

export class CreatePurchaseOrderItemRequest {
  @IsEnum(ItemType)
  itemType: ItemType;

  @IsUUID()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;
}
