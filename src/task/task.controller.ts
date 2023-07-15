import { Controller, Get, Post, Put, Delete, Body, Res,Param,UnauthorizedException } from '@nestjs/common';
import { TaskService } from './task.service';
import { task } from './task.entity';
import { User } from 'src/user/user.entity';
import { login } from 'src/login/login.entity';
import { LoginService } from 'src/login/login.service';
import { UpdateTodoDto } from './create-task.dto';

import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { error } from 'console';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TaskService,
    private LoginService:LoginService,
    ) {}

  @Get()
  async getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Post()
  async createTodo(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('completeBefore') completeBefore: string,
    
  ) {
    const completeBeforeDate = new Date(completeBefore);
    return this.todoService.createTodo(name, description, completeBeforeDate);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number) {
    return await  this.todoService.getTodoById(id);
  }

  @Put('updatetask')
  async updateTodo(
    @Body() Task:UpdateTodoDto,@Res() responce:any
  ) {
    console.log(Task)
   
    const Log= await this.LoginService.findbyId(Task.assignedByUser)
    if(Log){
    console.log(Log);
    const user=new User();
    user.id = Task.assignedToUser; 
    const log=new login()
    log.id=Task.assignedByUser;
    const t=new task();
    t.id=Task.id;
    t.name=Task.name;
    t.description=Task.description;t.completeBefore=Task.completeBefore;
    t.assignedToUser=user;
    t.assignedByUser=log;
 const res=this.todoService.updateTodo(t);
    if(res){
        responce.setHeader('Authorization', ``);
        responce.status(200).json({ user });
        
        return responce;
    }else{  throw new UnauthorizedException}}
    else{throw new UnauthorizedException}
}

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }
}
