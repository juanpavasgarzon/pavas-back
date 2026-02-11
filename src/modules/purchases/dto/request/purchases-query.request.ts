import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationRequest } from 'src/common';

export class PurchasesQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsUUID()
  purchaseOrderId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
