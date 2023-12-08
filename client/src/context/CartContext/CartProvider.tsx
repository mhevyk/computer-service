import { Computer } from "@features/computers/types";
import { createContext, useReducer, PropsWithChildren } from "react";

export type CartRecord = {
  count: number;
  computer: Computer;
};

type State = Map<number, CartRecord>;

type Action =
  | { type: "ADD_TO_CART"; payload: Computer }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TO_CART": {
      const computer = action.payload;
      const id = computer.computer_id;
      const newState = new Map(state);

      return newState.set(id, {
        count: state.has(id) ? state.get(id)!.count + 1 : 1,
        computer,
      });
    }

    case "REMOVE_FROM_CART": {
      const id = action.payload;
      const newState = new Map(state);
      const cartItem = newState.get(id);

      if (!cartItem) {
        return state;
      }

      const currentCount = cartItem?.count ?? 0;

      if (currentCount > 1) {
        newState.set(id, {
          ...cartItem,
          count: currentCount - 1,
        });
      } else {
        newState.delete(id);
      }

      return newState;
    }

    case "CLEAR_CART": {
      return new Map();
    }

    default: {
      throw new Error("Unknown action type");
    }
  }
}

type CartContextType = {
  cart: CartRecord[];
  addToCart: (computer: Computer) => void;
  removeFromCartById: (computer_id: number) => void;
  clearCart: () => void;
  getCount: (computer_id: number) => number;
};

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, dispatch] = useReducer(cartReducer, new Map());

  function addToCart(computer: Computer) {
    dispatch({
      type: "ADD_TO_CART",
      payload: computer,
    });
  }

  function removeFromCartById(computer_id: number) {
    dispatch({ type: "REMOVE_FROM_CART", payload: computer_id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  function getCount(computer_id: number) {
    return cart.get(computer_id)?.count ?? 0;
  }

  return (
    <CartContext.Provider
      value={{
        cart: [...cart.values()],
        addToCart,
        removeFromCartById,
        clearCart,
        getCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
