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
import { getPercentage } from "src/utils";

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
      <Grid templateColumns="repeat(7, 1fr)" bg="gray.500" p={2} color="white">
        {state.head.map((i) => (
          <Center key={i}>{i}</Center>
        ))}
        <Center>rate</Center>
      </Grid>

      <Flex flexDir="column-reverse">
        {state.body &&
          state.body.map((row, idx) => (
            <Grid key={row} w="full" templateColumns="repeat(7, 1fr)" px={2}>
              {/* 날짜 */}
              <Center>{row[0]}</Center>

              {/* 시간 */}
              <Center>{row[1]}</Center>

              {/* 타입 */}
              <Center>{row[2]}</Center>

              {/* 시작가 */}
              <Center>{row[3]}</Center>

              {/* 종료가 */}
              <Center>{row[4]}</Center>

              {/* 메모 */}
              <Center>
                <IconButton
                  aria-label="view"
                  variant="ghost"
                  size="lg"
                  onClick={() => handleModalOpen(row[5])}
                  icon={<FaComment />}
                />
              </Center>

              {/* 상승률 */}
              <Center>
                {row[3] && row[4]
                  ? getPercentage(Number(row[3]), Number(row[4]))
                  : "-"}
              </Center>
            </Grid>
          ))}
      </Flex>

      <MemoModal isOpen={isOpen} onClose={onClose} content={content} />
    </Box>
  );
};

export default Records;
