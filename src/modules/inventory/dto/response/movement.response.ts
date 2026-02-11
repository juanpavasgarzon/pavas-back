import type { IInventoryMovement } from '../../interfaces/inventory-movement.interface';

export class MovementResponse {
  id: string;
  productId: string;
  type: string;
  quantity: number;
  referenceType: string | null;
  referenceId: string | null;
  movementDate: string;
  notes: string | null;
  createdAt: Date;
  createdById: string | null;

  constructor(movement: IInventoryMovement) {
    this.id = movement.id;
    this.productId = movement.productId;
    this.type = movement.type;
    this.quantity = Number(movement.quantity);
    this.referenceType = movement.referenceType;
    this.referenceId = movement.referenceId;
    this.movementDate = movement.movementDate.toISOString().split('T')[0];
    this.notes = movement.notes;
    this.createdAt = movement.createdAt;
    this.createdById = movement.createdById;
  }
}
