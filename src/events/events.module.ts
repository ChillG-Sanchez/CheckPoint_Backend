import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}