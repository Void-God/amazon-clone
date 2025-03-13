import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { ModuleAccess } from 'src/auth/decorators/module-access.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleAccessGuard } from 'src/auth/guards/module-access.guard';

@Controller('business')
export class BusinessController {
    constructor(
        private authService: AuthService
    ) {

    }

    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @UseGuards(JwtAuthGuard, ModuleAccessGuard)
    @ModuleAccess('SUPERADMIN')
    @Get('list')
    async getBusinessList(
        @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe) limit: number
    ) {
        return await this.authService.getBusinessesList(page, limit);
    }



    @UseGuards(JwtAuthGuard, ModuleAccessGuard)
    @ModuleAccess('SUPERADMIN')
    @Delete(':id')
    async deleteBusiness(
        @Param('id') id: number
    ) {
        return await this.authService.deleteBusiness(id);
    }



}
