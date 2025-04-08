import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { user, ...teacherData } = createTeacherDto;
    return this.prisma.teacher.create({
      data: {
        ...teacherData,
        user: {
          create: user,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.teacher.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.teacher.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const { user, ...teacherData } = updateTeacherDto;
    return this.prisma.teacher.update({
      where: { id },
      data: {
        ...teacherData,
        user: user
          ? {
              update: user,
            }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}