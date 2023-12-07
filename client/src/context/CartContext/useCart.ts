import { useContext } from "react";
import { CartContext } from "./CartProvider";

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart() should be called within CartProvider");
  }

  return context;
}
