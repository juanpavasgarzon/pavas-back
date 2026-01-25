import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { UnitMeasure } from '../../enums/unit-measure.enum';

export class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

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
  basePrice?: number;

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
  location?: string;
}
