import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginApi({ username, password }),
    onSuccess: (user) => {
      const { token, user: userData } = user;
      localStorage.setItem(
        "user_admin",
        JSON.stringify({ token, user: userData })
      );
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR:", err);
      // toast.error("Provide username and password are incorrect");
      //@ts-ignore
      toast.error(err.message || "خطایی رخ داده است");
    },
  });

  return { login, isLoading };
}
