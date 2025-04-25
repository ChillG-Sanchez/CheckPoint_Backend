import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ description: 'A diák neve' })
  name: string;

  @ApiProperty({ description: 'A diák osztálya' })
  class: string;

  @ApiProperty({ description: 'A diák osztályfőnökének neve' })
  classTeacherId: number;

  @ApiProperty({ description: 'A diák születési dátuma' })
  birthDate: Date;

  @ApiProperty({ description: 'A diák diákigazolványszáma' })
  studentCardNumber: string;

  @ApiProperty({ description: 'A diák email címe' })
  email: string;

  @ApiProperty({ description: 'A diák jelszava' })
  password: string;
  user: {
    email: string;
    password: string;
    role: 'STUDENT';
  };
}