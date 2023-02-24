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
    },
    {
      id: 2,
      title: 'title2',
      description: 'description2',
      author: 'qwerty2',
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
  findAll(): News[] {
    return this.news;
  }
  findByIndex(index: number): News | null {
    console.assert(
      typeof this.news[index] !== 'undefined',
      '[findByIndex] Invalid',
    );
    if (typeof this.news[index] !== 'undefined') {
      return this.news[index - 1];
    }
    return null;
  }
}
