import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRegisterDto } from './dto/event-register.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Esemény sikeresen létrehozva.' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok.' })
  @ApiResponse({ status: 409, description: 'Ez az esemény már létezik.' })
  @ApiResponse({ status: 500, description: 'Szerverhiba.' })
  @ApiResponse({ status: 401, description: 'Jogosultság megtagadva.' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Események sikeresen lekérdezve.' })
  @ApiResponse({ status: 404, description: 'Események nem találhatóak.' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Esemény sikeresen lekérdezve.' })
  @ApiResponse({ status: 404, description: 'Esemény nem található.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Esemény sikeresen frissítve.' })
  @ApiResponse({ status: 404, description: 'Esemény nem található.' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Esemény sikeresen törölve.' })
  @ApiResponse({ status: 404, description: 'Esemény nem található.' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'Esemény kártyaszám alapján sikeresen regisztrálva.' })
  @ApiResponse({ status: 404, description: 'Diák nem található.' })
  registerByCard(@Body() dto: EventRegisterDto) {
    return this.eventsService.registerByCard(dto);
  }
}
