import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartItem = {
  id: number;
  quantity: number;
};

interface IShoppingCart {
  isOpen: boolean;
  quantity: number;
  quantities: number;
  cartItems: CartItem[];

  setOpen: (isOpen: boolean) => void;
  removeItems: () => void;
  removeItem: (cartItems: CartItem[], id: number) => void;
  increaseQuantity: (cartItems: CartItem[], id: number) => void;
  decreaseQuantity: (cartItems: CartItem[], id: number) => void;
  getItemQuantity: (id: number) => void;
}

function increase(cartItems: CartItem[], id: number) {
  if (cartItems.find((item: CartItem) => item.id === id) == null) {
    const items = [...cartItems, { id, quantity: 1 }];
    return {
      cartItems: items,
      quantities: getQuantities(items),
    };
  } else {
    const items = cartItems.map((item: CartItem) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      } else {
        return item;
      }
    });
    return {
      cartItems: items,
      quantities: getQuantities(items),
    };
  }
}
function decrease(cartItems: CartItem[], id: number) {
  if (cartItems.find((item: CartItem) => item.id === id)?.quantity === 1) {
    const items = cartItems.filter((item: CartItem) => item.id !== id);
    return {
      cartItems: items,
      quantities: getQuantities(items),
    };
  } else {
    const items = cartItems.map((item: CartItem) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    return {
      cartItems: items,
      quantities: getQuantities(items),
    };
  }
}
function getQuantity(cartItems: CartItem[], id: number) {
  const quantity =
    cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;
  console.log(quantity);
  return quantity;
}
function removeOne(cartItems: CartItem[], id: number) {
  const items = cartItems.filter((item: CartItem) => item.id !== id);
  return {
    cartItems: items,
    quantities: getQuantities(items),
  };
}
function removeAll() {
  return {
    cartItems: [],
    quantities: 0,
  };
}
function getQuantities(cartItems: CartItem[]) {
  return cartItems.reduce(
    (quantity: any, item: any) => item.quantity + quantity,
    0
  );
}

let shoppingCartStore = (set: any) => ({
  isOpen: false, // open / close --> shopping cart
  cartItems: [], // all items inside the cart
  quantity: 0, // product quantity
  quantities: 0, // products qunatity

  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  removeItems: () => set(() => ({ ...removeAll() })),
  removeItem: (id: number) =>
    set((state: any) => ({
      ...removeOne(state.cartItems, id),
    })),
  getItemQuantity: (id: number) =>
    set((state: any) => ({
      quantity: getQuantity(state.cartItems, id),
    })),
  increaseQuantity: (id: number) =>
    set((state: any) => ({
      ...increase(state.cartItems, id),
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
