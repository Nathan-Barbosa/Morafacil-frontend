import { useQuery } from "@tanstack/react-query";

import { APIError, PaginatedResponse, ResidenceResponseDTO } from "../../models";
import { ResidenceService } from "./ResidenceService";
import { GetResidencesRequestDTO } from "./ResidenceService.types";

const residencesKeys = {
  all: ["residences"] as const,
  lists: () => [...residencesKeys.all, "list"] as const,
  list: (params: GetResidencesRequestDTO) => [...residencesKeys.lists(), params] as const,
};

const useGetResidencesListQuery = (params: GetResidencesRequestDTO) => {
  return useQuery<PaginatedResponse<ResidenceResponseDTO[]>, APIError>({
    queryKey: residencesKeys.list(params),
    queryFn: () => ResidenceService.getResidences(params),
  });
};

export { useGetResidencesListQuery };
