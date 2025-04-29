import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import * as argon2 from 'argon2';

@Injectable()
export class RegisterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRegisterDto: CreateRegisterDto) {
    const { email, password, name, role, class: studentClass, birthDate, studentCardNumber, classTeacherId } = createRegisterDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Ez az email cím már használatban van.');
    }

    const hashedPassword = await argon2.hash(password);

    const userRole = role || 'ADMIN';

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: userRole,
      },
    });

    if (userRole === 'ADMIN') {
      const admin = await this.prisma.admin.create({
        data: {
          name,
          email,
          password: hashedPassword,
          user: { connect: { id: user.id } },
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
    } else if (userRole === 'TEACHER') {
      const teacher = await this.prisma.teacher.create({
        data: {
          name,
          email,
          password: hashedPassword,
          class: studentClass || 'Default Class',
          user: { connect: { id: user.id } },
        },
      });

      return {
        message: 'Sikeres regisztráció!',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        teacher: {
          id: teacher.id,
          name: teacher.name,
        },
      };
    } else if (userRole === 'STUDENT') {
      const student = await this.prisma.student.create({
        data: {
          name,
          email,
          password: hashedPassword,
          class: studentClass,
          birthDate: birthDate,
          studentCardNumber: studentCardNumber,
          classTeacher: classTeacherId ? { connect: { id: classTeacherId } } : undefined,
          user: { connect: { id: user.id } },
        },
      });

      return {
        message: 'Sikeres regisztráció!',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        student: {
          id: student.id,
          name: student.name,
        },
      };
    } else if (userRole === 'PORTA') {
      const porta = await this.prisma.porta.create({
        data: {
          name,
          email,
          password: hashedPassword,
          user: { connect: { id: user.id } },
        },
      });

      return {
        message: 'Sikeres regisztráció!',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        porta: {
          id: porta.id,
          name: porta.name,
        },
      };
    }

    throw new BadRequestException('Ismeretlen szerepkör.');
  }
}