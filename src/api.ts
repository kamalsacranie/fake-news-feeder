import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-news-plu0.onrender.com/api",
});

export type Article = {
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: string;
  votes: number;
  article_img_url: string;
  article_id: number;
  comment_count: string;
};
export async function getArticles() {
  const {
    data: { articles },
  } = await api.get<{ articles: Article[] }>("/articles");
  return articles;
}
export async function getArticle(articleId: string) {
  const {
    data: { article },
  } = await api.get<{ article: Article }>(`/articles/${articleId}`);
  return article;
}

export type User = {
  username: string;
  name: string;
  avatar_url?: string;
};
export async function getUser(username: string) {
  const {
    data: { user },
  } = await api.get<{ user: User }>(`/users/${username}`);
  return user;
}

export type RequestComment = {
  article_id: number;
  username: User["name"];
  body: string;
};

type CommentUser = { author: string } | { username: string };
export type Comment = {
  comment_id: number;
  created_at: string;
  votes: number;
  article_id: number;
  author?: User["name"];
  username?: User["name"];
  body: string;
} & CommentUser;
export async function postComment(requestComment: RequestComment) {
  const {
    data: { comment },
  } = await api.post<{ comment: Comment }>(
    `/articles/${requestComment.article_id}/comments`,
    requestComment
  );
  return comment;
}

export async function getArticleComments(articleId: number) {
  const {
    data: { comments },
  } = await api.get<{ comments: Comment[] }>(`/articles/${articleId}/comments`);
  return comments;
}

export async function patchCommentVotes(comment_id: number, inc_votes: number) {
  const {
    data: { comment },
  } = await api.patch<{ comment: Comment }>(`/comments/${comment_id}`, {
    inc_votes,
  });
  return comment;
}
