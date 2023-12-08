import { Button } from "@components/ui/Button";
import { useCart } from "@context/CartContext/useCart";
import { CartComputerCounter } from "@features/computers/components/CartComputerCounter";
import { Computer } from "@features/computers/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

function CartItem({ computer }: { computer: Computer }) {
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

export function CartPage() {
  const { cart } = useCart();
  const navigate = useNavigate();

  let totalAmount = 0;

  for (const { computer, count } of cart) {
    totalAmount += computer.price * count;
  }

  return (
    <div className="px-4 py-6 sm:px-6">
      {cart.length === 0 ? (
        "Кошик порожній"
      ) : (
        <ul role="list">
          {cart.map(({ computer }, index) => (
            <Fragment>
              <CartItem key={computer.computer_id} computer={computer} />
              {index !== cart.length - 1 && (
                <div className="divider divide-gray-800" />
              )}
            </Fragment>
          ))}
        </ul>
      )}

      <div className="border-t border-primary px-6 py-4 mt-8 bg-base-200">
        <div className="flex justify-between items-center text-base font-medium text-accent">
          <p>Підсумок</p>
          <p>{totalAmount} грн.</p>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="flex justify-center items-center text-center text-sm text-gray-500">
            <p>
              <Button
                className="btn-outline border-gray-700"
                variant="ghost"
                icon={<Icon icon="basil:caret-right-solid" />}
                onClick={() => navigate("/app/computers/factory")}
              >
                Продовжити покупки
              </Button>
            </p>
          </div>
          <Button>Підтвердити замовлення</Button>
        </div>
      </div>
    </div>
  );
}
