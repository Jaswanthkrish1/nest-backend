import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TaskService } from 'src/task/task.service';
import { User } from './user.entity';
import { task } from 'src/task/task.entity';
import { TaskModule } from 'src/task/task.module';
import { LoginModule } from 'src/login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginService } from 'src/login/login.service';
import { login } from 'src/login/login.entity';
@Module({
  imports:[TypeOrmModule.forFeature([task, User,login]),TaskModule],
  controllers: [UserController],
  providers: [UserService,TaskService],
  exports:[UserService]
})
export class UserModule {}
