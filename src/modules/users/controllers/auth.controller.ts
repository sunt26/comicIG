import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import SigninDTO from '../dtos/signin.dto';
import SignupDTO from '../dtos/signup.dto';
import User from '../entities/user.entity';
import AuthService from '../services/auth.service';

@Controller('auth')
class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() params: SigninDTO) {
    console.log(params);
    const user = (await this.authService.validate(params)) as any;
    return this.authService.signin(user);
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ResponseInterceptor)
  signup(@Body() params: SigninDTO) {
    this.authService.signup(params);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}

export default AuthController;
