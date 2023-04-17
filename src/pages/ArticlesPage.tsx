import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Hourglass, MenuList, ScrollView } from "react95";
import { Article, getArticles } from "../api";
import ArticleListItem from "../components/ArticleListItem";

export default function ArticlesPage() {
  const {
    isLoading,
    error,
    data: articles,
  } = useQuery<Article[], Error>({
    queryKey: ["articlesData"],
    queryFn: getArticles,
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
