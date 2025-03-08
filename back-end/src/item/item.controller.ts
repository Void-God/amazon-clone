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



  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateItemDto
  })
  @ApiResponse({
    status: 201,
    description: 'Uploaded',
    type: ItemResponseDto,
  })
  @UseGuards(JwtAuthGuard, ModuleAccessGuard)
  @ModuleAccess('business')
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          // Check file type before accepting upload
          console.log('this is triggered!!!')
          if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|jpg)$/)) {
            return callback(
              new BadRequestException('Only image files are allowed (jpeg, png, gif, webp)'),
              null
            );
          }

          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        // Double-check file type in fileFilter as well for extra security
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|jpg)$/)) {
          return callback(
            new BadRequestException('Only image files are allowed (jpeg, png, gif, webp)'),
            false
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB size limit
      },
    }),
  )
  async createItem(
    @Body() data: CreateItemDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(data, files, 'this is files')
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('At least one image is required');
      }
        
      return this.itemService.createEcommerceItem(data, files);
    }catch(e){
      throw e;
    }
  }


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