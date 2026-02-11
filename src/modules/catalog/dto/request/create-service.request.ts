import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateServiceRequest {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsNumber()
  @IsOptional()
  @Min(0)
  basePrice?: number;
}
