import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for user login
 */
export class LoginDto {
    @ApiProperty({ description: 'A bejelentkező e-mail címe' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @ApiProperty({ description: 'A bejelentkező jelszava' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}