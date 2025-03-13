import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

// DTO for Image response
export class ImageResponseDto {
    @ApiResponseProperty({ example: 1 })
    id: number;

    @ApiResponseProperty({ example: '1678421234567-123456789.jpg' })
    filename: string;

    @ApiResponseProperty({ example: 'product-image.jpg' })
    originalname: string;

    @ApiResponseProperty({ example: 'image/jpeg' })
    mimetype: string;

    @ApiResponseProperty({ example: 'uploads/1678421234567-123456789.jpg' })
    path: string;

    @ApiResponseProperty({ example: 12345 })
    size: number;
}

export class CreateItemDto {
    @ApiProperty({
        description: 'The name of the item',
        example: 'Modern Office Chair'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Detailed description of the item',
        example: 'Ergonomic office chair with adjustable height and lumbar support'
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Price of the item',
        example: 199.99,
        type: Number
    })
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty({
        description: 'Images of the item (jpeg, png, gif, webp only, max 5MB per file)',
        type: 'array',
        items: {
            type: 'file',
            format: 'binary'
        },
        required: true
    })
    images: any[];
}

// DTO for item responses
export class ItemResponseDto {
    @ApiResponseProperty({ example: 1 })
    id: number;

    @ApiResponseProperty({ example: 'Modern Office Chair' })
    name: string;

    @ApiResponseProperty({ example: 'Ergonomic office chair with adjustable height and lumbar support' })
    description: string;

    @ApiResponseProperty({ example: 199.99 })
    price: number;

    @ApiResponseProperty({ type: [ImageResponseDto] })
    images: ImageResponseDto[];
}

// DTO for getting a specific item by ID
export class GetItemParamDto {
    @ApiProperty({
        description: 'The ID of the item to retrieve',
        example: 1
    })
    @IsNumber()
    @Type(() => Number)
    id: number;
}

// DTO for API responses
export class ApiResponseDto<T> {
    @ApiResponseProperty({ example: true })
    success: boolean;

    @ApiResponseProperty({ example: 'Operation completed successfully' })
    message: string;

    @ApiResponseProperty()
    data: T;
}

// Specialized response DTOs for each endpoint
export class CreateItemResponseDto extends ApiResponseDto<ItemResponseDto> { }
export class GetItemResponseDto extends ApiResponseDto<ItemResponseDto> { }
export class GetAllItemsResponseDto extends ApiResponseDto<ItemResponseDto[]> { }