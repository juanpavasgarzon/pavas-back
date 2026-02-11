import { IsEnum } from 'class-validator';
import { PurchaseOrderStatus } from '../../enums/purchase-order-status.enum';

export class UpdatePurchaseOrderStatusRequest {
  @IsEnum(PurchaseOrderStatus)
  status: PurchaseOrderStatus;
}
