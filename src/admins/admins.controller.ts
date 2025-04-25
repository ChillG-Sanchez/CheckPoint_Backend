import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth} from '@nestjs/swagger';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Admin sikeresen létrehozva.' })
  @ApiResponse({ status: 409, description: 'Ez az email cím már használatban van.' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok.' })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 201, description: 'Adminok sikeresen lekérdezve.' })
  findAll(@Req() req: any) {
    return this.adminsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Admin sikeresen lekérdezve.' })
  @ApiResponse({ status: 404, description: 'Admin nem található.' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.adminsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Admin sikeresen frissítve.' })
  @ApiResponse({ status: 404, description: 'Admin nem található.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Admin sikeresen törölve.' })
  @ApiResponse({ status: 404, description: 'Admin nem található.' })
  remove(@Param('id') id: string) {
    return this.adminsService.remove(+id);
  }
}