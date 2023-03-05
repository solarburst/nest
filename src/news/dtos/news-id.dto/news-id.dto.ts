import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewsIdDto {
  @IsNotEmpty()
  id: number;
}
