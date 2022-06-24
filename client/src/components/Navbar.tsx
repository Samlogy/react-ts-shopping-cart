import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { DarkModeToggle, ShoppingCartIcon } from "../components";
import useShoppingCart from "../store/useShoppingCart";

const Links = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/store",
    label: "Store",
  },
];

const NavLink = ({ children, link }: { children: ReactNode; link: string }) => {
  const isActive = false;
  const textColor = useColorModeValue("black", "#edf2f7");

  return (
    <Link to={`${link}`}>
      <Box
        px={2}
        py={1}
        rounded={"md"}
        color={isActive ? "accent_3" : textColor}
        _hover={{
          textDecoration: "none",
          cursor: "pointer",
          bg: useColorModeValue("gray.200", "#2D3748"),
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default function NavBar() {
  const [isOpen, setOpen] = useState(false);

  const quantityTotal = useShoppingCart((state: any) => state.quantityTotal);

  const bgColor = useColorModeValue("white", "gray_3");

  return (
    <Box bg={bgColor} px={4} pos="fixed" w="full" boxShadow={"md"} zIndex="100">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={
            isOpen ? (
              <Flex justifyContent={"center"} alignItems="center">
                <AiOutlineClose />
              </Flex>
            ) : (
              <Flex justifyContent={"center"} alignItems="center">
                <AiOutlineMenu />
              </Flex>
            )
          }
          aria-label={"Toggle Menu"}
          display={{ md: "none" }}
          onClick={() => setOpen(!isOpen)}
        />

        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link: any) => (
              <NavLink key={link.route} link={link.route}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={"center"}>
          <DarkModeToggle />
          <ShoppingCartIcon value={quantityTotal} />
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link: any) => (
              <NavLink key={link.route} link={link.route}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
