import { ApiProperty } from '@nestjs/swagger';

export class EventRegisterDto {
  @ApiProperty({ description: 'A diák diákigazolvány száma (studentCardNumber)' })
  studentCardNumber: string;

  @ApiProperty({ description: 'A portás userId-ja, aki rögzítette az eseményt' })
  recordedByPortaId: number;
}
