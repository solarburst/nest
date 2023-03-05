import { News } from '../news/news.interface';
import { Comments } from '../news/comments/comments.interface';

export const detailTemplate = (news: News, comments: Comments[]) => {
  if (!news) {
    return emptyNews();
  }

  let html = `<div class="container">
      <img src=http://localhost:3000/${news?.cover} alt="">
      <h1>${news.title}</h1>
      <div>${news.description}</div>
      <div class="text-muted">Автор: ${news.author}</div>`;

  if (comments) {
    for (const commentItem of comments) {
      html += `
        <div class="row">
          <div class="col-lg-1">
            <div style="background: #ccc; width: 75px; height: 75px;" class="rounded-lg"></div>
          </div>
          <div class="col-lg-8">
            <div>${commentItem.author}</div>
            <div>${commentItem.message}</div>
          </div>
        </div>
        `;
    }
  }

  html += '</div>';

  return html;
};

const emptyNews = () => {
  return `<h1>Новости не существует</h1>`;
};
