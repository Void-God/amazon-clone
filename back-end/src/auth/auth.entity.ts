import { IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column()
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    email: string;


    @Column()
    @IsNotEmpty()
    phoneNumber: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    imageRelativePath: string;


    @Column()
    imageLocalName: string;



    @Column()
    isDeleted: number;
}
