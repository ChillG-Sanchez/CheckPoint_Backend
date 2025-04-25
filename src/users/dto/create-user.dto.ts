import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({ description: 'A felhasználó neve' })
    name: string;

    @ApiProperty({ description: 'A felhasználó email címe' })
    email: string;
    
    @ApiProperty({ description: 'A felhasználó jelszava' })
    password: string;

    @ApiProperty({ description: 'A felhasználó szerepe' })
    role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PORTA';

    @ApiProperty({ description: 'A felhasználó osztálya' })
    class?: string;

    @ApiProperty({ description: 'A felhasználó osztályfőnöke' })
    classTeacherId?: number;

    @ApiProperty({ description: 'A felhasználó születési dátuma' })
    birthDate?: Date;

    @ApiProperty({ description: 'A felhasználó diákigazolványszáma' })
    studentCardNumber?: string;
  }