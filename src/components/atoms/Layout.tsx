import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GrMandriva } from "react-icons/gr";
import { BsPencil, BsCardList } from "react-icons/bs";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Center bg="white" position="relative" h="3rem">
      <Box position="absolute" left={4}>
        <Menu>
          <MenuButton
            as={IconButton}
            fontSize="2rem"
            color="red.400"
            icon={<GrMandriva />}
            variant="ghost"
          />
          <MenuList bg="gray.100" boxShadow="md">
            <VStack gap={2} alignItems="flex-start">
              <Link to="/">
                <MenuItem bg="0" icon={<BsPencil />}>
                  메인
                </MenuItem>
              </Link>
              <Link to="/records">
                <MenuItem bg="0" icon={<BsCardList />}>
                  기록모음
                </MenuItem>
              </Link>
            </VStack>
          </MenuList>
        </Menu>
      </Box>
      <Link to="/">
        <Text color="blue.300" fontWeight={800} fontSize="xl">
          MMMO
        </Text>
      </Link>
    </Center>
  );
};

const Layout = ({ children }: { children: React.ReactChild }) => {
  return (
    <Box w="full" minH="100vh">
      <Center w="full" h="full">
        <Box w={{ base: "md", md: "xl" }} bg="white" minH="100vh">
          <Nav />
          <Box p={4}>{children}</Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Layout;
