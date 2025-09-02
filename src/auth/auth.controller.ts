import { Body, Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';

import { Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';

import { AuthGuard } from './dto/guards/auth.guard';
import { token, User } from './dto/guards/decorator';
import type { CurrentUser } from './interfaces/current-user.interface';


@Controller('auth')
export class AuthController {
 constructor(
     @Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
     return this.client.send('auth.register.user', registerUserDto)
     .pipe(
      catchError((error) =>{
        throw new RpcException(error);
      }),
     );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto)
    .pipe(
      catchError((error) =>{
        throw new RpcException(error);
      }),
    );
  }


  @UseGuards(AuthGuard)
  @Get('verify')
verifyToken( @User() user: CurrentUser ,@token() token: string) {

   // return this.client.send('auth.verify.user', { user, token });
 return {user ,token};
  }
}
