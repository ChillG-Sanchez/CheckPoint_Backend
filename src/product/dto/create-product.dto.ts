import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'A termék neve' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A termék licenckulcsa (opcionális)' })
  @IsOptional()
  @IsString()
  licenseKey?: string;
}