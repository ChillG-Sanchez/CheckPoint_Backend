export class CreateTeacherDto {
  name: string;
  class: string;
  email: string;
  password: string;
  user: {
    email: string;
    password: string;
    role: 'TEACHER';
  };
}