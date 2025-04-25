import { ApiProperty } from '@nestjs/swagger';
export class CreatePortaDto {
    @ApiProperty({ description: 'A felhasználó neve' })
    name: string;

    @ApiProperty({ description: 'A felhasználó email címe' })
    email: string;

    @ApiProperty({ description: 'A felhasználó jelszava' })
    password: string;
}
