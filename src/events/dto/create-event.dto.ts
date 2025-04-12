export class CreateEventDto {
    studentId: number;
    action: string;
    userId: number;
    timestamp?: Date;
  }