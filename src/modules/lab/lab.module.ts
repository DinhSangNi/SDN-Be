import { Module } from '@nestjs/common';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lab, LabSchema } from './schema/lab.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Lab.name,
        schema: LabSchema,
      },
    ]),
  ],
  controllers: [LabController],
  providers: [LabService],
  exports: [LabService],
})
export class LabModule {}
