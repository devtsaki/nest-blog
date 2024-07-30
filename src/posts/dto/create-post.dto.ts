import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsInt,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsInt()
  @ApiProperty({ required: false })
  authorId: number;

  @IsInt({ each: true })
  @ApiProperty({ type: [Number], required: false })
  tagIds?: number[];
}
