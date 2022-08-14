import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { GoogleGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() signUpdto: SignUpDto) {
    return await this.authService.signUp(signUpdto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(signInDto);
    return {
      accessToken: token,
      type: 'bearer',
    };
  }

  @Get('google')
  @UseGuards(GoogleGuard)
  async signInGoogle() {
    this.logger.log('Auth with google');
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async signInGoogleCallback(@Req() req: Express.Request) {
    const user = req.user as any;
    const token = this.authService.getJwtToken({ userId: user.id });
    return {
      accessToken: token,
      type: 'bearer',
    };
  }
}
