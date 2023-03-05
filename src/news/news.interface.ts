import { Comments } from './comments/comments.interface';

export interface News {
  id?: number;
  title: string;
  description: string;
  author?: string;
  createdAt: Date | string;
  comments?: Comments[];
  cover?: string;
}
