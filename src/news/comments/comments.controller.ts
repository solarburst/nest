import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
// import { Comments } from './comments.interface';
import { CommentsCreateDto } from '../dtos/comments-create.dto/comments-create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/:idNews')
  async get(@Param('idNews') idNews): Promise<object | string> {
    const idNewsInt = parseInt(idNews);
    if (!this.commentsService.findAll(idNewsInt)) {
      return `Комментариев к новости с id:${idNewsInt} нет`;
    }
    return this.commentsService.findAll(idNewsInt);
  }

  @Post('/:idNews')
  async create(
    @Param('idNews') idNews,
    @Body() comment,
  ): Promise<CommentsCreateDto> {
    return this.commentsService.create(idNews, comment);
  }

  @Post('/:idNews/:idComment')
  async update(
    @Param('idNews') idNews,
    @Param('idComment') idComment,
    @Body() comment,
  ): Promise<CommentsCreateDto | boolean> {
    const idNewsInt = parseInt(idNews);
    return this.commentsService.update(idNewsInt, idComment, comment);
  }

  @Delete('/:idNews/:idComment')
  async remove(
    @Param('idNews') idNews,
    @Param('idComment') idComment,
  ): Promise<boolean> {
    return this.commentsService.remove(idNews, idComment);
  }

  @Delete('all')
  async removeAll(@Query('idNews') idNews): Promise<boolean> {
    return this.commentsService.removeAll(idNews);
  }
}
