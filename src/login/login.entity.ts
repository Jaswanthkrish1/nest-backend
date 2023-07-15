import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
@Entity()
export class login{
    @PrimaryGeneratedColumn()
    id :Number;
    
    @Column()
    email :string;

    @Column()
    password : string;
    
    @CreateDateColumn()
    createdat:string;

}