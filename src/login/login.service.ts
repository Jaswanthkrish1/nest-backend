import { Injectable, UnauthorizedException } from '@nestjs/common';
import { login } from './login.entity';
import { Equal, FindOneOptions, Repository,UpdateResult,DeleteResult, ILike  } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { equal } from 'assert';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
@Injectable()
export class LoginService {
    constructor (@InjectRepository (login) private loginRipo:Repository<login>,private Jwtservice:JwtService){

    }
    generateToken(userId: string): string {
        return this.Jwtservice.sign({ userId });
      }
    async Authenticate( Login:login):Promise<login>{
       const userAvilable=await this.findByEmail(Login.email)
       if(userAvilable){
        //const user=userAvilable.email;
        if(userAvilable.email===Login.email && userAvilable.password===Login.password){
           
            return userAvilable;
        }
       }else{return null;}
       
    }

    async getall() :Promise<login[]>
    {
        return await this.loginRipo.find();
    }
    async create(Login:login):Promise<login>{
        const log= await this.findByEmail(Login.email)
        console.log(log)
        if(log==null){
        return await this.loginRipo.save(Login);}
        else{ throw new UnauthorizedException }
        
    }
    // async findById(id: number): Promise<login> {
    //     const options: FindOneOptions<login> = {
    //       where: { id: Equal(id) },
    //     };
        
    //     return await this.loginRipo.findOne(options);
    //   };

      async findbyId(id:Number):Promise<number>{
        const options: FindOneOptions<login> = {
            where: { id: Equal(id) },
          };
          
          const ref= await this.loginRipo.findOne(options);
          if(ref){
            
            return await ref.id.valueOf();
          }else{return 0;}
      }
    
      async findByEmail(email: string): Promise<login> {
        
        const exited= await this.loginRipo.findOne( {where: { email: ILike(email) }});
       
        return  exited;
    }

    async deletebyID(id:number):Promise<DeleteResult>{
        return await this.loginRipo.delete(id);
    }
    // async Update(id:number, Login:login):Promise<UpdateResult>{
    //      Login.password=
    //     const data=await this.loginRipo.update(id,Login);
    //     this.loginRipo.save(data)
    //     console.log(data.affected)
    // return data;
    // }

    async forgotpassword(Login:login):Promise<string>{
        const userdetails=await this.findByEmail(Login.email);
        if(userdetails!=null){
            userdetails.password=Login.password;
            this.loginRipo.save(userdetails);
        return "Password is changed"

         } else {throw new UnauthorizedException;
          }
    }
}
