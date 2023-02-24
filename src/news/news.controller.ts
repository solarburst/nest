import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { News } from './news.interface';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/all')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('/:id')
  async getNewsById(@Param('id') id: number): Promise<News> {
    return this.newsService.findByIndex(id);
  }

  @Post()
  async updateNew(@Body() news: News): Promise<News> {
    return this.newsService.update(news);
  }
}
