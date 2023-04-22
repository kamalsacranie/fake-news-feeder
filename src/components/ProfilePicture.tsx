import { useQuery } from "@tanstack/react-query";
import { Avatar, Hourglass } from "react95";
import { getUser, User } from "../api";

export const ProfilePictureSkeleton = () => {
  return (
    <Avatar className="mt-2" size={100}>
      <Hourglass />
    </Avatar>
  );
};

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
  if (error) return <div>error.message</div>;
  return isLoading ? (
    <ProfilePictureSkeleton />
  ) : (
    <Avatar
      className="mt-2"
      alt={user?.name}
      src={user?.avatar_url}
      size={100}
    />
  );
};
