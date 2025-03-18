"use client"

import { useQueryPagination } from "@/hooks/use-query-pagination";
import { useQuerySort } from "@/hooks/use-query-sort";
import { api } from "@/lib/api";
import { VOTERS } from "@/lib/api-path";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";


export const useGetVoters = () => {
  const { page, perPage } =useQueryPagination()
  const {sortBy, sortDirection} = useQuerySort()
  const params = useSearchParams()
  const search = params.get("search")
  
  const queryParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    ...(sortBy && sortDirection ? { sortBy, sortDirection } : {}),
    ...(search ? { search } : {}),
  });

  const url = `${VOTERS}?${queryParams.toString()}`;

  return useQuery({
    queryKey: [VOTERS, page, perPage, sortBy, sortDirection, search],
    queryFn: async () => {
      return await api.get(url).then(({ data }) => data);
    },
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
