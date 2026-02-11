import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ItemType } from 'src/common/enums/item-type.enum';

export class CreateQuotationItemRequest {
  @IsOptional()
  @IsEnum(ItemType)
  itemType?: ItemType | null;

  @IsOptional()
  @IsUUID()
  itemId?: string | null;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0.0001)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}
