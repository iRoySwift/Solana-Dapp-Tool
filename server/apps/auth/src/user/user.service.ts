import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '@app/database';
// import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.databaseService.auth_user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.databaseService.auth_user.findMany({});
  }

  async findOne(id: number) {
    return await this.databaseService.auth_user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.databaseService.auth_user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.databaseService.auth_user.delete({ where: { id } });
  }
}
