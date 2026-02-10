export interface IClient {
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

export interface CreateClientData {
  code: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  taxId?: string | null;
}

export interface UpdateClientData {
  code?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  taxId?: string | null;
  isActive?: boolean;
}
