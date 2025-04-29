import { Module } from '@nestjs/common';
import { PortaService } from './porta.service';
import { PortaController } from './porta.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PortaController],
  providers: [PortaService],
})
export class PortaModule {}
