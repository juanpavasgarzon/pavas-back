import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { InventoryReferenceType } from '../../enums/reference-type.enum';
import { MovementType } from '../../enums/movement-type.enum';

export class CreateMovementRequest {
  @IsUUID()
  productId: string;

  @IsEnum(MovementType)
  type: MovementType;

  @IsNumber()
  @Min(0.0001)
  quantity: number;

  @IsOptional()
  @IsEnum(InventoryReferenceType)
  referenceType?: InventoryReferenceType | null;

  @IsOptional()
  @IsUUID()
  referenceId?: string | null;

  @IsOptional()
  @IsDateString()
  movementDate?: string;

  @IsOptional()
  @IsString()
  notes?: string | null;
}
