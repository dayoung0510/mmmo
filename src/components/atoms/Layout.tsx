import { useEffect } from "react";
import { Box, Text, Center, HStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { useRecordContext } from "src/App";

const navButtons = [
  {
    link: "/",
    korean: "기록작성",
  },
  {
    link: "/records",
    korean: "기록리스트",
  },
  {
    link: "/percentage",
    korean: "등락률",
  },
];

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <HStack gap={6} p={2} justifyContent="center" bg="gray.700" zIndex={9}>
      {navButtons.map((button) => {
        return (
          <Link key={button.link} to={button.link}>
            <HStack>
              <Text
                color={pathname === button.link ? "white" : "gray.400"}
                fontWeight={pathname === button.link ? 800 : 400}
              >
                {button.korean}
              </Text>
            </HStack>
          </Link>
        );
      })}
    </HStack>
  );
};

const Layout = ({ children }: { children: React.ReactChild }) => {
  return (
    <Box w="full" minH="100%" position="relative">
      <Center w="full" h="full">
        <Box
          w={{ base: "md", md: "xl" }}
          bg="white"
          minH="100vh"
          position="relative"
        >
          <Nav />
          <Box w="full">{children}</Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Layout;
