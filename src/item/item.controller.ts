import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import { ItemService } from './item.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { CreateItemDto, ItemResponseDto } from './itemDto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ModuleAccessGuard } from 'src/auth/guards/module-access.guard';
import { ModuleAccess } from 'src/auth/decorators/module-access.decorator';



@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }



  @UseGuards(JwtAuthGuard, ModuleAccessGuard)
  @ModuleAccess('business')
  @Get('business-item')
  async getAllItems(
    @Request() req,
  ) {
    return this.itemService.getBusinessItems(req.user.id);
  }

  @Get(':id')
  async getItemById(@Param('id') id: number) {
    return this.itemService.getItemById(id);
  }
}