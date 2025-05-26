import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  APIError,
  GetVotingByIdResponseDTO,
  GetVotingResponseDTO,
  PaginatedResponse,
  ResponseDTO,
  VotingResponseDTO,
} from "../../models";
import { VotingBoardService } from "./votingBoard";
import { GetVotingsRequestDTO, PostVoteRequestDTO, VotingRequestDTO } from "./votingBoard.types";

const votingBoardsKeys = {
  all: ["votings"] as const,
  lists: () => [...votingBoardsKeys.all, "list"] as const,
  list: (role: string) => [...votingBoardsKeys.lists(), role] as const,
  voting: () => [...votingBoardsKeys.all, "voting"] as const,
  createVoting: () => [...votingBoardsKeys.all, "createVoting"] as const,
  toVote: () => [...votingBoardsKeys.all, "toVote"] as const,
  updateVoting: () => [...votingBoardsKeys.all, "updateVoting"] as const,
  closeVoting: () => [...votingBoardsKeys.all, "closeVoting"] as const,
};

const useGetVotingsQuery = (params: GetVotingsRequestDTO) => {
  return useQuery<PaginatedResponse<GetVotingResponseDTO[]>, APIError>({
    queryKey: votingBoardsKeys.lists(),
    queryFn: () => VotingBoardService.getVotings(params),
  });
};

const useGetVotingByIDQuery = (id: string, enabled: boolean) => {
  return useQuery<ResponseDTO<GetVotingByIdResponseDTO>, APIError>({
    queryKey: votingBoardsKeys.voting(),
    queryFn: () => VotingBoardService.getVoting(id),
    enabled: enabled,
  });
};

const usePostCreateVotingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<VotingResponseDTO>, APIError, VotingRequestDTO>({
    mutationKey: votingBoardsKeys.createVoting(),
    mutationFn: (data: VotingRequestDTO) => VotingBoardService.createVoting(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: votingBoardsKeys.lists(),
      }),
  });
};

const usePostVoteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<string>, APIError, PostVoteRequestDTO>({
    mutationKey: votingBoardsKeys.toVote(),
    mutationFn: (data: PostVoteRequestDTO) => VotingBoardService.toVote(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: votingBoardsKeys.lists(),
      }),
  });
};

const useCloseVotingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDTO<boolean>, APIError, number>({
    mutationKey: votingBoardsKeys.closeVoting(),
    mutationFn: (id: number) => VotingBoardService.closeVoting(id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: votingBoardsKeys.lists(),
      }),
  });
};

export {
  useGetVotingsQuery,
  usePostCreateVotingMutation,
  useCloseVotingMutation,
  useGetVotingByIDQuery,
  usePostVoteMutation,
};
