import { Article } from "../../api";
import { Button } from "react95";
import { capitalCase } from "../../utils/stringManipulation";
import ProfilePicture from "../ProfilePicture";
import ArticleListItemDetails from "./ArticleListItemDetails";
import { DivProps } from "../../types";
import ListItemRedirect from "../General/ListItems/ListItemRedirect";

const ArticleListItem = ({ article }: DivProps & { article: Article }) => {
  const storePagePosition = () =>
    sessionStorage.setItem("scrollPosition", `${window.scrollY}`);

  return (
    <ListItemRedirect
      to={`/articles/${article.article_id}`}
      windowTitle={article.title}
      onClick={storePagePosition}
    >
      <div className="flex my-4">
        <div className="w-fit ml-4">
          <ProfilePicture username={article.author} />
        </div>
        <ArticleListItemDetails {...article} />
      </div>
      <div className="flex justify-end">
        <Button>{capitalCase(article.topic)}</Button>
      </div>
    </ListItemRedirect>
  );
};

export default ArticleListItem;
