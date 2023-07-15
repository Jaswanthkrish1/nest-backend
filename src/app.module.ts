import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './typeorm.config';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { TaskModule } from './task/task.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [JwtModule, LoginModule,uuidv4,
            TaskModule,UserModule,
   
    TypeOrmModule.forRoot(typeOrmConfig),
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
