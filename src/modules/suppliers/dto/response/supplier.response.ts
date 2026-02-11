import type { ISupplier } from '../../interfaces/supplier.interface';

export class SupplierResponse {
  id: string;
  code: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(supplier: ISupplier) {
    this.id = supplier.id;
    this.code = supplier.code;
    this.name = supplier.name;
    this.email = supplier.email;
    this.phone = supplier.phone;
    this.address = supplier.address;
    this.taxId = supplier.taxId;
    this.isActive = supplier.isActive;
    this.createdAt = supplier.createdAt;
    this.updatedAt = supplier.updatedAt;
  }
}
