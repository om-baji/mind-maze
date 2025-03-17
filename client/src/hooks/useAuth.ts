import { axiosIntercept } from "@/utils/axios.interceptor";
import { useQuery } from "@tanstack/react-query";

const getAuth = async () => {
  const response = await axiosIntercept.get("/me");
  return response.data.success;
};

export const useAuth = () => {
  const {
    data: status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: getAuth,
    staleTime: 1000 * 60 * 60,
    retry : 1,
  });

  return { status, isLoading, error };
};
