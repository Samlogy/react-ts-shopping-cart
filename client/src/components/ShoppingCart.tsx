import {
  IconButton,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import storeItems from "../data/items.json";
import useShoppingCart from "../store/useShoppingCart";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem, View } from "./";

export default function ShoppingCart() {
  const isOpen = useShoppingCart((state: any) => state.isOpen);
  const setOpen = useShoppingCart((state: any) => state.setOpen);
  const cartItems = useShoppingCart((state: any) => state.cartItems);
  const removeItems = useShoppingCart((state: any) => state.removeItems);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      size="sm"
      onClose={() => setOpen(isOpen)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader> Shopping Cart </DrawerHeader>

        <DrawerBody>
          <IconButton
            aria-label="decrease-quantity"
            m="0 0 1rem auto"
            p=".25rem"
            onClick={() => removeItems()}
            icon={<FaTrash size={16} />}
          />
          <View cond={cartItems.length > 0}>
            {cartItems.map((item: any, idx: number) => (
              <CartItem key={idx} {...item} />
            ))}
            <Divider />
            <Flex justifyContent={"space-between"} mt="1rem">
              <Text fontWeight="600"> Total </Text>
              <Text fontWeight="600">
                {cartItems?.length > 0 &&
                  formatCurrency(
                    cartItems.reduce((total: any, cartItem: any) => {
                      const item = storeItems.find((i) => i.id === cartItem.id);
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0)
                  )}
              </Text>
            </Flex>
          </View>

          <View cond={cartItems.length === 0}>
            <Text fontSize="1rem" color="gray.500">
              There is not product in your shopping cart{" "}
            </Text>
          </View>
        </DrawerBody>

        <DrawerFooter display="flex" flexDir="column">
          <Divider my="1rem" />
          <Text mb="1rem" fontSize=".9rem" color="gray.500">
            Shipping and taxes calculated at checkout.{" "}
          </Text>
          <Button
            w="full"
            bg={"accent_3"}
            _hover={{ bg: "accent_2" }}
            color={"white"}
          >
            Checkout{" "}
          </Button>
          <Text display="flex" mt="1rem">
            or
            <Text
              textColor="accent_3"
              ml="1rem"
              fontSize=".9rem"
              _hover={{ cursor: "pointer" }}
            >
              Continue Shopping →{" "}
            </Text>
          </Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
