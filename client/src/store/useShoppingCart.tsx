import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type CartItem = {
  id: number;
  quantity: number;
};

interface IShoppingCart {
  isOpen: boolean;
  quantities: number;
  quantityTotal: CartItem[];

  setOpen: (isOpen: boolean) => void;
  removeItems: () => void;
  removeItem: (cartItems: CartItem[], id: number) => void;
  increaseQuantity: (cartItems: CartItem[], id: number) => void;
  decreaseQuantity: (cartItems: CartItem[], id: number) => void;
}

function increase(cartItems: CartItem[], id: number) {
  if (cartItems.find((item: CartItem) => item.id === id) == null) {
    const items = [...cartItems, { id, quantity: 1 }];
    return {
      cartItems: items,
      quantityTotal: getQuantity(items),
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
      quantityTotal: getQuantity(items),
    };
  }
}
function decrease(cartItems: CartItem[], id: number) {
  if (cartItems.find((item: CartItem) => item.id === id)?.quantity === 1) {
    const items = cartItems.filter((item: CartItem) => item.id !== id);
    return {
      cartItems: items,
      quantityTotal: getQuantity(items),
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
      quantityTotal: getQuantity(items),
    };
  }
}

function removeOne(cartItems: CartItem[], id: number) {
  const items = cartItems.filter((item: CartItem) => item.id !== id);
  return {
    cartItems: items,
    quantityTotal: getQuantity(items),
  };
}
function removeAll() {
  return {
    cartItems: [],
    quantityTotal: 0,
  };
}
function getQuantity(cartItems: CartItem[]) {
  return cartItems.reduce(
    (quantity: number, item: CartItem) => item.quantity + quantity,
    0
  );
}

let shoppingCartStore = (set: any) => ({
  isOpen: false, // open / close --> shopping cart
  cartItems: [], // all items inside the cart
  quantityTotal: 0, // products qunatity

  setOpen: (val: boolean) => set(() => ({ isOpen: !val })),
  removeItems: () => set(() => ({ ...removeAll() })),
  removeItem: (id: number) =>
    set((state: any) => ({
      ...removeOne(state.cartItems, id),
    })),
  increaseQuantity: (id: number) =>
    set((state: any) => ({
      ...increase(state.cartItems, id),
    })),
  decreaseQuantity: (id: number) =>
    set((state: any) => ({
      ...decrease(state.cartItems, id),
    })),
});

// @ts-ignore
shoppingCartStore = devtools(shoppingCartStore);
// @ts-ignore
shoppingCartStore = persist(shoppingCartStore, { name: "shopping_cart" });
// @ts-ignore
const useShoppingCart = create<IShoppingCart>(shoppingCartStore);

export default useShoppingCart;
