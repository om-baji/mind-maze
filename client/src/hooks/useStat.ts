import { axiosInstance } from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getStats = async () => {
  const res = await axiosInstance.get("/stats");
  return res.data;
};

export default function useStat() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    retry: 1,
  });
}
