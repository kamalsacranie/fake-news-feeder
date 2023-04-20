import {
  MutationFunction,
  QueryClient,
  useMutation,
} from "@tanstack/react-query";

export const useBaseMutate = function <TMutFuncRet, TMutFuncArgs, TPrevData>(
  queryClient: QueryClient,
  queryFn: MutationFunction<TMutFuncRet, TMutFuncArgs>,
  queryKey: any[],
  updater: (newData: TMutFuncArgs, prevData: TPrevData) => TPrevData
) {
  return useMutation({
    mutationFn: queryFn,
    // might have to setCommentList=[] not sure
    onMutate: async (newData) => {
      await queryClient.cancelQueries(queryKey); // this forces react-query to only send one

      // Snapshot the previous value
      const prevData = queryClient.getQueryData<any>(queryKey);

      // Optimistically update to the new value
      if (prevData) {
        queryClient.setQueryData(queryKey, updater(newData, prevData));
      }

      return { prevData };
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export const bm2 = function <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TPrevData = TData
>(
  queryClient: QueryClient,
  mutationFn: any,
  queryKey: any[],
  updater: (newData: TVariables, prevData: TPrevData) => TPrevData
) {
  return useMutation<TData, TError, TVariables>({
    mutationFn: mutationFn,
    onMutate: async (newData) => {
      await queryClient.cancelQueries(queryKey);
      const prevData = queryClient.getQueryData<TPrevData>(queryKey);
      if (prevData) {
        queryClient.setQueryData(queryKey, updater(newData, prevData));
      }

      return { prevData };
    },
    onError: () => {
      alert("there was an error");
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
