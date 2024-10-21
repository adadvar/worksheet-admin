import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const isAuthenticated = !!user;
  const isAdmin =
    user?.roles?.some((role: any) => role.name === "admin") || false;
  const isTeacher =
    user?.roles?.some((role: any) => role.name === "teacher") || false;
  const isStudent =
    user?.roles?.some((role: any) => role.name === "student") || false;
  const isParent =
    user?.roles?.some((role: any) => role.name === "parent") || false;

  return {
    isLoading,
    user,
    isAuthenticated,
    isAdmin,
    isTeacher,
    isStudent,
    isParent,
  };
}
