import { IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common';

export class SuppliersQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  isActive?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
