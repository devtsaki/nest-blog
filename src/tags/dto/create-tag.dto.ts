import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  name: string;

  @IsNumber()
  @ApiProperty()
  postId: number;
}
