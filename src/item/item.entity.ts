import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Image } from './item-images.entity'; // Assume an Image entity is defined

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('decimal')
    price: number;

    @Column()
    businessId: number;

    @OneToMany(() => Image, (image) => image.item, { cascade: true })
    images: Image[];
}
