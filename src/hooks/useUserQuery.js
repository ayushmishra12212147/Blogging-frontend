import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const getCurrentUser = async () => {
  const {data} = await axios.get(`https://blogging-backend-s94y.onrender.com/api/user`);

  console.log("getCurrentUser", { data });

  return data;
};

function useUserQuery() {
  const {
    isLoading: isCurrentUserLoading,
    data: currentUser,
    error: currentUserError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    refetchOnWindowFocus: true,
    staleTime: 0,
    cacheTime: 0
  })
  return {
    isCurrentUserLoading,
    currentUser,
    currentUserError,
  };
}

export default useUserQuery;