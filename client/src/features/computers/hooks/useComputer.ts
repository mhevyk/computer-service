import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@constants/queryKeys";
import ComputerService from "../services/ComputerService";
import { AxiosError } from "axios";
import { Computer } from "../types";

export function useComputer(computerId: number) {
  const { data } = useQuery<Computer, AxiosError>({
    queryKey: [QUERY_KEY.computers, computerId],
    queryFn: async () => {
      return ComputerService.getComputer(computerId).then(
        response => response.data
      );
    },
  });

  return data;
}
