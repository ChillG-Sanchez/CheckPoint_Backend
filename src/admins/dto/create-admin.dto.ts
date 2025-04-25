import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ description: 'A felhasználó neve' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A felhasználó email címe' })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  email: string;

  @ApiProperty({ description: 'A felhasználó jelszava' })
  @IsString()
  @IsNotEmpty()
  password: string;
  user: {
    email: string;
    password: string;
    role: 'ADMIN';
  };
}