import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


export class RegisterBodyDto {


    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;


}


export class LoginBodyDto {

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}



export class LoginResponseDto {

    @ApiProperty({ required: false })
    token: string;

    @ApiProperty({ required: false })
    email: string;

    @ApiProperty({ required: false })
    phoneNumber: string;

    @ApiProperty({ required: false })
    imageRelativePath: string;

    @ApiProperty({ required: false })
    imageLocalName: string;

    @Column()
    role: string;


}

export class RegisterResponseDto {

    @ApiProperty({ required: false })
    id: number;

    @ApiProperty({ required: false })
    email: string;

    @ApiProperty({ required: false })
    phoneNumber: string;

    @ApiProperty({ required: false })
    role: string;

    @ApiProperty({ required: false })
    imageRelativePath: string | null;

    @ApiProperty({ required: false })
    imageLocalName: string | null;
}






export type Roles = "buyer" | "business" | "SUPERADMIN";
