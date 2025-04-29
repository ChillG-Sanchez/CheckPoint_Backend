import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsOptional, IsDate, IsEnum, IsNumber } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'A felhasználó neve' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'A felhasználó email címe' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'A felhasználó jelszava' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'A felhasználó szerepe' })
  @IsEnum(['ADMIN', 'TEACHER', 'STUDENT', 'PORTA'])
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PORTA';

  @ApiProperty({ description: 'A felhasználó osztálya', required: false })
  @IsOptional()
  @IsString()
  class?: string;

  @ApiProperty({ description: 'A felhasználó osztályfőnöke', required: false })
  @IsOptional()
  @IsNumber()
  classTeacherId?: number;

  @ApiProperty({ description: 'A felhasználó születési dátuma', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @ApiProperty({ description: 'A felhasználó diákigazolványszáma', required: false })
  @IsOptional()
  @IsString()
  studentCardNumber?: string;
}