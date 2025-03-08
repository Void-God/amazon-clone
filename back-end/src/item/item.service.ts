import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Image } from './item-images.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async createEcommerceItem(
    data: { name: string; description: string; price: number },
    files: Express.Multer.File[],
  ) {
    const item = this.itemRepository.create({
      name: data.name,
      description: data.description,
      price: data.price,
      images: files.map((file) => {
        const image = new Image();
        image.filename = file.filename;
        image.originalname = file.originalname;
        image.mimetype = file.mimetype;
        image.path = file.path;
        image.size = file.size;
        return image;
      }),
    });
    return await this.itemRepository.save(item);
  }

  async getBusinessItems(businessId): Promise<Item[]> {
    return this.itemRepository.find({where : {businessId}, relations: ['images'] });
  }

  async getItemById(id: number): Promise<Item> {
    return this.itemRepository.findOne({ where: { id }, relations: ['images'] });
  }
}