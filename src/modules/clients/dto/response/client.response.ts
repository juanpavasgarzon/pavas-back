import type { IClient } from '../../interfaces/client.interface';

export class ClientResponse {
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

  constructor(client: IClient) {
    this.id = client.id;
    this.code = client.code;
    this.name = client.name;
    this.email = client.email;
    this.phone = client.phone;
    this.address = client.address;
    this.taxId = client.taxId;
    this.isActive = client.isActive;
    this.createdAt = client.createdAt;
    this.updatedAt = client.updatedAt;
  }
}
