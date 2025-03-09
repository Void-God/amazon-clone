import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


export class RegisterBodyDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;


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
    name: string

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
    name: string

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

export class ChangePasswordBodyDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string;
}


export class ChangePasswordResponseDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    message: string;
}


export class ValidateOtpBodyDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    email: string;


    @IsNotEmpty()
    @ApiProperty({ required: true })
    otp: string;
}


export class ValidateOtpResponseDto {
    @ApiProperty({ required: false })
    message: string;


    @IsNotEmpty()
    @ApiProperty({ required: false })
    token: string;
}

export class ChangedPasswordBodyDto {
    @IsNotEmpty()
    @ApiProperty({ required: true })
    token: string;


    @IsNotEmpty()
    @ApiProperty({ required: true })
    password: string;


    @IsNotEmpty()
    @ApiProperty({ required: true })
    confirmPassword: string;
}


export type Roles = "buyer" | "business" | "SUPERADMIN";
