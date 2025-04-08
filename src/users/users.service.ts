import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
      },
    });

    if (createUserDto.role === 'ADMIN') {
      await this.prisma.admin.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: hashedPassword,
          userId: user.id,
        },
      });
    } else if (createUserDto.role === 'TEACHER') {
      await this.prisma.teacher.create({
        data: {
          name: createUserDto.name,
          class: createUserDto.class,
          email: createUserDto.email,
          password: hashedPassword,
          userId: user.id,
        },
      });
    } else if (createUserDto.role === 'STUDENT') {
      await this.prisma.student.create({
        data: {
          name: createUserDto.name,
          class: createUserDto.class,
          classTeacherId: createUserDto.classTeacherId,
          birthDate: createUserDto.birthDate,
          studentCardNumber: createUserDto.studentCardNumber,
          email: createUserDto.email,
          password: hashedPassword,
          userId: user.id,
        },
      });
    }

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        admin: true,
        teacher: true,
        student: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        admin: true,
        teacher: true,
        student: true,
      },
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        admin: true,
        teacher: true,
        student: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}