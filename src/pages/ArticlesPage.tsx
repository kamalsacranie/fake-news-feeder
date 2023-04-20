import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Hourglass, MenuList } from "react95";
import { Article, getArticles } from "../api";
import ArticleListItem from "../components/ArticleListItem";

export default function ArticlesPage() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery<Article[], Error>({
    queryKey: [`articlesData${topic ? topic : ""}`],
    queryFn: () => {
      return getArticles(topic);
    },
  });

  useEffect(() => {
    const scrollPos = sessionStorage.getItem("scrollPosition");
    window.scrollTo(0, parseInt(scrollPos || "0"));
  }, []);

  if (isLoading) return <Hourglass />;
  if (error) return <div>{error.message}</div>;
  return (
    <MenuList className="w-screen">
      {articles!.map((article) => {
        return <ArticleListItem key={article.article_id} article={article} />;
      })}
    </MenuList>
  );
}
