import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth, GetUser } from './decorators';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtGuard } from './guards/jwt.guard';
import { ValidRoles } from './interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('refresh-token')
  @Auth()
  refreshToken(@GetUser() user: User) {
    return this.authService.refreshToken(user);
  }

  @Get()
  @UseGuards(JwtGuard)
  testingPrivateRoute(@GetUser() user: User) {
    return {
      user,
    };
  }

  // @SetMetadata('roles', ['admin', 'super-user'])
  // @RoleProtected(ValidRoles.superUser, ValidRoles.admin)
  // @UseGuards(JwtGuard, UserRoleGuard)
  @Get('private2')
  @Auth(ValidRoles.admin)
  privateRoute2(@GetUser() user: User) {
    return {
      user,
    };
  }
}
