import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";
import { Computer as ComputerType } from "../../../../features/computers/types";
import { CartComputerCounter } from "../../../../features/computers/components/CartComputerCounter";

type ComputerProps = {
  computer: ComputerType;
};

export function Computer({ computer }: ComputerProps) {
  const navigate = useNavigate();

  function handleItemClick() {
    navigate(computer.computer_id.toString());
  }

  return (
    <div
      className="flex items-center justify-between py-4 px-8 hover:bg-base-200 cursor-pointer"
      onClick={handleItemClick}
    >
      <h3>{computer.name}</h3>
      <div className="flex items-center gap-6">
        <CartComputerCounter
          computer={computer}
          onClick={event => event.stopPropagation()}
        />
        <span>{computer.price} грн</span>
        <Icon icon="ph:caret-right-bold" />
      </div>
    </div>
  );
}
