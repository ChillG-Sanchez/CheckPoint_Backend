import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Felhasználó sikeresen létrehozva' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Felhasználók sikeresen lekérdezve' })
  findAll(@Req() req: Request) {
    console.log('Incoming Request Headers:', req.headers);
    console.log('Incoming Request Query:', req.query);
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen lekérdezve' })
  @ApiResponse({ status: 404, description: 'Felhasználó nem található' })
  @ApiResponse({ status: 401, description: 'Jogosultság megtagadva' })
  async findOne(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Felhasználó nem található');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.admin?.name || user.teacher?.name || user.student?.name || user.porta?.name || 'N/A',
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen frissítve' })
  @ApiResponse({ status: 404, description: 'Felhasználó nem található' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    console.log('PATCH kérelem érkezett az ID-hez:', id);
    console.log('Frissítendő adatok:', updateUserDto);

    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('Felhasználó nem található');
    }

    return {
      message: 'Felhasználó sikeresen frissítve',
      user: updatedUser,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen törölve' })
  @ApiResponse({ status: 404, description: 'Felhasználó nem található' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  @ApiResponse({ status: 401, description: 'Jogosultság megtagadva' })
  @ApiResponse({ status: 403, description: 'Hozzáférés megtagadva' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}