import { Injectable } from '@nestjs/common';
import { News } from './news.interface';

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'title1',
      description: 'description1',
      author: 'qwerty1',
      createdAt: new Date(),
      cover: 'news-static/4af33534-f267-461f-bfbe-7cd07f96c4cd.jpg',
    },
    {
      id: 2,
      title: 'title2',
      description: 'description2',
      author: 'qwerty2',
      createdAt: new Date(),
    },
  ];

  create(news: News): News {
    this.news.push(news);
    return news;
  }
  update(news: News): News {
    let existingNew = news[news.id];
    existingNew = {
      ...existingNew,
      ...news,
    };
    news[news.id] = existingNew;
    console.log(existingNew);
    return news[news.id];
  }
  remove(id: News['id']): boolean {
    const indexRemoveNews = this.news.findIndex((news: News) => news.id === id);
    if (indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true;
    }
    return false;
  }
  findAll(): News[] {
    return this.news;
  }
  findByIndex(index: number): News | null {
    console.assert(
      typeof this.news[index - 1] !== 'undefined',
      '[findByIndex] Invalid',
    );
    if (typeof this.news[index - 1] !== 'undefined') {
      return this.news[index - 1];
    }
    return null;
  }
}
