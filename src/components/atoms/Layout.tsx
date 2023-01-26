import { useEffect } from "react";
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
import { useRecordContext } from "src/App";

const Nav = () => {
  return (
    <Center bg="white" position="relative" h="4rem">
      <Box position="absolute" left={4}>
        <Menu>
          <MenuButton
            as={IconButton}
            fontSize="2rem"
            color="red.400"
            icon={<GrMandriva />}
            variant="ghost"
          />
          <MenuList boxShadow="md">
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
  const url = import.meta.env.VITE_SPREADSHEET_API;
  const { dispatch } = useRecordContext();

  //시트에서 데이터 불러오기
  useEffect(() => {
    dispatch({ type: "SET_LOADING", loading: true });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_HEAD", head: data.head });
        dispatch({ type: "SET_BODY", body: data.body });
        dispatch({ type: "SET_LOADING", loading: false });
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING", loading: false });
      });
  }, [fetch, url]);

  return (
    <Box w="full" minH="100vh" position="relative">
      <Center w="full" h="full">
        <Box w={{ base: "md", md: "xl" }} bg="white" minH="100vh">
          <Nav />
          <Box p={{ base: 2, md: 4 }}>{children}</Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Layout;
