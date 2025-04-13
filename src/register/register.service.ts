import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as argon2 from 'argon2'; // Importáljuk az argon2-t

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegisterDto: CreateRegisterDto) {
    const { email, password, name } = createRegisterDto;

    // Ellenőrizzük, hogy az email már létezik-e
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Ez az email cím már használatban van.');
    }

    // Jelszó hashelése argon2 segítségével
    const hashedPassword = await argon2.hash(password);

    // Új admin felhasználó létrehozása
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'ADMIN', // Admin szerepkör beállítása
      },
    });

    // Admin adatok mentése az Admin táblába
    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userId: user.id,
      },
    });

    return {
      message: 'Sikeres regisztráció!',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      admin: {
        id: admin.id,
        name: admin.name,
      },
    };
  }
}