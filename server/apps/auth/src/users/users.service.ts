import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '@app/database';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.databaseService.auth_users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.databaseService.auth_users.findMany({});
  }

  async findOne(id: number) {
    return await this.databaseService.auth_users.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.auth_users.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.databaseService.auth_users.delete({ where: { id } });
  }
}
