import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APIError, PostCondominiumResponseDTO, ResponseDTO } from "../../models";
import { PostCreateCondominiumRequestDTO } from "./CondominiumService.types";
import { CondominiumService } from "./CondominiumService";

const residencesKeys = {
  all: ["residences"] as const,
  lists: () => [...residencesKeys.all, "list"] as const,
  createUser: () => [...residencesKeys.all, "createUser"] as const,
};

const usePostCreateCondominiumMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseDTO<PostCondominiumResponseDTO>,
    APIError,
    PostCreateCondominiumRequestDTO
  >({
    mutationKey: residencesKeys.createUser(),
    mutationFn: (data: PostCreateCondominiumRequestDTO) =>
      CondominiumService.postCreateCondominium(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: residencesKeys.lists(),
      }),
  });
};

export { usePostCreateCondominiumMutation };
