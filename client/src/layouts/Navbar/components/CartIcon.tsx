import { Icon } from "@iconify/react";
import { useCart } from "@context/CartContext/useCart";
import { cc } from "@utils/cc";
import { useNavigate } from "react-router-dom";

export function CartIcon() {
  const { cart } = useCart();
  const navigate = useNavigate();

  let totalAmount = 0;
  let totalCount = 0;

  for (const { computer, count } of cart) {
    totalAmount += computer.price;
    totalCount += count;
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <Icon icon="mdi:cart" />
          <span
            className={cc(
              `badge badge-sm indicator-item`,
              totalCount > 0 && "badge-accent"
            )}
          >
            {totalCount}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content bg-base-100 w-64 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-lg">{totalCount} товарів</span>
          <span className="text-primary">Всього: {totalAmount} грн.</span>
          <div className="card-actions mt-4">
            <button
              className="btn btn-accent btn-block"
              onClick={() => navigate("/app/cart")}
            >
              До кошика
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
