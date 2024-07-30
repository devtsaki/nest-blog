import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  async create(@Body() CreatePostDto: CreatePostDto) {
    return new PostEntity(await this.postsService.create(CreatePostDto));
  }

  @Get()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async findAll() {
    const posts = await this.postsService.findAll();
    return posts.map((post) => new PostEntity(post));
  }

  @Get('drafts')
  @ApiOkResponse({ type: PostEntity, isArray: true })
  async findDrafts() {
    const drafts = await this.postsService.findDrafts();
    return drafts.map((draft) => new PostEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new PostEntity(await this.postsService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: PostEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdatePostDto: UpdatePostDto,
  ) {
    return new PostEntity(await this.postsService.update(id, UpdatePostDto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new PostEntity(await this.postsService.remove(id));
  }
}
