import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UnitMeasure } from '../../enums/unit-measure.enum';

export class UpdateProductRequest {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsEnum(UnitMeasure)
  @IsOptional()
  unitMeasure?: UnitMeasure;

  @IsNumber()
  @IsOptional()
  @Min(0)
  conversionFactor?: number;

  @IsBoolean()
  @IsOptional()
  managesInventory?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  basePrice?: number | null;

  @IsNumber()
  @IsOptional()
  @Min(0)
  currentStock?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minimumStock?: number;

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
