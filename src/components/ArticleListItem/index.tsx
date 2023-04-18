import { Article } from "../../api";
import { Button, Separator, Window, WindowHeader } from "react95";
import { capitalCase } from "../../utils/stringManipulation";
import ProfilePicture from "../ProfilePicture";
import ArticleListItemDetails from "./ArticleListItemDetails";
import { useState } from "react";

export default ({ article }: { article: Article }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Window
        className="block justify-start"
        onMouseOver={() => setActive(true)}
        onMouseOut={() => setActive(false)}
      >
        <WindowHeader active={active} className="h-16 overflow-hidden text-xl">
          {article.title}
        </WindowHeader>
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
