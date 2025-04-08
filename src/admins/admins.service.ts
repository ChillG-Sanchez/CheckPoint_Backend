import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    const { user, ...adminData } = createAdminDto;
    return this.prisma.admin.create({
      data: {
        ...adminData,
        user: {
          create: user,
        },
      },
    });
  }

  async findAll() {
    return this.prisma.admin.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.admin.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { user, ...adminData } = updateAdminDto;
    return this.prisma.admin.update({
      where: { id },
      data: {
        ...adminData,
        user: user
          ? {
              update: user,
            }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.admin.delete({ where: { id } });
  }
}