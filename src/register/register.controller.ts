import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Admin sikeresen létrehozva.' })
  @ApiResponse({ status: 409, description: 'Ez az email cím már használatban van.' })
  @ApiResponse({ status: 400, description: 'Hibás bemeneti adatok.' })
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }
}