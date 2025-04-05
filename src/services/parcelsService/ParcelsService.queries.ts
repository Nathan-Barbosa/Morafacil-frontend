import { useMutation, useQueryClient } from "@tanstack/react-query";

import { APIError } from "../../models";
import { PostParcelRequestDTO } from "./ParcelsService.types";
import { ParcelsService } from "./ParcelsService";

const parcelsKeys = {
  all: ["parcels"] as const,
  lists: () => [...parcelsKeys.all, "list"] as const,
  postParcel: () => [...parcelsKeys.all, "postParcel"] as const,
};

const usePostParcelMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, APIError, PostParcelRequestDTO>({
    mutationKey: parcelsKeys.postParcel(),
    mutationFn: (data: PostParcelRequestDTO) => ParcelsService.postParcel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: parcelsKeys.lists(),
      });
    },
  });
};

export { usePostParcelMutation };
