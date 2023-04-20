import { useEffect } from "react";
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
    hideWindowCallback?: Function;
  }
) => {
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
  const { isLoading, mutate } = useMutation(postComment, {
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
              author: newComment.username,
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

  const onSubmit = ({ commentBody }: { commentBody: string }) => {
    props.hideWindowCallback!();
    const requestComment: RequestComment = {
      body: commentBody,
      username: "jessjelly",
      article_id: props.article_id,
    };
    mutate(requestComment);
  };

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
