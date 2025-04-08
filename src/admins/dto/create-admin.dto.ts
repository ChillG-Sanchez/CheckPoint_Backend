export class CreateAdminDto {
  name: string;
  email: string;
  password: string;
  user: {
    email: string;
    password: string;
    role: 'ADMIN';
  };
}