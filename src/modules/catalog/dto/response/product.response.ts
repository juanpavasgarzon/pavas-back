import { Exclude, Expose } from 'class-transformer';
import type { UnitMeasure } from '../../enums/unit-measure.enum';
import type { IProduct } from '../../interfaces/product.interface';

@Exclude()
export class ProductResponse implements IProduct {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  description: string | null;

  @Expose()
  unitMeasure: UnitMeasure;

  @Expose()
  conversionFactor: number;

  @Expose()
  managesInventory: boolean;

  @Expose()
  basePrice: number | null;

  @Expose()
  currentStock: number;

  @Expose()
  minimumStock: number;

  @Expose()
  location: string | null;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ProductResponse>) {
    Object.assign(this, partial);
  }
}
