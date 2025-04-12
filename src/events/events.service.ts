import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client'; // Importáld a Prisma típusokat
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
        connect: { id: createEventDto.userId }, // Hozzáadjuk a kötelező user kapcsolatot
      },
      ...(createEventDto.studentId !== undefined && createEventDto.studentId !== null
        ? { student: { connect: { id: createEventDto.studentId } } }
        : {}),
    };
  
    return this.prisma.entryExitEvent.create({ data });
  }

  async findAll() {
    return this.prisma.entryExitEvent.findMany();
  }

  async findOne(id: number) {
    return this.prisma.entryExitEvent.findUnique({
      where: { id },
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