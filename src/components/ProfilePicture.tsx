import { useQuery } from "@tanstack/react-query";
import { Avatar, Hourglass } from "react95";
import { getUser, User } from "../api";

export default ({ username }: { username: string }) => {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery<User, Error>({
    queryKey: [username], // the query key must be unique otherwise it gets cached
    queryFn: async () => {
      return await getUser(username);
    },
  });
  if (isLoading) return <Hourglass />;
  if (error) return <div>error.message</div>;
  return (
    <Avatar
      className="mt-2"
      alt={user?.name}
      src={user?.avatar_url}
      size={100}
    />
  );
};
