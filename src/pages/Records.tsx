import { useState } from "react";
import {
  useDisclosure,
  Flex,
  Center,
  Box,
  Grid,
  IconButton,
} from "@chakra-ui/react";
import MySpinner from "src/components/atoms/MySpinner";
import { FaComment } from "react-icons/fa";
import MemoModal from "src/components/atoms/MemoModal";
import { useRecordContext } from "src/App";

const Records = () => {
  const [content, setContent] = useState("");

  const { state } = useRecordContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleModalOpen = (str: string) => {
    setContent(str);
    onOpen();
  };

  if (!state.head || state.loading) return <MySpinner />;

  return (
    <Box fontSize="0.9rem">
      <Grid
        templateColumns="repeat(6, 1fr)"
        bg="blackAlpha.500"
        p={2}
        color="white"
      >
        {state.head.map((i) => (
          <Center key={i}>{i}</Center>
        ))}
      </Grid>

      <Flex flexDir="column-reverse">
        {state.body &&
          state.body.map((row) => (
            <Grid key={row} w="full" templateColumns="repeat(6, 1fr)" px={2}>
              <Center>{row[0]}</Center>
              <Center>{row[1]}</Center>
              <Center>{row[2]}</Center>
              <Center>{row[3]}</Center>
              <Center>{row[4]}</Center>
              <Center>
                <IconButton
                  aria-label="view"
                  variant="ghost"
                  size="lg"
                  onClick={() => handleModalOpen(row[5])}
                  icon={<FaComment />}
                />
              </Center>
            </Grid>
          ))}
      </Flex>

      <MemoModal isOpen={isOpen} onClose={onClose} content={content} />
    </Box>
  );
};

export default Records;
