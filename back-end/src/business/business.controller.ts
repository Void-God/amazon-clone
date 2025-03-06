import { Body, Controller, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ModuleAccess } from 'src/auth/decorators/module-access.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleAccessGuard } from 'src/auth/guards/module-access.guard';

@Controller('business')
export class BusinessController {
    constructor(
        private authService:AuthService
    ) {

    }

    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @UseGuards(JwtAuthGuard, ModuleAccessGuard)
    @ModuleAccess('SUPERADMIN')
    @Get('list')
    async getBusinessList(
        @Query('page', ParseIntPipe) page: number,
        @Query('limit',ParseIntPipe) limit: number
    ) {
        if(!page){
            page = 0
        }
        if(!limit){
            limit = 100
        }
        return await this.authService.getBusinessesList(page,limit);
    }



}
