import { Body, Controller, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginBodyDto, RegisterBodyDto } from './authdto';


@ApiTags("auth")
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ) { }



    @ApiBody({
        type: RegisterBodyDto
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post('register')
    async getOrderList(@Body() request: RegisterBodyDto, @Req() req: any) {
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
    @Post('login')
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAdminOrders(@Body() request: RegisterBodyDto) {
        try {
            const login = await this.authService.login(request.email, request.password);
            return login
        } catch (e) {
            throw e
        }
    }

}
