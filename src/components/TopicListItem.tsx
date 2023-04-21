import { Topic } from "../api";
import { capitalCase } from "../utils/stringManipulation";
import ListItemRedirect from "./General/ListItems/ListItemRedirect";

const TopicListItem = ({ topic }: { topic: Topic }) => {
  return (
    <ListItemRedirect
      windowTitle={`Topic: ${capitalCase(topic.slug)}`}
      to={`/articles?topic=${topic.slug}`}
      className="h-32"
    >
      <div>{topic.description}</div>
    </ListItemRedirect>
  );
};

export default TopicListItem;
