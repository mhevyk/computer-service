import { ComponentProps } from "react";
import { useCart } from "@context/CartContext/useCart";
import { Button } from "@components/ui/Button";
import { Computer } from "../types";

type CounterProps = {
  computer: Computer;
} & ComponentProps<"div">;

export function CartComputerCounter({ computer, ...props }: CounterProps) {
  const { addToCart, removeFromCartById, getCount } = useCart();

  const count = getCount(computer.computer_id);

  return (
    <div {...props}>
      <Button
        className="btn-outline"
        variant="ghost"
        size="sm"
        disabled={count === 0}
        onClick={() => {
          removeFromCartById(computer.computer_id);
        }}
      >
        -
      </Button>
      <span className="px-4">{count}</span>
      <Button
        className="btn-outline"
        variant="ghost"
        size="sm"
        onClick={() => {
          addToCart(computer);
        }}
      >
        +
      </Button>
    </div>
  );
}
