import { useEffect, useState } from "react";
import { Article, getArticles } from "../api";

export default function ArticlesPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [articles, setArticles] = useState<Article[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    getArticles()
      .then((articles) => {
        console.log(articles);
        setArticles(articles);
        setLoading(false);
      })
      .catch((error: Error) => setError(error));
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      {articles.map((article) => {
        return <div>{article.title}</div>;
      })}
    </div>
  );
}
