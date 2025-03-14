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

export const useGetVoter = (id?: string) => {
  return useQuery({
    queryKey: [VOTERS, id],
    queryFn: async () => await api.get(`${VOTERS}/${id}`).then(({ data }) => data),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!id,
  })
}
