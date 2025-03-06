import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginBodyDto, LoginResponseDto, RegisterBodyDto, RegisterResponseDto } from './authdto';
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

}
