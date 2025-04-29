import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

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
        where = { action: { not: 'smoking' } };
    } else if (filter === 'smoking') {
        where = { action: 'smoking' };
    }

    return this.prisma.entryExitEvent.findMany({
        where,
        include: {
            student: {
                select: {
                    name: true,
                },
            },
            porta: {
                select: {
                    name: true,
                },
            },
            user: {
                select: {
                    student: {
                        select: {
                            name: true,
                        },
                    },
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
        student: {
          select: {
            name: true,
          },
        },
        porta: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            student: {
              select: {
                name: true,
              },
            },
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
}