import { EventHandler, SyntheticEvent } from "react";
import { Button, TextInput } from "react95";
import { postComment, RequestComment, Comment } from "../../api";
import FloatingWindow from "../General/FloatingWindow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DivProps } from "../../types";
import { useComments } from ".";

const AddCommentWindow = (
  props: DivProps & {
    article_id: number;
    closeButtonCallback?: EventHandler<SyntheticEvent>;
  }
) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ commentBody: string }>();
  const onSubmit = ({ commentBody }: { commentBody: string }) => {
    const requestComment: RequestComment = {
      body: commentBody,
      username: "jessjelly",
      article_id: props.article_id,
    };
    mutate(requestComment);
  };

  const queryClient = useQueryClient();
  const { isFetching, ...queryInfo } = useComments(props.article_id);
  const { isLoading, mutate } = useMutation(postComment, {
    onSuccess: (data) => {},
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(["commentListData"]); // this forces react-query to only send one

      // Snapshot the previous value
      const previousComments = queryClient.getQueryData<Comment[]>([
        "commentListData",
      ]);

      // Optimistically update to the new value
      if (previousComments) {
        queryClient.setQueryData<Comment[]>(
          ["commentListData"],
          [
            {
              ...newComment,
              comment_id: new Date().getTime(),
              created_at: new Date().toISOString(),
              votes: 0,
            },
            ...previousComments,
          ]
        );
      }

      return { previousComments };
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["commentListData"]);
    },
  });

  return (
    <FloatingWindow {...props} windowTitle="Write a comment...">
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
