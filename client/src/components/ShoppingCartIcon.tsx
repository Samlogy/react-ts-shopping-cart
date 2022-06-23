import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useShoppingCart from "../store/useShoppingCart";

export default function ShoppingCartIcon({ value }: { value: number }) {
  const isOpen = useShoppingCart((state) => state.isOpen);
  const setOpen = useShoppingCart((state) => state.setOpen);

  const bgColor = useColorModeValue("transparent", "gray_3");
  const bgHoverColor = useColorModeValue("gray_8", "gray_2");

  return (
    <Box pos="relative" onClick={() => setOpen(isOpen)}>
      {value > 0 && (
        <Box
          as="span"
          fontSize="xs"
          fontWeight="bold"
          lineHeight="none"
          p=".1rem .25rem"
          color="white"
          bg="red"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          borderRadius={"50%"}
          m="0"
          pos="absolute"
          zIndex={9000}
          left={"40%"}
          bottom={"65%"}
        >
          {value >= 100 ? "99+" : value}
        </Box>
      )}
      <IconButton
        aria-label="Shopping Cart"
        bg={bgColor}
        _hover={{ bg: bgHoverColor }}
        icon={<AiOutlineShoppingCart size={24} />}
        mr=".2rem"
      />
    </Box>
  );
}
