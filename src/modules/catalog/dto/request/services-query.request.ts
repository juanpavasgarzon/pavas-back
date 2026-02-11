import { IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common';

export class ServicesQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  isActive?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
