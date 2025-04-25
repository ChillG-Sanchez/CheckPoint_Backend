import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

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
}