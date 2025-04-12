import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PortaService } from './porta.service';
import { CreatePortaDto } from './dto/create-porta.dto';

@Controller('porta')
export class PortaController {
  constructor(private readonly portaService: PortaService) {}

  @Post()
  create(@Body() CreatePortaDto: CreatePortaDto) {
    return this.portaService.create(CreatePortaDto);
  }

  @Get()
  findAll() {
    return this.portaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() CreatePortaDto: CreatePortaDto) {
    return this.portaService.update(+id, CreatePortaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.portaService.delete(+id);
  }
}