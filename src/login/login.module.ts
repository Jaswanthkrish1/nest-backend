import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { login } from './login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([login]),JwtModule.register({
    secret: 'hhh', // Customize the secret key
    signOptions: { expiresIn: '36000' }, // Customize the expiration time as per your requirements
    
  }),
    
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports:[LoginService]
})
export class LoginModule {}
