import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateQuotationItemRequest {
  @IsOptional()
  @IsUUID()
  productId?: string | null;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0.0001)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}
