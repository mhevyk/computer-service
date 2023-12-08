import { Button } from "@components/ui/Button";
import { useCart } from "@context/CartContext/useCart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./components/CartItem";

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
          <p className="text-xl">Всього</p>
          <p className="text-3xl">{totalAmount} грн.</p>
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
          <Button disabled={cart.length === 0}>Підтвердити замовлення</Button>
        </div>
      </div>
    </div>
  );
}
