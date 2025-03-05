"use client"

import { api } from "@/lib/api";
import { VOTERS } from "@/lib/api-path";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateVoterDto } from "@voting-app/schemas";
import { toast } from 'sonner'

export const useCreateVoter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [VOTERS],
    mutationFn: async (voter: CreateVoterDto) => {
      return await api.post(VOTERS, voter).then(({ data }) => data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [VOTERS] });
      toast.success(`${data.voter.firstName} ${data.voter.lastName} has been created`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
