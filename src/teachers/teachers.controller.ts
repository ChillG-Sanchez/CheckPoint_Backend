import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('teachers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Teacher successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Teachers successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Teachers not found.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Teacher successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Teacher successfully updated.' })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Teacher successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Teacher not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}