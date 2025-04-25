import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PortaService } from './porta.service';
import { CreatePortaDto } from './dto/create-porta.dto';
import { UpdatePortaDto } from './dto/update-porta.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@ApiTags('porta')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('porta')
export class PortaController {
  constructor(private readonly portaService: PortaService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Porta sikeresen létrehozva.' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok.' })
  @ApiResponse({ status: 409, description: 'Ez a porta már létezik.' })
  create(@Body() CreatePortaDto: CreatePortaDto) {
    return this.portaService.create(CreatePortaDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Porták sikeresen lekérdezve.' })
  @ApiResponse({ status: 404, description: 'Porták nem találhatóak.' })
  
  findAll() {
    return this.portaService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Porta sikeresen lekérdezve.' })
  @ApiResponse({ status: 404, description: 'Porta nem található.' })
  findOne(@Param('id') id: string) {
    return this.portaService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Porta sikeresen frissítve.' })
  @ApiResponse({ status: 404, description: 'Porta nem található.' })
  update(@Param('id') id: string, @Body() CreatePortaDto: CreatePortaDto) {
    return this.portaService.update(+id, CreatePortaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Porta sikeresen törölve.' })
  @ApiResponse({ status: 404, description: 'Porta nem található.' })
  delete(@Param('id') id: string) {
    return this.portaService.delete(+id);
  }
}