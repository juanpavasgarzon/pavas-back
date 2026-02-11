import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationRequest } from 'src/common';
import { PurchaseOrderStatus } from '../../enums/purchase-order-status.enum';

export class PurchaseOrdersQueryRequest extends PaginationRequest {
  @IsOptional()
  @IsEnum(PurchaseOrderStatus)
  status?: PurchaseOrderStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
