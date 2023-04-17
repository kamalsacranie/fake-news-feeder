import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { WindowHeader, Window, ScrollView, Frame, Hourglass } from "react95";
import { Article, getArticle } from "../api";
import { CloseButton, MaximiseButton } from "../components/Buttons";

export default () => {
  const { articleId } = useParams();
  const [readerMode, setReaderMode] = useState(false);

  let {
    state: { article },
  }: { state: { article: Article | undefined } } = useLocation();

  let isLoading: boolean = false;
  let error: Error | null = null;
  if (!article) {
    const query = useQuery<Article, Error>({
      queryKey: [articleId],
      queryFn: () => getArticle(articleId!),
    });
    isLoading = query.isLoading;
    error = query.error;
    article = query.data;
  }

  if (isLoading) return <Hourglass />;
  if (error) return <div>{error.message}</div>;
  return (
    <Window className="w-full h-screen flex flex-col">
      <WindowHeader className="flex justify-between items-center h-12">
        <div className="font-bold">Reading time... 🤓</div>
        <div className="flex items-center">
          <MaximiseButton
            size={20}
            onClick={() => setReaderMode(!readerMode)}
          />
          <Link to={"/articles"} className="flex items-center">
            <CloseButton size={90} />
          </Link>
        </div>
      </WindowHeader>
      <div className={`${readerMode ? "hidden" : "flex"} justify-center`}>
        <Window className="border-8">
          <img
            src={article?.article_img_url}
            alt=""
            className="p-2 object-contain max-h-60"
          />
        </Window>
      </div>
      <div className="text-lg p-2 font-bold">{article?.title}</div>
      <ScrollView className="overflow-scroll flex-grow flex">
        <Frame
          variant="field"
          className="p-3 min-h-full min-w-full flex-grow"
          shadow={false}
        >
          {article?.body}
        </Frame>
      </ScrollView>
    </Window>
  );
};
