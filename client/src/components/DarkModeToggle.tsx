import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function DarkModeToggle() {
  const { colorMode: mode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("transparent", "gray_3");
  const bgHoverColor = useColorModeValue("gray_8", "gray_2");

  return (
    <IconButton
      aria-label="dark mode"
      bg={bgColor}
      _hover={{ bg: bgHoverColor }}
      onClick={() => toggleColorMode()}
      icon={
        mode === "light" ? (
          <FiMoon color={mode ? "black" : "white"} />
        ) : (
          <FiSun color={mode ? "white" : "black"} />
        )
      }
    />
  );
}
