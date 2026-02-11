import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { ItemType } from 'src/common/enums/item-type.enum';

export class CreateSaleItemRequest {
  @IsOptional()
  @IsEnum(ItemType)
  itemType?: ItemType | null;

  @IsOptional()
  @IsUUID()
  itemId?: string | null;

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
