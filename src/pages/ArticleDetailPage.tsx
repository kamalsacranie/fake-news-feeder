import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { WindowHeader, Window, ScrollView, Frame, Hourglass } from "react95";
import { Article, getArticle } from "../api";
import {
  CloseButton,
  CommentButton,
  InformationButton,
  MaximiseButton,
} from "../components/Buttons";
import dateformat from "dateformat";

const ArticleInfoItem = ({
  label,
  info,
}: Record<string, string | number | boolean>) => {
  return (
    <div>
      <span className="font-bold italic">{label}</span> {info}
    </div>
  );
};

const ArticleInfo = ({ article }: { article: Article }) => {
  return (
    <>
      <ArticleInfoItem label="Topic:" info={article.topic} />
      <ArticleInfoItem
        label="Published:"
        info={dateformat(article.created_at, "longDate")}
      />
      <ArticleInfoItem label="Comments" info={article.comment_count} />
      <ArticleInfoItem label="Votes" info={article.votes} />
    </>
  );
};

export default () => {
  const { articleId } = useParams();
  const [readerMode, setReaderMode] = useState(false);
  const [articleInfo, setArticleInfo] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Component using clojure?? blaaaeeeaeah maybe classes was the way...
  // needs to be heavily refactored, late though
  const StatusBar = () => {
    return (
      <WindowHeader className="flex justify-between items-center h-12">
        <div className="font-bold">Reading time... 🤓</div>
        <div className="flex items-center">
          <CommentButton
            size={20}
            onClick={() => setShowComments(!showComments)}
          />
          <InformationButton
            size={20}
            onClick={() => setArticleInfo(!articleInfo)}
          />
          <MaximiseButton
            size={20}
            onClick={() => setReaderMode(!readerMode)}
          />
          <Link to={"/articles"} className="flex items-center">
            <CloseButton size={90} />
          </Link>
        </div>
      </WindowHeader>
    );
  };

  const { state }: { state: { article: Article } | null } = useLocation();
  let article = state?.article;

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
  if (!article) return <div>{error}</div>;
  return (
    <Window className="w-full h-screen flex flex-col">
      <StatusBar />
      <div className={`${readerMode ? "hidden" : "flex"} justify-center`}>
        <Window className="border-8">
          {articleInfo ? (
            <ArticleInfo article={article} />
          ) : (
            <img
              src={article?.article_img_url}
              alt=""
              className="p-2 object-contain max-h-60"
            />
          )}
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
