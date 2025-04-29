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
      if (user.role === 'ADMIN') {
        const admin = await this.prisma.admin.findUnique({
          where: { userId: user.id },
          select: {
            name: true,
          },
        });

        return { ...user, name: admin?.name || null };
      }

      return { ...user, name: null };
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