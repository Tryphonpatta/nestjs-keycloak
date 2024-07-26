import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { KeycloakAdminService } from 'src/keycloak-admin/keycloak-admin.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, KeycloakAdminService],
})
export class UserModule {}
