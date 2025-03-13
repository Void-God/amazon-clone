import { IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ForgotPassword {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;



    @Column()
    userId: number;

    @Column()
    @IsNotEmpty()
    otp: string;


    @Column()
    @IsNotEmpty()
    otpExpires: string;


    @Column({ default: null })
    token: string;

}
