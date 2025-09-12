import { isCheckingToken } from "@/api/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: isCheckingToken,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, isError };
};
