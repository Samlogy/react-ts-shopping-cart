import { Offcanvas, Stack } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import storeItems from "../data/items.json";
import useShoppingCart from "../store/useShoppingCart";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./";

export default function ShoppingCart() {
  const onClose = useShoppingCart((state: any) => state.onClose);
  const cartItems = useShoppingCart((state: any) => state.cartItems);
  const isOpen = useShoppingCart((state: any) => state.isOpen);
  const removeItems = useShoppingCart((state: any) => state.removeItems);

  return (
    <Offcanvas show={isOpen} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems?.length > 0 && (
            <>
              <div
                style={{
                  marginLeft: "auto",
                  padding: ".25rem",
                }}
              >
                <FaTrash size={16} onClick={() => removeItems()} />
              </div>
              {cartItems.map((item: any) => (
                <CartItem key={item.id} {...item} />
              ))}
            </>
          )}

          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {cartItems?.length > 0 &&
              formatCurrency(
                cartItems.reduce((total: any, cartItem: any) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
