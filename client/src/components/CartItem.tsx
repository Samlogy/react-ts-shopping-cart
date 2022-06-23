import { Button, Stack } from "@chakra-ui/react";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

import useShoppingCart from "../store/useShoppingCart";

type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const increaseQuantity = useShoppingCart(
    (state: any) => state.increaseQuantity
  );
  const decreaseQuantity = useShoppingCart(
    (state: any) => state.decreaseQuantity
  );
  const removeItem = useShoppingCart((state: any) => state.removeItem);

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item?.imgUrl}
        style={{
          width: "125px",
          height: "75px",
          objectFit: "cover",
          borderRadius: ".5rem",
        }}
      />
      <div className="me-auto">
        <div>{item?.name} </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={() => increaseQuantity(item?.id)}
        >
          +
        </Button>
        {quantity > 0 && (
          <span
            className="text-muted"
            style={{ fontSize: ".65rem", padding: ".5rem" }}
          >
            {quantity}
          </span>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => decreaseQuantity(item?.id)}
        >
          -
        </Button>
      </div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeItem(item?.id)}
      >
        x
      </Button>

      <div> {formatCurrency(item?.price * quantity)}</div>
    </Stack>
  );
}
