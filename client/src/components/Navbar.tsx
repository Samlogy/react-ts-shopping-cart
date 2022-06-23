export default function Navbar() {
  const onOpen = useShoppingCart((state: any) => state.onOpen);
  const quantityTotal = useShoppingCart((state: any) => state.quantityTotal);

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
        </Nav>

        <Button
          onClick={() => onOpen()}
          style={{ width: "2.5rem", height: "2.5rem", position: "relative" }}
          variant="outline-primary"
          className="rounded-circle"
        >
          <FaShoppingCart />

          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1rem",
              height: "1rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
              fontSize: ".7rem",
            }}
          >
            {quantityTotal}
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
}

import { FaShoppingCart } from "react-icons/fa";
import useShoppingCart from "../store/useShoppingCart";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { DarkModeToggle, ShoppingCartIcon } from "../components";

const Links = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/store",
    name: "Store",
  },
];

const NavLink = ({ children, link }: { children: ReactNode; link: string }) => {
  const { pathname } = useRouter();
  const isActive = pathname === `${link}`;

  const textColor = useColorModeValue("black", "#edf2f7");

  return (
    <Link href={`${link}`}>
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onOpen = useShoppingCart((state: any) => state.onOpen);
  const quantityTotal = useShoppingCart((state: any) => state.quantityTotal);

  const bgColor = useColorModeValue("white", "gray_3");

  const user = {};

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
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link: any) => (
              <NavLink key={link.link} link={link.link}>
                {" "}
                {link.name}{" "}
              </NavLink>
            ))}
          </HStack>
        </HStack>

        <Flex alignItems={"center"}>
          <SelectLanguage />
          <DarkModeToggle />
          <ShoppingCartIcon value={products.length} />
        </Flex>
      </Flex>
    </Box>
  );
}
