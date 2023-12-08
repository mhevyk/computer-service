import { QUERY_KEY } from "@constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { OrderService } from "../services/OrderService";

export function useOrders() {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.orders],
    queryFn: async () => {
      return OrderService.getOrders().then(response => response.data);
    },
  });

  return [data] as const;
}
