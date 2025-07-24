import { forwardRef, Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lab, LabSchema } from './schema/lab.schema';
import { SeatModule } from '../seat/seat.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lab.name,
        schema: LabSchema,
      },
    ]),
    forwardRef(() => SeatModule),
    forwardRef(() => BookingModule),
  ],
  controllers: [LabController],
  providers: [LabService],
  exports: [LabService],
})
export class LabModule {}
