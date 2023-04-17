import { Article, getUser } from "../api";
import { Avatar, Hourglass, MenuListItem, Separator } from "react95";
import { useQuery } from "@tanstack/react-query";

export default ({ article }: { article: Article }) => {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: [article.author], // the query key must be unique otherwise it gets cached
    queryFn: async () => {
      return await getUser(article.author);
    },
  });
  if (isLoading) return <Hourglass />;
  return (
    <>
      <MenuListItem>
        <Avatar src={user?.avatar_url} />
        <MenuListItem>{article.title}</MenuListItem>
      </MenuListItem>
      <Separator />
    </>
  );
};
