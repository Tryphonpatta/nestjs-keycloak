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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { KeycloakAdminService } from 'src/keycloak-admin/keycloak-admin.service';
import {
  AuthGuard,
  Resource,
  RoleGuard,
  Unprotected,
} from 'nest-keycloak-connect';

@Controller('user')
@UseGuards(AuthGuard, RoleGuard)
@Resource('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly keycloackAdmin: KeycloakAdminService,
  ) {}

  @Unprotected()
  @Post('/signup')
  singUp(@Body() createUserDto: any) {
    return this.keycloackAdmin.createUser(createUserDto);
  }

  @Unprotected()
  @Post('/login')
  logIn(@Body() createUserDto: any) {
    return this.keycloackAdmin.loginUser(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    console.log(' ');
    return this.keycloackAdmin.listUser();
  }

  @Resource('Default Resource')
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@Req() req: any) {
    return req.user;
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
