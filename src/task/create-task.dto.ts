import { login } from "src/login/login.entity";
import { User } from "src/user/user.entity";

export class CreateTaskDto {
    name: string;
    description: string;
    completeBefore: string;
  }
  export class UpdateTodoDto {
    id?:number;
    name?: string;
    description?: string;
    completeBefore?: string;
    assignedToUser?: number;
    assignedByUser?: number;
  }
  