import { CartComputerCounter } from "@features/computers/components/CartComputerCounter";
import { Computer } from "@features/computers/types";
import { Link } from "react-router-dom";

type CartItemProps = {
  computer: Computer;
};

export function CartItem({ computer }: CartItemProps) {
  return (
    <li className="flex">
      <div className="px-6 flex flex-1 flex-col border-l border-primary py-6">
        <div className="flex justify-between text-base font-medium ">
          <h3 className="text-gray-400">
            <Link to={`/app/computers/factory/${computer.computer_id}`}>
              {computer.brand} {computer.name}
            </Link>
          </h3>
          <p className="text-accent">{computer.price} грн.</p>
        </div>
        <div className="flex items-center justify-between text-sm py-4">
          <p className="text-gray-600">
            {computer.is_custom ? "Заводська модель" : "Кастомний"}
          </p>
          <div className="flex">
            <CartComputerCounter computer={computer} />
          </div>
        </div>
      </div>
    </li>
  );
}
