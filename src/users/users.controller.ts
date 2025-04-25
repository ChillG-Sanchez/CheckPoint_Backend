import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen lekérdezve' })
  @ApiResponse({ status: 404, description: 'Felhasználó nem található' })
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Felhasználó sikeresen frissítve' })
  @ApiResponse({ status: 404, description: 'Felhasználó nem található' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
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