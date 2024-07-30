import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  create(createTagDto: CreateTagDto) {
    return this.prisma.tag.create({
      data: {
        name: createTagDto.name,
        posts: {
          connect: { id: createTagDto.postId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  findOne(id: number) {
    return this.prisma.tag.findUnique({
      where: { id },
      include: {
        posts: true,
      },
    });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({ where: { id }, data: updateTagDto });
  }

  remove(id: number) {
    return this.prisma.tag.delete({ where: { id } });
  }
}
