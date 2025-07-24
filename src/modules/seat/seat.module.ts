import { forwardRef, Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { LabModule } from '../lab/lab.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Seat, SeatSchema } from './schemas/seat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Seat.name,
        schema: SeatSchema,
      },
    ]),
    forwardRef(() => LabModule),
  ],
  controllers: [SeatController],
  providers: [SeatService],
  exports: [SeatService],
})
export class SeatModule {}
