import { Injectable } from '@nestjs/common';
import { NotFoundException, BadRequestException } from '@nestjs/common';
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
                class: createUserDto.class || null,
                email: createUserDto.email,
                password: hashedPassword,
                userId: user.id,
            },
        });
    } else if (createUserDto.role === 'STUDENT') {
        if (!createUserDto.class) {
            throw new BadRequestException('A diákok számára kötelező az osztály megadása.');
        }
        if (!createUserDto.birthDate) {
            throw new BadRequestException('A diákok számára kötelező a születési dátum megadása.');
        }

        const birthDate = new Date(createUserDto.birthDate);
        if (isNaN(birthDate.getTime())) {
            throw new BadRequestException('A születési dátum érvénytelen.');
        }

        const classTeacher = await this.prisma.teacher.findFirst({
            where: { class: createUserDto.class },
        });

        if (!classTeacher) {
            throw new BadRequestException(
                `Nem található osztályfőnök a megadott osztályhoz: ${createUserDto.class}`
            );
        }

        await this.prisma.student.create({
            data: {
                name: createUserDto.name,
                class: createUserDto.class,
                classTeacherId: classTeacher.id,
                birthDate: birthDate,
                studentCardNumber: createUserDto.studentCardNumber || null,
                email: createUserDto.email,
                password: hashedPassword,
                userId: user.id,
            },
        });
    } else if (createUserDto.role === 'PORTA') {
        await this.prisma.porta.create({
            data: {
                name: createUserDto.name,
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
        porta: true,
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
      throw new NotFoundException(`Felhasználó nem található ezzel az ID-val: ${id}`);
    }
  
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password);
    }
  
    const isRoleChanged = updateUserDto.role && updateUserDto.role !== user.role;
  
    if (isRoleChanged) {
      if (user.role === 'ADMIN' && user.admin) {
        await this.prisma.admin.delete({ where: { userId: id } });
      } else if (user.role === 'TEACHER' && user.teacher) {
        await this.prisma.teacher.delete({ where: { userId: id } });
      } else if (user.role === 'STUDENT' && user.student) {
        await this.prisma.student.delete({ where: { userId: id } });
      } else if (user.role === 'PORTA' && user.porta) {
        await this.prisma.porta.delete({ where: { userId: id } });
      }
  
      if (updateUserDto.role === 'ADMIN') {
        await this.prisma.admin.create({
          data: {
            name: updateUserDto.name || '',
            email: updateUserDto.email || user.email,
            password: updateUserDto.password || user.password,
            userId: id,
          },
        });
      } else if (updateUserDto.role === 'TEACHER') {
        await this.prisma.teacher.create({
          data: {
            name: updateUserDto.name || '',
            class: updateUserDto.class || null,
            email: updateUserDto.email || user.email,
            password: updateUserDto.password || user.password,
            userId: id,
          },
        });
      } else if (updateUserDto.role === 'STUDENT') {
        if (!updateUserDto.class) {
          throw new BadRequestException('A diákok számára kötelező az osztály megadása.');
        }
        if (!updateUserDto.birthDate) {
          throw new BadRequestException('A diákok számára kötelező a születési dátum megadása.');
        }
  
        const birthDate = new Date(updateUserDto.birthDate);
        if (isNaN(birthDate.getTime())) {
          throw new BadRequestException('A születési dátum érvénytelen.');
        }
  
        const classTeacher = await this.prisma.teacher.findFirst({
          where: { class: updateUserDto.class },
        });
  
        if (!classTeacher) {
          throw new BadRequestException(`Nem található osztályfőnök a megadott osztályhoz: ${updateUserDto.class}`);
        }
  
        await this.prisma.student.create({
          data: {
            name: updateUserDto.name || '',
            class: updateUserDto.class,
            classTeacherId: classTeacher.id,
            birthDate: birthDate,
            studentCardNumber: updateUserDto.studentCardNumber || null,
            email: updateUserDto.email || user.email,
            password: updateUserDto.password || user.password,
            userId: id,
          },
        });
      } else if (updateUserDto.role === 'PORTA') {
        await this.prisma.porta.create({
          data: {
            name: updateUserDto.name || '',
            email: updateUserDto.email || user.email,
            password: updateUserDto.password || user.password,
            userId: id,
          },
        });
      }
    }
  
    if (!isRoleChanged && updateUserDto.name) {
      switch (user.role) {
        case 'ADMIN':
          await this.prisma.admin.update({
            where: { userId: id },
            data: { name: updateUserDto.name },
          });
          break;
        case 'TEACHER':
          await this.prisma.teacher.update({
            where: { userId: id },
            data: { name: updateUserDto.name },
          });
          break;
        case 'STUDENT':
          await this.prisma.student.update({
            where: { userId: id },
            data: { name: updateUserDto.name },
          });
          break;
        case 'PORTA':
          await this.prisma.porta.update({
            where: { userId: id },
            data: { name: updateUserDto.name },
          });
          break;
      }
    }
  
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserDto.email,
        password: updateUserDto.password,
        role: updateUserDto.role,
      },
      include: {
        admin: true,
        teacher: true,
        student: true,
        porta: true,
      },
    });
  
    return updatedUser;
  }
  

  async remove(id: number) {
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
        throw new NotFoundException(`Felhasználó nem található ezzel az ID-val: ${id}`);
    }

    if (user.role === 'ADMIN' && user.admin) {
        await this.prisma.admin.delete({
            where: { userId: id },
        });
    } else if (user.role === 'TEACHER' && user.teacher) {
        await this.prisma.teacher.delete({
            where: { userId: id },
        });
    } else if (user.role === 'STUDENT' && user.student) {
        await this.prisma.student.delete({
            where: { userId: id },
        });
    } else if (user.role === 'PORTA' && user.porta) {
        await this.prisma.porta.delete({
            where: { userId: id },
        });
    }

    return this.prisma.user.delete({
        where: { id },
    });
  }
}