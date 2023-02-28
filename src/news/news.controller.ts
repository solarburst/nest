import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { News } from './news.interface';
import { NewsService } from './news.service';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';
import { CommentsService } from './comments/comments.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('/all')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('/:id')
  async getNewsById(@Param('id') id: number): Promise<News | undefined> {
    const news = this.newsService.findByIndex(id);
    const comments = this.commentService.findAll(id);
    return {
      ...news,
      comments,
    };
  }

  @Post('/update')
  async updateNew(@Body() news: News): Promise<News> {
    return this.newsService.update(news);
  }

  @Post()
  async create(@Body() news: News): Promise<News> {
    return this.newsService.create(news);
  }

  @Delete(':id')
  async remove(@Param('id') idNews): Promise<boolean> {
    return (
      this.newsService.remove(idNews) && this.commentService.removeAll(idNews)
    );
  }

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }
}
