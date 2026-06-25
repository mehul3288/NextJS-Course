import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api-client";
import { useCallback } from "react";

export function useApiClient() {
  const { data: session } = useSession();
  console.log(session?.token);

  return useCallback(
    async (
      endpoint: string,
      options: RequestInit = {},
      authHeaders: boolean = true
    ) => {
      return apiClient(endpoint, options, authHeaders, session?.token);
    },
    [session?.token]
  );
}
