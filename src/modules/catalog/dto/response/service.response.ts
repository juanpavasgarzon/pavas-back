import type { IService } from '../../interfaces/service.interface';

export class ServiceResponse {
  id: string;
  code: string;
  name: string;
  description: string | null;
  basePrice: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(service: IService) {
    this.id = service.id;
    this.code = service.code;
    this.name = service.name;
    this.description = service.description;
    this.basePrice = Number(service.basePrice);
    this.isActive = service.isActive;
    this.createdAt = service.createdAt;
    this.updatedAt = service.updatedAt;
  }
}
