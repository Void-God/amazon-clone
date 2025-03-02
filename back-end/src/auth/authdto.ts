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

    @ApiProperty()
    token: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    imageRelativePath: string;

    @ApiProperty()
    imageLocalName: string;


}


export class RegisterResponseDto {

    @ApiProperty()
    token: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    imageRelativePath: string;

    @ApiProperty()
    imageLocalName: string;


}





export type Roles = "buyer" | "business" | "SUPERADMIN";
