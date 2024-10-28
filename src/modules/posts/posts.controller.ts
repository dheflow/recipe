import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll(): Promise<{ data: PostEntity[]; error: string }> {
    try {
      const posts = await this.postService.findAll();
      return { data: posts, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    // find the post with this id
    const post = await this.postService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    // create a new post and return the newly created post
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<{ data: PostEntity; message: string; statusCode: number }> {
    const { updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    if (!updatedPost || updatedPost.length === 0) {
      throw new BadRequestException('Post with ID ' + id + ' does not exist');
    }

    return {
      data: updatedPost[0],
      message: 'Post updated successfully',
      statusCode: 200,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);
    return {
      message: deleted ? 'Post deleted successfully' : 'Post not found',
    };
  }
}
