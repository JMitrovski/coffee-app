import { useAlert } from "@/hooks/useAlert";
import { ICoffee } from "@/interfaces/coffees";
import { TTypeOfModification } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

export interface ICartContext {
  cartItems: ICoffee<TTypeOfModification>[] | [];
  addItemToCart: (item: ICoffee<TTypeOfModification>) => void;
  removeItemFromCart: (item: ICoffee<TTypeOfModification>) => void;
  checkIfItemIsInCart: (item: ICoffee<TTypeOfModification>) => boolean;
  emptyCart: () => void;
}

export const CartContext = createContext<ICartContext | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICoffee<TTypeOfModification>[]>(
    []
  );
  const { showAlert } = useAlert();

  const addItemToCart = (item: ICoffee<TTypeOfModification>): void => {
    setCartItems((prevCart) => [...prevCart, { ...item, id: Date.now() }]);
    showAlert("success", "Success", `Successfully added ${item?.name} to cart`);
  };

  const removeItemFromCart = (item: ICoffee<TTypeOfModification>): void => {
    setCartItems((prevCart) => prevCart.filter((i) => i.id !== item.id));
    showAlert(
      "error",
      "Removed item",
      `Successfully removed ${item.name} from the cart`
    );
  };

  const checkIfItemIsInCart = (item: ICoffee<TTypeOfModification>): boolean => {
    return cartItems.some((i) => i.id === item.id);
  };

  const emptyCart = () => {
    setCartItems([]);
    showAlert(
      "success",
      "Congratulations",
      `The order was successfully sent in!`
    );
  };

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    checkIfItemIsInCart,
    emptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
