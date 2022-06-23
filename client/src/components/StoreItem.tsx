import { Box } from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import useShoppingCart from "../store/useShoppingCart";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export default function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const increaseQuantity = useShoppingCart(
    (state: any) => state.increaseQuantity
  );
  const decreaseQuantity = useShoppingCart(
    (state: any) => state.decreaseQuantity
  );
  const removeItem = useShoppingCart((state: any) => state.removeItem);
  const cartItems = useShoppingCart((state: any) => state.cartItems);

  const quantity = cartItems.find((item: any) => item.id === id)?.quantity || 0;

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button variant="secondary" onClick={() => increaseQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <AiOutlineMinus onClick={() => decreaseQuantity(id)} />
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>

                <AiOutlinePlus onClick={() => increaseQuantity(id)} />
              </div>
              <FaTrash onClick={() => removeItem(id)} />
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
