import {
  Box,
  Button,
  Flex,
  Image,
  useColorModeValue,
  IconButton,
  Heading,
} from "@chakra-ui/react";
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
  const removeItem = useShoppingCart((state: any) => state.removeItem);
  const decreaseQuantity = useShoppingCart(
    (state: any) => state.decreaseQuantity
  );
  const cartItems = useShoppingCart((state: any) => state.cartItems);

  const quantity = cartItems.find((item: any) => item.id === id)?.quantity || 0;

  const bgColor = useColorModeValue("gray_9", "gray_2");
  return (
    <Flex
      key={id}
      m=".5rem"
      w="18rem"
      alignItems="center"
      justifyContent="center"
      cursor={"pointer"}
    >
      <Box bg={bgColor} w="full" rounded="lg" shadow="lg" position="relative">
        <Image
          src={imgUrl}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          w="100%"
          h="35vh"
        />

        <Box p="1rem">
          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="1.2rem"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {name}
            </Box>
            <Box
              fontSize="1.2rem"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {formatCurrency(price)}
            </Box>
          </Flex>

          {quantity === 0 ? (
            <Button
              variant={"solid"}
              borderRadius="20px"
              w="full"
              mt=".75rem"
              onClick={() => increaseQuantity(id)}
            >
              Add to Cart
            </Button>
          ) : (
            <Flex flexDir={"column"} alignItems={"center"}>
              <Flex alignItems={"center"} justify="center">
                <IconButton
                  aria-label="decrease-quantity"
                  onClick={() => decreaseQuantity(id)}
                  icon={<AiOutlineMinus />}
                />
                <Box>
                  <Box as="span" className="fs-3">
                    {quantity}
                  </Box>{" "}
                  in cart
                </Box>

                <IconButton
                  aria-label="increase-quantity"
                  onClick={() => increaseQuantity(id)}
                  icon={<AiOutlinePlus />}
                />
              </Flex>
              <IconButton
                aria-label="increase-quantity"
                onClick={() => removeItem(id)}
                icon={<FaTrash />}
              />
            </Flex>
          )}
        </Box>
      </Box>
    </Flex>
  );
}
