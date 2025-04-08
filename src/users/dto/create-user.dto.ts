export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT';
    class?: string;
    classTeacherId?: number;
    birthDate?: Date;
    studentCardNumber?: string;
  }