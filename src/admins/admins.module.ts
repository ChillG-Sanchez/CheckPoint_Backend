import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Feltételezve, hogy Prisma-t használsz adatbáziskezeléshez

@Module({
  imports: [PrismaModule], // Adatbázis modul importálása
  controllers: [AdminsController], // Admin vezérlő regisztrálása
  providers: [AdminsService],
})
export class AdminsModule {}