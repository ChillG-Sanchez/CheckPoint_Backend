export class User {
    id: number;
    email: string;
    password: string;
    role: 'admin' | 'teacher' | 'student';
  }