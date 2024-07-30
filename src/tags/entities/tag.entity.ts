import { Tag } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TagEntity implements Tag {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  postId: number | null;
}
