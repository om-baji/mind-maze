import { axiosInstance } from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const loginFn = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", {
    email,
    password,
  });
  return response.data.user;
};

export function useLogin() {
  const {
    mutate: login,
    data,
    error,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginFn(email, password),
  });

  return {
    login,
    data,
    error,
    isLogging : isPending,
    isSuccess
  };
}
