import { Box, Flex, IconButton, Image } from "@chakra-ui/react";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import useShoppingCart from "../store/useShoppingCart";
import { ICartItem } from "../lib/interface";
type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: ICartItem) {
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
    <Flex flexDir="row" justify="space-between" alignItems="center" mb="1rem">
      <Image
        src={item?.imgUrl}
        alt="cart-image"
        w="125px"
        h="75px"
        objectFit={"cover"}
        borderRadius=".5rem"
      />

      <div className="me-auto">
        <div>{item?.name} </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>

      <Flex flexDir={"row"} alignItems="center" justify="center">
        <IconButton
          aria-label="increase-quantity"
          onClick={() => increaseQuantity(item?.id)}
          icon={<AiOutlinePlus size={16} />}
        />
        {quantity > 0 && (
          <Box as="span" fontSize=".9rem" p=".5rem">
            {quantity}
          </Box>
        )}
        <IconButton
          aria-label="decrease-quantity"
          ml="auto"
          p=".25rem"
          onClick={() => decreaseQuantity(item?.id)}
          icon={<AiOutlineMinus size={16} />}
        />
      </Flex>

      <Flex flexDir={"column"} alignItems="center" justify="center">
        <IconButton
          aria-label="remove-item"
          ml="auto"
          p=".25rem"
          onClick={() => removeItem(item?.id)}
          icon={<FaTrash size={16} />}
        />

        <Box fontSize={".9rem"}> {formatCurrency(item?.price * quantity)}</Box>
      </Flex>
    </Flex>
  );
}
