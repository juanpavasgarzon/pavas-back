import { IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common';
import { MovementType } from '../../enums/movement-type.enum';

export class MovementsQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  type?: MovementType;

  @IsOptional()
  @IsString()
  search?: string;
}
