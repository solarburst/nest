import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CommentsCreateDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @ValidateIf((o) => o.author)
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt?: string;

  @IsNotEmpty()
  @IsNumber()
  idNews: number;
}
