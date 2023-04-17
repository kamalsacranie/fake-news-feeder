import { useQuery } from "@tanstack/react-query";
import { Hourglass, MenuList } from "react95";
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
