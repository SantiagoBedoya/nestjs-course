import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuth } from './interfaces/google-auth.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = this.userRepository.create(signUpDto);
    user.password = bcrypt.hashSync(user.password);
    await this.userRepository.save(user);
    return {
      succes: true,
      userId: user.id,
    };
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('invalid credentials (email)');
    }
    if (!bcrypt.compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException('invalid credentials (password)');
    }
    const token = this.getJwtToken({ userId: user.id });
    return token;
  }

  async validateUser(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async validateUserGoogle({ firstName, lastName, email }: GoogleAuth) {
    let user: User;
    user = await this.userRepository.findOneBy({
      email,
      authenticatedWithGoogle: true,
    });
    if (!user) {
      user = this.userRepository.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        authenticatedWithGoogle: true,
      });
      await this.userRepository.save(user);
    }
    return user;
  }

  getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
