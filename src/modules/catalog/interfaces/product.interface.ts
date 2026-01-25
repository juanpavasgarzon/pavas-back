import type { UnitMeasure } from '../enums/unit-measure.enum';

export interface IProduct {
  id: string;
  code: string;
  name: string;
  description: string | null;
  unitMeasure: UnitMeasure;
  conversionFactor: number;
  managesInventory: boolean;
  basePrice: number | null;
  currentStock: number;
  minimumStock: number;
  location: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductData {
  code: string;
  name: string;
  description?: string;
  unitMeasure: UnitMeasure;
  conversionFactor?: number;
  managesInventory?: boolean;
  basePrice?: number;
  currentStock?: number;
  minimumStock?: number;
  location?: string;
}

export interface UpdateProductData {
  code?: string;
  name?: string;
  description?: string | null;
  unitMeasure?: UnitMeasure;
  conversionFactor?: number;
  managesInventory?: boolean;
  basePrice?: number | null;
  currentStock?: number;
  minimumStock?: number;
  location?: string | null;
  isActive?: boolean;
}
