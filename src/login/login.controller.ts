import { Controller,Put,Post,Get,Param,Body,Delete,Res, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { login } from './login.entity';
import { CookieOptions, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import path from 'path';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Http2ServerResponse } from 'http2';
import { UpdateResult } from 'typeorm';
import { response } from 'express';
@Controller('login1')
export class LoginController {
    constructor( private loginserv:LoginService){}
    @Get('getall')
    async getall():Promise<login[]>{
        return this.loginserv.getall() ;
    }
    @Post('Register')
    async create(@Body() Login:login):Promise<login>{
    return await this.loginserv.create(Login)
            }

    @Post('email')
    async byemail(@Body() Login:login):Promise<login>{
        // console.log(email)
         const result= await this.loginserv.findByEmail(Login.email);
         // Cheking of the gamil find out is working or not is working or not
        //  console.log(result)
         if(result==null){
            throw new UnauthorizedException;
         }else{
            console.log(result)
         return result;
        }
   
    }


    @Post('Adlogin')
async Authenticate(@Body() Login: login, @Res() response: Response): Promise<any> {
  const user = await this.loginserv.Authenticate(Login);

  if (user != null) {
    const token = await this.loginserv.generateToken(Login.email);
    console.log(token);

    // Set the token as a cookie
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Cookie expiration time (7 days)
    };
    response.cookie('token', token, cookieOptions);

    response.status(200).json({ token, user });

    return response;
  } else {
    throw new UnauthorizedException();
  }
}


    @Post('forgot')
    async forgot(@Body() Login:login):Promise<string>{
        return await this.loginserv.forgotpassword(Login)
    }
    @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.loginserv.deletebyID(id);
  }
}
