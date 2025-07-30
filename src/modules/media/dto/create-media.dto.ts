import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMediaDto {
  @ApiProperty({
    description: 'URL của media',
    example: 'https://res.cloudinary.com/abc/image/upload/v1/sample.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Public ID từ Cloudinary',
    example: 'sample_public_id',
  })
  @IsString()
  @IsNotEmpty()
  publicId: string;

  @ApiPropertyOptional({
    description: 'Tên gợi nhớ của media',
    example: 'Ảnh đại diện bài viết',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Dung lượng file (bytes)',
    example: 204800,
  })
  @IsOptional()
  @IsNumber()
  size?: number;

  @ApiPropertyOptional({
    description: 'ID người tải lên',
    example: '64c8e2d8f4f5a0c9bcb3123f',
  })
  @IsOptional()
  @IsString()
  uploadedBy?: string;

  @ApiPropertyOptional({
    description: 'Media tạm thời (true = sẽ bị xóa sau)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isTemporary?: boolean;

  @ApiPropertyOptional({
    description: 'Loại media (ví dụ: image, video)',
    example: 'image',
  })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({
    description: 'ID liên kết đối tượng (bài viết, user, v.v)',
    example: '64c8e2d8f4f5a0c9bcb3123f',
  })
  @IsOptional()
  @IsString()
  relatedTo?: string;

  @ApiPropertyOptional({
    description: 'Mô tả ngắn về media',
    example: 'Ảnh minh họa bài đăng',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
