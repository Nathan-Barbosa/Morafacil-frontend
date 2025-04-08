import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  APIError,
  GetVotingResponseDTO,
  PaginatedResponse,
  ResponseDTO,
  VotingResponseDTO,
} from "../../models";
import { VotingBoardService } from "./votingBoard";
import { GetVotingsRequestDTO, VotingRequestDTO } from "./votingBoard.types";

const votingBoardsKeys = {
  all: ["votings"] as const,
  lists: () => [...votingBoardsKeys.all, "list"] as const,
  list: (role: string) => [...votingBoardsKeys.lists(), role] as const,
  createVoting: () => [...votingBoardsKeys.all, "createVoting"] as const,
  updateVoting: () => [...votingBoardsKeys.all, "updateVoting"] as const,
  closeVoting: () => [...votingBoardsKeys.all, "closeVoting"] as const,
};

const useGetVotingsQuery = (params: GetVotingsRequestDTO) => {
  return useQuery<PaginatedResponse<GetVotingResponseDTO[]>, APIError>({
    queryKey: votingBoardsKeys.lists(),
    queryFn: () => VotingBoardService.getVotings(params),
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

// const usePutUpdateNoticeMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation<ResponseDTO<VotingRequestDTO>, APIError, UpdateNoticeRequestDTO>({
//     mutationKey: votingBoardsKeys.updateVoting(),
//     mutationFn: (data: UpdateNoticeRequestDTO) => VotingBoardService.updateVoting(data),
//     onSuccess: () =>
//       queryClient.invalidateQueries({
//         queryKey: votingBoardsKeys.lists(),
//       }),
//   });
// };

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
  // usePutUpdateNoticeMutation,
};
