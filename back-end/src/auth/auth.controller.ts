import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangedPasswordBodyDto, ChangePasswordBodyDto, ChangePasswordResponseDto, LoginBodyDto, LoginResponseDto, RegisterBodyDto, RegisterResponseDto, ValidateOtpBodyDto, ValidateOtpResponseDto } from './authdto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ModuleAccessGuard } from './guards/module-access.guard';
import { ModuleAccess } from './decorators/module-access.decorator';


@ApiTags("auth")
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }



    @ApiBody({
        type: RegisterBodyDto
    })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: RegisterResponseDto,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('register')
    async registerUser(@Body() request: RegisterBodyDto, @Req() req: any) {
        try {
            const user = await this.authService.register(request)
            delete user.password
            delete user.isDeleted
            return user;
        } catch (e) {
            throw e;
        }
    }


    @ApiBody({
        type: LoginBodyDto
    })
    @ApiResponse({
        status: 200,
        description: 'User successfully registered',
        type: LoginResponseDto,
    })
    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async loginUser(@Body() request: LoginBodyDto) {
        try {
            const login = await this.authService.login(request.email, request.password);
            return login
        } catch (e) {
            throw e
        }
    }


    @ApiBody({
        type: ChangePasswordBodyDto
    })
    @ApiResponse({
        status: 200,
        description: 'OTP Sent!',
        type: ChangePasswordResponseDto,
    })
    @Post('send-otp')
    @UsePipes(new ValidationPipe({ transform: true }))
    async sendOtp(@Body() request: ChangePasswordBodyDto) {
        try {

            await this.authService.sendOtp(request.email);

            return {
                message: 'otp sent!'
            }
        } catch (e) {
            throw e
        }
    }



    @ApiBody({
        type: ChangePasswordBodyDto
    })
    @ApiResponse({
        status: 200,
        description: 'OTP resent!',
        type: ChangePasswordResponseDto,
    })
    @Post('resend-otp')
    @UsePipes(new ValidationPipe({ transform: true }))
    async resendOtp(@Body() request: ChangePasswordBodyDto) {
        try {

            await this.authService.sendOtp(request.email);

            return {
                message: 'OTP resent!'
            }
        } catch (e) {
            throw e
        }
    }



    @ApiBody({
        type: ValidateOtpBodyDto
    })
    @ApiResponse({
        status: 200,
        description: 'OTP resent!',
        type: ValidateOtpResponseDto,
    })
    @Post('validate-otp')
    @UsePipes(new ValidationPipe({ transform: true }))
    async validateOtp(@Body() request: ValidateOtpBodyDto) {
        try {

            const token = await this.authService.validateOtp(request);

            return {
                message: 'OTP validated!',
                token
            }
        } catch (e) {
            throw e
        }
    }



    @ApiBody({
        type: ChangedPasswordBodyDto
    })
    @ApiResponse({
        status: 200,
        description: 'password changed!',
        type: ChangePasswordResponseDto,
    })
    @Post('change-password')
    @UsePipes(new ValidationPipe({ transform: true }))
    async changePassword(@Body() request: ChangedPasswordBodyDto) {
        try {

            await this.authService.changePassword(request);

            return {
                message: 'password change!',
            }
        } catch (e) {
            throw e
        }
    }




    @ApiBody({
        type: RegisterBodyDto
    })
    @ApiResponse({
        status: 201,
        description: 'User successfully registered',
        type: RegisterResponseDto,
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('register-business')
    @UseGuards(JwtAuthGuard, ModuleAccessGuard)
    @ModuleAccess('SUPERADMIN')
    async reagisterBusiness(@Body() request: RegisterBodyDto) {
        try {
            const user = await this.authService.register(request, 'business')
            delete user.password
            delete user.isDeleted
            return user;
        } catch (e) {
            throw e;
        }
    }


    @Get('/profile')
    @ApiResponse({
        status: 200,
        description: 'Profile details',
        type: LoginResponseDto,
    })
    @UseGuards(JwtAuthGuard)
    async getProfile(@Request() req) {
        try {
            const userEmail = req.user.mail;
            const user = await this.authService.getProfile(userEmail)
            return user;
        } catch (e) {
            throw e;
        }
    }
}
