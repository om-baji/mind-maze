import { axiosInstance } from "@/utils/axiosInstance";
import { useMutation } from "@tanstack/react-query";

const registerFn = async (name: string, email: string, password: string) => {
  const response = await axiosInstance.post("/register", {
    name,
    email,
    password,
  });

  return response.data;
};

export function useRegister() {
  const {
    mutate: register,
    data,
    error,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      registerFn(name, email, password),
  });

  return {
    register,
    data, 
    error,
    isSigning : isPending,
    isSuccess
  };
}
