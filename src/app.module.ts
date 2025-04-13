import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { TeachersModule } from './teachers/teachers.module';
import { StudentsModule } from './students/students.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortaModule } from './porta/porta.module';
import { RegisterModule } from './register/register.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AdminsModule,
    PrismaModule,
    TeachersModule,
    StudentsModule,
    EventsModule,
    AuthModule,
    UsersModule,
    PortaModule,
    RegisterModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}