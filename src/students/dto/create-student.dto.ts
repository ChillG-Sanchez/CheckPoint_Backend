export class CreateStudentDto {
  name: string;
  class: string;
  classTeacherId: number;
  birthDate: Date;
  studentCardNumber: string;
  email: string;
  password: string;
  user: {
    email: string;
    password: string;
    role: 'STUDENT';
  };
}