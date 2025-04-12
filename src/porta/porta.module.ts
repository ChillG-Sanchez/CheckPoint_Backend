import { Module } from '@nestjs/common';
import { PortaService } from './porta.service';
import { PortaController } from './porta.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PortaController],
  providers: [PortaService],
})
export class PortaModule {}
