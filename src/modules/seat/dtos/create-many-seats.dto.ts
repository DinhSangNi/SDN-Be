import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';

export class CreateManySeatsDto {
  @ApiProperty({
    type: [CreateSeatDto],
    description: 'Array of seats to be created',
    example: [
      {
        seatNumber: 'A1',
        labId: '64c3c0f0f4e8f5a9b2e9c4d1',
        status: 'available',
      },
      {
        seatNumber: 'A2',
        labId: '64c3c0f0f4e8f5a9b2e9c4d1',
        status: 'booked',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSeatDto)
  seats: CreateSeatDto[];
}
