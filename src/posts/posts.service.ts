import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        description: createPostDto.description,
        body: createPostDto.body,
        published: createPostDto.published,
        author: { connect: { id: createPostDto.authorId } },
        tags: { connect: createPostDto.tagIds.map((id) => ({ id })) },
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      where: { published: true },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  findDrafts() {
    return this.prisma.post.findMany({
      where: { published: false },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        description: updatePostDto.description,
        body: updatePostDto.body,
        published: updatePostDto.published,
        author: { connect: { id: updatePostDto.authorId } },
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
