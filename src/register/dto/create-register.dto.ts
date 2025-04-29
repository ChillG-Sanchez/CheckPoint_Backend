import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreateRegisterDto {
  @ApiProperty({ description: 'A felhasználó teljes neve' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A felhasználó email címe' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'A felhasználó jelszava', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'A felhasználó szerepe', required: false })
  @IsOptional()
  @IsEnum(['ADMIN', 'TEACHER', 'STUDENT', 'PORTA'])
  role?: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PORTA';

  @ApiProperty({ description: 'Az osztály neve (TEACHER esetén)', required: false })
  @IsOptional()
  class?: string;

  @ApiProperty({ description: 'A születési dátum (STUDENT esetén)', required: false })
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ description: 'A diákigazolvány száma (STUDENT esetén)', required: false })
  @IsOptional()
  studentCardNumber?: string;

  @ApiProperty({ description: 'Az osztályfőnök azonosítója (STUDENT esetén)', required: false })
  @IsOptional()
  @IsNumber()
  classTeacherId?: number;

  @ApiProperty({ description: 'A porta helyszíne (PORTA esetén)', required: false })
  @IsOptional()
  location?: string;
}