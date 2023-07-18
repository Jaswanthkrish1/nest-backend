import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TodoController } from './task.controller';
import { User } from 'src/user/user.entity';
import { task } from './task.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { login } from 'src/login/login.entity';
import { LoginService } from 'src/login/login.service';
import { UserService } from 'src/user/user.service';
@Module({
  imports:[TypeOrmModule.forFeature([task, User,login]),JwtModule],
  providers: [TaskService,LoginService,UserService],
  controllers: [TodoController],
  exports:[TaskService]
})
export class TaskModule {}
