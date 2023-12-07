import { Icon } from "@iconify/react";
import { useCart } from "../../../context/CartContext/useCart";
import { CartComputerCounter } from "../../../components/CartComputerCounter";

export function CartIcon() {
  const { cart } = useCart();

  // TODO: change UI

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <Icon icon="mdi:cart" />
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div className="card-body">
          {cart.map(cartItem => (
            <CartComputerCounter computer={cartItem.computer} />
          ))}
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
