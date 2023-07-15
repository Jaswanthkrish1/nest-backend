import { Controller, Get , Post ,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt'

@Controller('Login')
export class AppController {
  constructor(private readonly appService: AppService, private readonly jwtService:JwtService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  Login(@Body ('username') username : string,@Body ('password') password : string ):string{
   return 'hii'

  }
}
