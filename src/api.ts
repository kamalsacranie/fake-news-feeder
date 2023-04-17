import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-news-plu0.onrender.com/api",
});

export type Article = {
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: number;
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
