import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { Navbar, ShoppingCart } from "./";

interface ILayout {
  children: React.ReactNode;
  isHeaderVisible?: boolean;
  [restProps: string]: any;
}

export default function Layout({
  children,
  isHeaderVisible,
  ...restProps
}: ILayout) {
  const bgColor = useColorModeValue("white", "gray_3");
  return (
    <Flex flexDir="column" {...restProps} bg={bgColor} minH="100vh">
      {isHeaderVisible && <Navbar />}
      <Container
        maxW="80em"
        bg={bgColor}
        p="1.5rem "
        borderRadius="10px"
        mt="12vh"
      >
        {children}
      </Container>
      <ShoppingCart />
    </Flex>
  );
}
