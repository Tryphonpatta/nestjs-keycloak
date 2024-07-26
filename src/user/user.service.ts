import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { KeycloakAdminService } from 'src/keycloak-admin/keycloak-admin.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private keycloakAdmin: KeycloakAdminService,
  ) {}

  async create(createUserDto: any) {
    return await this.keycloakAdmin.createUser(createUserDto);
    // return 'This action adds a new user';
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
