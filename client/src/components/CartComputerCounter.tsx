import { useCart } from "../context/CartContext/useCart";
import { Computer } from "../types/common";
import { Button } from "./ui/Button";

type CounterProps = {
  computer: Computer;
};

export function CartComputerCounter({ computer }: CounterProps) {
  const { addToCart, removeFromCartById, getCount } = useCart();

  const count = getCount(computer.computer_id);

  return (
    <div>
      <Button
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
