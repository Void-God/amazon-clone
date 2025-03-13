import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { Image } from './item-images.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Image]), AuthModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}