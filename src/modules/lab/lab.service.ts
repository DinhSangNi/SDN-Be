import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lab, LabDocument } from './schema/lab.schema';
import { CreateLabDto } from './dto/create-lab.dto';

@Injectable()
export class LabService {
  constructor(@InjectModel(Lab.name) private labModel: Model<LabDocument>) {}

  async create(createLabDto: CreateLabDto): Promise<LabDocument> {
    const lab = new this.labModel(createLabDto);
    return lab.save();
  }

  async findAll(): Promise<Lab[]> {
    return await this.labModel.find().lean();
  }
}
