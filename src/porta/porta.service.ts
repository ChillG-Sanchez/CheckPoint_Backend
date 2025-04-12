import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PortaService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.porta.create({ data });
  }

  findAll() {
    return this.prisma.porta.findMany();
  }

  findOne(id: number) {
    return this.prisma.porta.findUnique({ where: { id } });
  }

  update(id: number, data: any) {
    return this.prisma.porta.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prisma.porta.delete({ where: { id } });
  }
}