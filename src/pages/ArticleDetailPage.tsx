import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RefObject, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Window, ScrollView, Frame, Hourglass } from "react95";
import { Article, getArticle, patchArticleVotes } from "../api";
import {
  CommentButton,
  InformationButton,
  MaximiseButton,
} from "../components/Buttons";
import dateformat from "dateformat";
import CommentOverlay from "../components/CommentOverlay";
import { WindowBar } from "../components/WindowBar";
import ArticleVoteBox from "../components/ArticleDetail/ArticleVoteBox";

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

export default ({ screenRef }: { screenRef: RefObject<HTMLDivElement> }) => {
  if (screenRef.current) screenRef.current.style.maxHeight = "10px";

  useEffect(() => {
    return () => {
      // remove styling on unmount
      if (screenRef.current) screenRef.current.style.maxHeight = "";
    };
  }, []);

  const { articleId } = useParams();
  const [readerMode, setReaderMode] = useState(false);
  const [articleInfo, setArticleInfo] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const { state }: { state: { article: Article } | null } = useLocation();
  let article = state?.article;

  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Article,
    Error,
    { targetId: number; votes: number }
  >({
    mutationFn: ({ targetId: article_id, votes: inc_votes }) =>
      patchArticleVotes(article_id, inc_votes),
    onMutate: async (newData) => {
      await queryClient.cancelQueries([articleId]);
      const prevArticle = queryClient.getQueryData<Article>([articleId]);
      if (prevArticle) {
        prevArticle.votes += newData.votes;
        queryClient.setQueryData([articleId], prevArticle);
      }
      return prevArticle;
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries([articleId]);
    },
  });

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
    <Window className="flex flex-col flex-grow relative overflow-hidden">
      {showComments && (
        <CommentOverlay
          article_id={article.article_id}
          showComments={showComments}
          setShowComments={setShowComments}
        />
      )}
      <WindowBar windowTitle="Reading time... 🤓" link={{ link: "/articles" }}>
        <CommentButton
          size={20}
          onClick={() => setShowComments(!showComments)}
        />
        <InformationButton
          size={20}
          onClick={() => {
            setReaderMode(false);
            setArticleInfo(!articleInfo);
          }}
        />
        <MaximiseButton size={20} onClick={() => setReaderMode(!readerMode)} />
      </WindowBar>
      <div className={`${readerMode ? "hidden" : "flex"} justify-center`}>
        <Window className="border-8">
          {articleInfo ? (
            <ArticleInfo article={article} />
          ) : (
            <div className="relative">
              <img
                src={article?.article_img_url}
                alt=""
                className="p-2 object-contain max-h-60"
              />
              <ArticleVoteBox
                className="flex"
                votes={article.votes}
                mutate={mutate}
                targetId={article.article_id}
                targetSession="articleVotes"
              />
            </div>
          )}
        </Window>
      </div>
      <div className="text-lg p-2 font-bold">{article?.title}</div>
      <ScrollView className="flex-grow flex flex-col relative overflow-scroll">
        <Frame
          variant="field"
          className="p-3 absolute min-h-full min-w-full left-0 top-0"
          shadow={false}
        >
          {article?.body}
        </Frame>
      </ScrollView>
    </Window>
  );
};
