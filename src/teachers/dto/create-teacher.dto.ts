import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ description: 'A tanár neve' })
  name: string;

  @ApiProperty({ description: 'A tanár osztálya' })
  class: string;

  @ApiProperty({ description: 'A tanár email címe' })
  email: string;

  @ApiProperty({ description: 'A tanár jelszava' })
  password: string;
  user: {
    email: string;
    password: string;
    role: 'TEACHER';
  };
}