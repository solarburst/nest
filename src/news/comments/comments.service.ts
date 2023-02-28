import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comments } from './comments.interface';

@Injectable()
export class CommentsService {
  private readonly comments = [];

  create(idNews: number, comment: Comments): Comments {
    if (!this.comments?.[idNews]) {
      this.comments[idNews] = [];
    }

    return this.comments[idNews].push({
      ...comment,
      id: uuidv4(),
    });

    return comment;
  }

  findAll(idNews: number): Comments[] | undefined {
    return this.comments?.[idNews];
  }

  remove(idNews: number, idComment: string): Promise<boolean> {
    if (!this.comments[idNews]) {
      return null;
    }

    const indexComment = this.comments[idNews].findIndex(
      (c) => c.id === idComment,
    );
    if (indexComment === -1) {
      return null;
    }
    return this.comments[idNews].splice(indexComment, 1);
  }

  removeAll(idNews: number): boolean {
    return delete this.comments?.[idNews];
  }

  update(
    idNews: number,
    idComment: string,
    comment: Comment,
  ): Comment | boolean {
    const indexComment = this.comments[idNews]?.findIndex(
      (c) => c.id === idComment,
    );

    if (!this.comments?.[idNews] || indexComment) {
      return false;
    }

    this.comments[idNews][indexComment] = {
      ...this.comments[idNews][indexComment],
      ...comment,
    };
    return this.comments[idNews][indexComment];
  }
}
