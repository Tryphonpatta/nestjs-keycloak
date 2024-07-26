import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard, RoleGuard, Unprotected } from 'nest-keycloak-connect';
import { KeycloakAdminService } from 'src/keycloak-admin/keycloak-admin.service';

@Controller('user')
// @UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly keycloackAdmin: KeycloakAdminService,
  ) {}

  @Post('/signup')
  @Unprotected()
  singUp(@Body() createUserDto: any) {
    return this.keycloackAdmin.createUser(createUserDto);
  }

  @Post('/login')
  @Unprotected()
  logIn(@Body() createUserDto: any) {
    return this.keycloackAdmin.loginUser(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
