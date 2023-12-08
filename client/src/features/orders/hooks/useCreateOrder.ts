import { useMutation } from "@tanstack/react-query";
import { OrderRecord, OrderService } from "../services/OrderService";
import { enqueueSnackbar } from "notistack";
import { useCart } from "@context/CartContext/useCart";

export function useCreateOrder() {
  const { cart, clearCart } = useCart();
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (orderRecords: OrderRecord[]) => {
      return OrderService.createOrder(orderRecords);
    },
  });

  async function order() {
    const orderRecords = cart.map(({ computer, count }) => {
      return {
        computer_id: computer.computer_id,
        quantity: count,
        price: computer.price,
      };
    });

    await mutateAsync(orderRecords);

    enqueueSnackbar({
      message: "Операція пройшла успішно",
      variant: "success",
    });

    clearCart();
  }

  return [order, rest] as const;
}
