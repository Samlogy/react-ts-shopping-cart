import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartItem = {
  id: number;
  quantity: number;
};

interface IShoppingCart {
  isOpen: boolean;
  quantity: number;
  cartItems: CartItem[];

  setOpen: (isOpen: boolean) => void;
  removeItems: any;
  removeItem: any;
  increaseQuantity: any;
  decreaseQuantity: any;
  getItemQuantity: any;
}

function increase(cartItems: any, id: number) {
  console.log(cartItems);
  if (cartItems.find((item: CartItem) => item.id === id) == null) {
    return [...cartItems, { id, quantity: 1 }];
  } else {
    return cartItems.map((item: CartItem) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
  }
}
function decrease(cartItems: CartItem[], id: number) {
  if (cartItems.find((item: CartItem) => item.id === id)?.quantity === 1) {
    return cartItems.filter((item: CartItem) => item.id !== id);
  } else {
    return cartItems.map((item: CartItem) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
  }
}
function getItemQuantity(cartItems: CartItem[], id: number) {
  const quantity =
    cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;
  return quantity;
}
function removeOne(cartItems: CartItem[], id: number) {
  return {
    cartItems: cartItems.filter((item: CartItem) => item.id !== id),
    quantity: cartItems.reduce(
      (quantity: number, item: CartItem) => item.quantity + quantity,
      0
    ),
  };
}
function removeAll() {
  return {
    cartItems: [],
    quantity: 0,
  };
}
function computeQuantity(cartItems: any) {
  return cartItems.reduce(
    (quantity: any, item: any) => item.quantity + quantity,
    0
  );
}

let shoppingCartStore = (set: any) => ({
  isOpen: false, // open / close --> shopping cart
  cartItems: [], // items inside the cart
  quantity: 0, // product quantity

  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  removeItems: () => set((state: any) => ({ ...removeAll() })),
  removeItem: (id: number) =>
    set((state: any) => ({
      ...removeOne(state.cartItems, id),
    })),
  getItemQuantity: (id: number) =>
    set((state: any) => ({
      quantity: getItemQuantity(state.cartItems, id),
    })),
  increaseQuantity: (id: number) =>
    set((state: any) => ({
      cartItems: increase(state.cartItems, id),
    })),
  decreaseQuantity: (id: number) =>
    set((state: any) => ({
      cartItems: decrease(state.cartItems, id),
    })),
});

// @ts-ignore
shoppingCartStore = devtools(shoppingCartStore);
// @ts-ignore
shoppingCartStore = persist(shoppingCartStore, { name: "shopping_cart" });
// @ts-ignore
const useShoppingCart = create<IShoppingCart>(shoppingCartStore);

export default useShoppingCart;
