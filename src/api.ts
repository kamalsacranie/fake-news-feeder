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

export type Comment = {
  comment_id: number;
  created_at: string;
  body: string;
  votes: number;
  author: User["name"];
  article_id: number;
};
export async function getArticleComments(articleId: number) {
  const {
    data: { comments },
  } = await api.get<{ comments: Comment[] }>(`/articles/${articleId}/comments`);
  return comments;
}
