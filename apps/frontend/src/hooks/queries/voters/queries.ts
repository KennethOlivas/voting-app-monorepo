"use client"

import { api } from "@/lib/api";
import { VOTERS } from "@/lib/api-path";

import { useQuery } from "@tanstack/react-query";


export const useGetVoters = () => {
  return useQuery({
    queryKey: [VOTERS],
    queryFn: async () => {
      return await api.get(VOTERS).then(({ data }) => data);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
