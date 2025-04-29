import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
  
    if (existingUser) {
      throw new ConflictException('Ez az email cím már használatban van.');
    }

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

  async findAll(options?: any) {
    return this.prisma.user.findMany({
      ...options,
      select: {
        id: true,
        email: true,
        role: true,
        admin: true,
        teacher: true,
        student: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        admin: true,
        teacher: true,
        student: true,
        porta: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
    console.log('Frissítendő ID:', id);
    console.log('Frissítendő adatok:', updateUserDto);
  
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Felhasználó nem található ezzel az ID-val: ${id}`);
    }
  
    console.log('Felhasználó szerepköre:', user.role);
  
    // Frissítjük a User táblát, ha az email mező meg van adva
    if (updateUserDto.email) {
      console.log('Email frissítése a User táblában:', updateUserDto.email);
      await this.prisma.user.update({
        where: { id },
        data: {
          email: updateUserDto.email,
        },
      });
  
      // Frissítjük a megfelelő szerepkör tábláját is
      if (user.role === 'ADMIN') {
        console.log('Email frissítése az Admin táblában:', updateUserDto.email);
        await this.prisma.admin.update({
          where: { userId: id },
          data: {
            email: updateUserDto.email,
          },
        });
      } else if (user.role === 'TEACHER') {
        console.log('Email frissítése a Teacher táblában:', updateUserDto.email);
        await this.prisma.teacher.update({
          where: { userId: id },
          data: {
            email: updateUserDto.email,
          },
        });
      } else if (user.role === 'STUDENT') {
        console.log('Email frissítése a Student táblában:', updateUserDto.email);
        await this.prisma.student.update({
          where: { userId: id },
          data: {
            email: updateUserDto.email,
          },
        });
      } else if (user.role === 'PORTA') {
        console.log('Email frissítése a Porta táblában:', updateUserDto.email);
        await this.prisma.porta.update({
          where: { userId: id },
          data: {
            email: updateUserDto.email,
          },
        });
      }
    }
  
    // Frissítjük a kapcsolódó táblát a szerepkör alapján, ha a name mező meg van adva
    if (updateUserDto.name) {
      console.log('Név frissítése:', updateUserDto.name);
      if (user.role === 'ADMIN') {
        await this.prisma.admin.update({
          where: { userId: id },
          data: { name: updateUserDto.name },
        });
      } else if (user.role === 'TEACHER') {
        await this.prisma.teacher.update({
          where: { userId: id },
          data: { name: updateUserDto.name },
        });
      } else if (user.role === 'STUDENT') {
        await this.prisma.student.update({
          where: { userId: id },
          data: { name: updateUserDto.name },
        });
      } else if (user.role === 'PORTA') {
        await this.prisma.porta.update({
          where: { userId: id },
          data: { name: updateUserDto.name },
        });
      }
    }
  
    // Visszaadjuk a frissített felhasználót
    const updatedUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        admin: true,
        teacher: true,
        student: true,
        porta: true,
      },
    });
  
    console.log('Frissített felhasználó:', updatedUser);
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Felhasználó nem található ezzel az ID-val: ${id}`);
    }
  
    return this.prisma.user.delete({
      where: { id },
    });
  }
}