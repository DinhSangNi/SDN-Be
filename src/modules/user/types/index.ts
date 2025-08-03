import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.schema';

export interface UserImportResult {
  createdUsers: User[];
  errors: {
    row: number;
    error: string[];
    data: Partial<CreateUserDto>;
  }[];
}
