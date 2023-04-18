import { GroupBox, Separator } from "react95";
import dateformat from "dateformat";
import { Article } from "../../api";

export default ({ author, created_at, votes }: Partial<Article>) => {
  return (
    <GroupBox className="mx-5 w-full">
      <div>
        <span className="italic">User:</span> {author}
      </div>
      <div>
        <span className="italic">Date Posted:</span>{" "}
        {created_at && dateformat(new Date(created_at), "dd-mm-yy, HH:MM")}
      </div>
      <Separator />
      <div>
        <span className="font-bold italic">Votes:</span> {votes}
      </div>
    </GroupBox>
  );
};
