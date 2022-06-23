import { useMemo } from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import useShoppingCart from "../store/useShoppingCart";

export default function Navbar() {
  const onOpen = useShoppingCart((state: any) => state.onOpen);
  const cartItems = useShoppingCart((state: any) => state.cartItems);
  const quantity = useShoppingCart((state: any) => state.quantity);

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
          <Nav.Link to="/about" as={NavLink}>
            About
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
            {quantity}
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
}
