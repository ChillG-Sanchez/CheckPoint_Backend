import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRegisterDto } from './dto/event-register.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const data: Prisma.EntryExitEventCreateInput = {
      action: createEventDto.action,
      timestamp: createEventDto.timestamp || new Date(),
      user: {
        connect: { id: createEventDto.userId },
      },
      ...(createEventDto.studentId !== undefined && createEventDto.studentId !== null
        ? { student: { connect: { id: createEventDto.studentId } } }
        : {}),
    };
    return this.prisma.entryExitEvent.create({ data });
  }

  async findAll(filter?: string) {
    let where = {};

    if (filter === 'non-smoking') {
      where = { action: { notIn: ['smoke_start', 'smoke_end'] } };
    } else if (filter === 'smoking') {
      where = { action: { in: ['smoke_start', 'smoke_end'] } };
    }

    return this.prisma.entryExitEvent.findMany({
      where,
      include: {
        student: { select: { name: true } },
        porta: { select: { name: true } },
        user: {
          select: {
            student: { select: { name: true } },
          },
        },
      },
    });
  }

  async findAllSmokingEvents(filter?: string) {
    let where = {};

    if (filter === 'active') {
      where = { endTime: null };
    } else if (filter === 'completed') {
      where = { endTime: { not: null } };
    }

    return this.prisma.smokingEvent.findMany({
      where,
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.entryExitEvent.findUnique({
      where: { id },
      include: {
        student: { select: { name: true } },
        porta: { select: { name: true } },
        user: {
          select: {
            student: { select: { name: true } },
          },
        },
      },
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    return this.prisma.entryExitEvent.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return this.prisma.entryExitEvent.delete({
      where: { id },
    });
  }

  async registerByCard(dto: EventRegisterDto) {
    const { studentCardNumber, recordedByPortaId } = dto;

    const student = await this.prisma.student.findUnique({
      where: { studentCardNumber },
      include: { user: true },
    });

    if (!student) {
      throw new NotFoundException('Diák nem található ezzel a kártyaszámmal.');
    }

    const userId = student.user.id;
    const now = new Date();
    const isSmokingCard = studentCardNumber.length === 12 && studentCardNumber.endsWith('0');

    if (isSmokingCard) {
      const latestSmoking = await this.prisma.smokingEvent.findFirst({
        where: { userId },
        orderBy: { startTime: 'desc' },
      });

      if (!latestSmoking || latestSmoking.endTime) {
        await this.prisma.smokingEvent.create({
          data: { userId, startTime: now },
        });

        await this.prisma.entryExitEvent.create({
          data: {
            user: { connect: { id: userId } },
            student: { connect: { id: student.id } },
            porta: { connect: { id: recordedByPortaId } },
            action: 'smoke_start',
            timestamp: now,
          },
        });

        return { status: 'smoke_start', message: 'Dohányzás elindítva.' };
      } else {
        await this.prisma.smokingEvent.update({
          where: { id: latestSmoking.id },
          data: { endTime: now },
        });

        await this.prisma.entryExitEvent.create({
          data: {
            user: { connect: { id: userId } },
            student: { connect: { id: student.id } },
            porta: { connect: { id: recordedByPortaId } },
            action: 'smoke_end',
            timestamp: now,
          },
        });

        return { status: 'smoke_end', message: 'Dohányzás befejezve.' };
      }
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const latestToday = await this.prisma.entryExitEvent.findFirst({
      where: {
        studentId: student.id,
        timestamp: { gte: todayStart },
      },
      orderBy: { timestamp: 'desc' },
    });

    const action = latestToday?.action === 'enter' ? 'exit' : 'enter';

    await this.prisma.entryExitEvent.create({
      data: {
        user: { connect: { id: userId } },
        student: { connect: { id: student.id } },
        porta: { connect: { id: recordedByPortaId } },
        action,
        timestamp: now,
      },
    });

    return { status: action, message: `${student.name} ${action === 'enter' ? 'belépett' : 'kilépett'}.` };
  }
}
