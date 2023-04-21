import { EventHandler, SyntheticEvent, useEffect } from "react";
import { Button, TextInput } from "react95";
import { postComment, RequestComment, Comment } from "../../api";
import FloatingWindow from "../General/FloatingWindow";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { DivProps } from "../../types";
import { useComments } from ".";
import { useBaseMutate } from "../../utils/baseMutationQuery";

const AddCommentWindow = ({
  hideWindowCallback,
  ...props
}: DivProps & {
  article_id: number;
  hideWindowCallback?: Function;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<{ commentBody: string }>();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ commentBody: "" });
    }
  }, [isSubmitSuccessful, reset]);

  const queryClient = useQueryClient();
  const { isFetching, ...queryInfo } = useComments(props.article_id);
  const { mutate } = useBaseMutate<Comment, RequestComment, Comment[]>(
    queryClient,
    postComment,
    ["commentListData"],
    (newData: RequestComment, prevData: Comment[]) => {
      return [
        {
          ...newData,
          author: newData.username,
          comment_id: new Date().getTime(),
          created_at: new Date().toISOString(),
          votes: 0,
        },
        ...prevData,
      ];
    }
  );

  const onSubmit = ({ commentBody }: { commentBody: string }) => {
    hideWindowCallback!();
    const requestComment: RequestComment = {
      body: commentBody,
      username: "jessjelly",
      article_id: props.article_id,
    };
    mutate(requestComment);
  };

  return (
    <FloatingWindow
      hideWindowCallback={hideWindowCallback as EventHandler<SyntheticEvent>}
      {...props}
      windowTitle="Write a comment..."
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-lg font-bold">Comment on the article!</h2>
        <TextInput
          placeholder="Don't be too rude..."
          multiline={true}
          fullWidth={true}
          {...register("commentBody", { required: true })}
        />
        {errors.commentBody && <span>This field is required</span>}
        <Button type="submit">Post comment</Button>
      </form>
    </FloatingWindow>
  );
};

export default AddCommentWindow;
