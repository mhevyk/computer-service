import { Button } from "@components/ui/Button";
import { useCart } from "@context/CartContext/useCart";
import { CartComputerCounter } from "@features/computers/components/CartComputerCounter";
import { Computer } from "@features/computers/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function CartItem({ computer }: { computer: Computer }) {
  return (
    <li className="flex">
      <div className="px-6 flex flex-1 flex-col border-l border-primary py-6">
        <div>
          <div className="flex justify-between text-base font-medium ">
            <h3 className="text-gray-400">
              <a href="#">
                {computer.brand} {computer.name}
              </a>
            </h3>
            <p className="text-accent">{computer.price} грн.</p>
          </div>
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
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <h1 className="text-3xl font-medium text-accent uppercase text-center">
          Кошик
        </h1>
        {cart.length === 0 ? (
          <div>Кошик порожній</div>
        ) : (
          <div className="mt-8">
            <ul role="list" className="-my-6">
              {cart.map(({ computer }, index) => (
                <Fragment>
                  <CartItem key={computer.computer_id} computer={computer} />
                  {index !== cart.length - 1 && (
                    <div className="divider divide-gray-800" />
                  )}
                </Fragment>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-primary p-6 mt-8">
        <div className="flex justify-between text-base font-medium text-accent">
          <p>Підсумок</p>
          <p>{totalAmount} грн.</p>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="flex justify-center items-center text-center text-sm text-gray-500">
            <p>
              <Button
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
