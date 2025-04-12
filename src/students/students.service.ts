import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client'; // Importáld a Prisma típusokat
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const { user, classTeacherId, ...studentData } = createStudentDto;
    return this.prisma.student.create({
      data: {
        ...studentData,
        classTeacher: {
          connect: { id: classTeacherId },
        },
        user: {
          create: user,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.student.findMany({
      include: {
        user: true,
        classTeacher: true,
        entryExitEvents: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        classTeacher: true,
        entryExitEvents: true,
      },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { user, classTeacherId, ...studentData } = updateStudentDto;
    return this.prisma.student.update({
      where: { id },
      data: {
        ...studentData,
        classTeacher: classTeacherId
          ? {
              connect: { id: classTeacherId },
            }
          : undefined,
        user: user
          ? {
              update: user,
            }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.student.delete({ where: { id } });
  }

  async findStudentEvents(studentId: number) {
    return this.prisma.entryExitEvent.findMany({
      where: { studentId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async addStudentEvent(studentId: number | null, action: string, userId: number) {
    const data: Prisma.EntryExitEventCreateInput = {
      action,
      user: {
        connect: { id: userId }, // Hozzáadjuk a kötelező user kapcsolatot
      },
      ...(studentId !== null
        ? { student: { connect: { id: studentId } } }
        : {}),
    };
  
    return this.prisma.entryExitEvent.create({ data });
  }
}