import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOneOptions, Repository } from 'typeorm';
import { task } from './task.entity';
import { User } from 'src/user/user.entity';
import { login } from 'src/login/login.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(task)
    private todoRepository: Repository<task>,
    @InjectRepository (login) private loginRipo:Repository<login>
  ) {}

  async getAllTodos(): Promise<task[]> {
    return this.todoRepository.find({ relations: ['assignedToUser', 'assignedByUser'] });
  }
  async getup(id:number){
    const d= await this.loginRipo.findOne({
        where: { id: Equal(id) },
      });
      console.log(d)
  }
  async createTodo(name: string, description: string, completeBefore: Date): Promise<task> {
    const todo = new task();
    todo.name = name;
    todo.description = description;
    todo.completeBefore = completeBefore;
    // todo.assignedToUser = { id: assignedToUserId } as User;
    // todo.assignedByUser = { id: assignedByUserId } as User;
    return await this.todoRepository.save(todo);
  }

  async getTodoById(id: number): Promise<task> {
    const options: FindOneOptions<task> = {
        where: { id: Equal(id) },
      };
    return this.todoRepository.findOne(options);
  }

  async updateTodo( updateTodoDto: task): Promise<task> {
    const options: FindOneOptions<task> = {
        where: { id: Equal(updateTodoDto.id) },
      };
    const todo = await this.todoRepository.findOne(options );
    todo.name = updateTodoDto.name;
    todo.description = updateTodoDto.description;
    todo.completeBefore = updateTodoDto.completeBefore;
    todo.assignedToUser = updateTodoDto.assignedToUser;
    todo.assignedByUser = updateTodoDto.assignedByUser;
    return await this.todoRepository.save(todo);
  }
  // deleting the user from task
  async deleteTasksByAssignedUser(assignedUserId: number): Promise<boolean> {
    const tasks = await this.todoRepository.find({where:{ assignedToUser: Equal(assignedUserId)} });
    console.log(tasks.length)
    if(tasks.length>0){

    for (const task of tasks) {
        task.assignedToUser = null; // Update assignedToUser to null
      }
      await this.todoRepository.save(tasks); 
    return true}
    else{return true}

  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
