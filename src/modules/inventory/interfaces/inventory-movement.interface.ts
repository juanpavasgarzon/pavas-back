import type { MovementType } from '../enums/movement-type.enum';
import type { InventoryReferenceType } from '../enums/reference-type.enum';

export interface IInventoryMovement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  referenceType: InventoryReferenceType | null;
  referenceId: string | null;
  movementDate: Date;
  notes: string | null;
  createdAt: Date;
  createdById: string | null;
}

export interface CreateInventoryMovementData {
  productId: string;
  type: MovementType;
  quantity: number;
  referenceType?: InventoryReferenceType | null;
  referenceId?: string | null;
  movementDate?: Date;
  notes?: string | null;
  createdById?: string | null;
}
