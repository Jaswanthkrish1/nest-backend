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
import { UserService } from 'src/user/user.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly taskService: TaskService,
    private LoginService:LoginService
    ) {}

  @Get()
  async getAllTodos() {
    return this.taskService.getAllTodos();
  }

  @Post()
  async createTodo(
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('completeBefore') completeBefore: string,
    
  ) {
   // const completeBeforeDate = new Date(completeBefore);
    return this.taskService.createTodo(name, description, completeBefore);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number) {
    return await  this.taskService.getTodoById(id);
  }

  @Put('updatetask')
  async updateTodo(
    @Body() Taskdto:UpdateTodoDto,@Res() responce:any
  ) {
    console.log(Taskdto)
   //finding admin user
    const Log= await this.LoginService.findbyId(Taskdto.assignedByUser)
    //if user exites
    if(Log){
      //admin user id
    console.log(Log);
    // object of User details
    const user=new User();
    user.id = Taskdto.assignedToUser;
    //object of login admin details 
    const log=new login()
    log.id=Taskdto.assignedByUser;
    //object of task details
    const t=new task();
    t.id=Taskdto.id;
    t.name=Taskdto.name;
    t.description=Taskdto.description;
    t.completeBefore=Taskdto.completeBefore;
    t.assignedToUser=user;
    t.assignedByUser=log;
    console.log(t)
    //if task Updated sccussfully then  send responce
 const res=this.taskService.updateTodo(t);
    if(res){
        responce.setHeader('Authorization', ``);
        responce.status(200).json({ user , res });
        return responce;
    }else{  throw new UnauthorizedException}
  }
    else{throw new UnauthorizedException}
}

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.taskService.deleteTodo(id);
  }
}
