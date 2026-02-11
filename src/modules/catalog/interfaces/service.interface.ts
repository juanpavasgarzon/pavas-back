export interface IService {
  id: string;
  code: string;
  name: string;
  description: string | null;
  basePrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateServiceData {
  code: string;
  name: string;
  description?: string | null;
  basePrice?: number;
}

export interface UpdateServiceData {
  code?: string;
  name?: string;
  description?: string | null;
  basePrice?: number;
  isActive?: boolean;
}
