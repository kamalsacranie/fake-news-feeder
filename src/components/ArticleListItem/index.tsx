import { Article } from "../../api";
import { Button, Separator, Window, WindowHeader } from "react95";
import { capitalCase } from "../../utils/stringManipulation";
import ProfilePicture from "../ProfilePicture";
import ArticleListItemDetails from "./ArticleListItemDetails";
import { useState } from "react";
import { Link } from "react-router-dom";

export default ({ article }: { article: Article }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Window
        onClick={() =>
          sessionStorage.setItem("scrollPosition", `${window.scrollY}`)
        }
        className="block justify-start"
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
      >
        <Link to={`/articles/${article.article_id}`} state={article}>
          <WindowHeader
            active={active}
            className="h-16 overflow-hidden text-xl"
          >
            {article.title}
          </WindowHeader>
        </Link>
        <div className="flex my-4">
          <div className="w-fit ml-4">
            <ProfilePicture username={article.author} />
          </div>
          <ArticleListItemDetails {...article} />
        </div>
        <div className="flex justify-end">
          <Button>{capitalCase(article.topic)}</Button>
        </div>
      </Window>
      <Separator />
    </>
  );
};
