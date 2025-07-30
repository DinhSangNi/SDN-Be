import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SeatStatus } from '../types/seat.enum';

export class CreateSeatDto {
  @ApiProperty({
    example: 'A1',
    description: 'Seat number (e.g., A1, B2)',
  })
  @IsString()
  seatNumber: string;

  @ApiProperty({
    example: '64c3c0f0f4e8f5a9b2e9c4d1',
    description: 'MongoDB ObjectId of the lab this seat belongs to',
  })
  @IsMongoId()
  labId: string;

  @ApiPropertyOptional({
    enum: SeatStatus,
    example: SeatStatus.AVAILABLE,
    description: 'Status of the seat (optional)',
  })
  @IsOptional()
  @IsEnum(SeatStatus)
  status?: SeatStatus;
}
