import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {

  @ApiProperty({ description: 'A diák azonosítószáma' })
  studentId: number;

  @ApiProperty({ description: 'Az esemény típusa' })
  action: string;

  @ApiProperty({ description: 'A diák azonosítója' })
  userId: number;

  @ApiProperty({ description: 'Időpont' })
  timestamp?: Date;

}