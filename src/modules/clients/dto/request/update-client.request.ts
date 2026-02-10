import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClientRequest {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsString()
  address?: string | null;

  @IsOptional()
  @IsString()
  taxId?: string | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
