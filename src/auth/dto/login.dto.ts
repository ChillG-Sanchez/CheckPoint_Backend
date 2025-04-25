import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user login
 */
export class LoginDto {
    @ApiProperty({ description: 'A bejelentkező e-mail címe' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ description: 'A bejelentkező jelszava' })
    @IsString({ message: 'Password must be a string' })
    password: string;
}