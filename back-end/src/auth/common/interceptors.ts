// src/common/interceptors/image-upload.interceptor.ts

import { BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

/**
 * Creates an image upload interceptor with file validation
 * @param fieldName The form field name for the files
 * @param maxCount Maximum number of files allowed
 * @param destination Destination folder for uploads
 * @param fileSize Maximum file size in bytes (default: 5MB)
 * @returns FilesInterceptor configured for image uploads
 */
export function ImageUploadInterceptor(
  fieldName: string = 'images',
  maxCount: number = 10,
  destination: string = './uploads',
  fileSize: number = 5 * 1024 * 1024,
) {
  return FilesInterceptor(fieldName, maxCount, {
    storage: diskStorage({
      destination,
      filename: (req, file, callback) => {
        // Check file mimetype
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
      // Double-check file type in fileFilter for extra security
      if (!file.mimetype.match(/^image\/(jpeg|png|gif|webp|jpg)$/)) {
        return callback(
          new BadRequestException('Only image files are allowed (jpeg, png, gif, webp)'),
          false
        );
      }
      callback(null, true);
    },
    limits: {
      fileSize,
    },
  });
}