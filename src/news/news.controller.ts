import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from '../utils/helper-file-loader/helper-file-loader';
import { News } from './news.interface';
import { NewsService } from './news.service';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';
import { detailTemplate } from '../views/detail';
import { CommentsService } from './comments/comments.service';
import { NewsIdDto } from './dtos/news-id.dto/news-id.dto';
import { NewsCreateDto } from './dtos/news-create.dto/news-create.dto';

const PATH_NEWS = '/news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

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

  @Get(':id')
  async getNewsById(@Param() params: NewsIdDto): Promise<string> {
    const news = this.newsService.findByIndex(params.id);
    const comments = this.commentService.findAll(params.id);
    // const detail = {
    //   ...news,
    //   comments,
    // };
    return detailTemplate(news, comments);
  }

  @Post('/update')
  async updateNew(@Body() news: News): Promise<News> {
    return this.newsService.update(news);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  async create(
    @Body() news: NewsCreateDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<News> {
    if (cover?.filename) {
      console.log('PATH_NEWS', PATH_NEWS);
      console.log(cover?.filename, 'cover.filename');
      news.cover = PATH_NEWS + cover.filename;
    }
    return this.newsService.create(news);
  }

  @Delete(':id')
  async remove(@Param('id') params: NewsIdDto): Promise<boolean> {
    return (
      this.newsService.remove(params.id) &&
      this.commentService.removeAll(params.id)
    );
  }

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
