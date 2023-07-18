import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
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
    // Hook to hash the password before saving
    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }

}