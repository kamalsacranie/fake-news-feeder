import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MenuList } from "react95";
import { Article, getArticles } from "../api";
import ArticleListItem, {
  ArticleListItemSkeleton,
} from "../components/ArticleListItem";
import RefinementMenu from "../components/RefinementMenu";

export default function ArticlesPage() {
  const [searchParams] = useSearchParams();
  const topic = searchParams.get("topic");
  const sort_by = searchParams.get("sort_by");
  const order = searchParams.get("order");

  const {
    isLoading,
    error,
    data: articles,
  } = useQuery<Article[], Error>({
    queryKey: ["articlesData", topic, sort_by, order],
    queryFn: () => {
      return getArticles(topic, sort_by, order);
    },
  });

  useEffect(() => {
    const scrollPos = sessionStorage.getItem("scrollPosition");
    window.scrollTo(0, parseInt(scrollPos || "0"));
  }, []);

  if (error) return <div>{error.message}</div>;
  return (
    <>
      <MenuList className="flex-grow">
        <RefinementMenu />
        {isLoading ? (
          <ArticleListItemSkeleton />
        ) : (
          articles!.map((article) => {
            return (
              <ArticleListItem key={article.article_id} article={article} />
            );
          })
        )}
      </MenuList>
    </>
  );
}
