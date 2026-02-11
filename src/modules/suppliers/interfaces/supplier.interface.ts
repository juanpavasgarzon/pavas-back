export interface ISupplier {
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
}

export interface CreateSupplierData {
  code: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  taxId?: string | null;
}

export interface UpdateSupplierData {
  code?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  taxId?: string | null;
  isActive?: boolean;
}
