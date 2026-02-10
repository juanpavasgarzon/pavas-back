import { IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common';

export class QuotationsQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
