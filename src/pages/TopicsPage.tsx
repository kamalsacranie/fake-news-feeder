import { useQuery } from "@tanstack/react-query";
import { Hourglass } from "react95";
import { getTopics, Topic } from "../api";
import TopicListItem from "../components/TopicListItem";

const TopicsPage = () => {
  const {
    isLoading,
    error,
    data: topics,
  } = useQuery<Topic[], Error>({
    queryKey: ["topics"],
    queryFn: getTopics,
  });
  if (isLoading) return <Hourglass />;
  if (error) return <div>{error.message}</div>;
  if (!topics) return <></>;
  return (
    <>
      {topics.map((topic) => (
        <TopicListItem key={topic.slug} topic={topic} />
      ))}
    </>
  );
};

export default TopicsPage;
