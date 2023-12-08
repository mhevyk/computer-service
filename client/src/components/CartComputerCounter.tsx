import { ComponentProps } from "react";
import { useCart } from "../context/CartContext/useCart";
import { Computer } from "../types/common";
import { Button } from "./ui/Button";

type CounterProps = {
  computer: Computer;
} & ComponentProps<"div">;

export function CartComputerCounter({ computer, ...props }: CounterProps) {
  const { addToCart, removeFromCartById, getCount } = useCart();

  const count = getCount(computer.computer_id);

  return (
    <div {...props}>
      <Button
        size="sm"
        variant="secondary"
        disabled={count === 0}
        onClick={() => {
          removeFromCartById(computer.computer_id);
        }}
      >
        -
      </Button>
      <span className="px-4">{count}</span>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          addToCart(computer);
        }}
      >
        +
      </Button>
    </div>
  );
}
