import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
      },
    });
  
    if (user && (await argon2.verify(user.password, password))) {
      let name: string | null = null;
  
      switch (user.role) {
        case 'ADMIN':
          const admin = await this.prisma.admin.findUnique({
            where: { userId: user.id },
            select: { name: true },
          });
          name = admin?.name || null;
          break;
  
        case 'TEACHER':
          const teacher = await this.prisma.teacher.findUnique({
            where: { userId: user.id },
            select: { name: true },
          });
          name = teacher?.name || null;
          break;
  
        case 'STUDENT':
          const student = await this.prisma.student.findUnique({
            where: { userId: user.id },
            select: { name: true },
          });
          name = student?.name || null;
          break;
  
        case 'PORTA':
          const porta = await this.prisma.porta.findUnique({
            where: { userId: user.id },
            select: { name: true },
          });
          name = porta?.name || null;
          break;
      }
  
      return {
        id: user.id,
        email: user.email,
        role: user.role,
        name,
      };
    }
  
    return null;
  }
  

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      id: user.id,
      name: user.name,
    };
  }
}