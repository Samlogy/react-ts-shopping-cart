import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";

import { ShoppingCart, Navbar } from "./components";
import { Store, Home } from "./pages";

export default function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Container>
      <ShoppingCart />
    </>
  );
}
