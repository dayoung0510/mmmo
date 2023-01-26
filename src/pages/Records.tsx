import { useEffect, useState } from "react";
import { useDisclosure, Center, Box, Grid, IconButton } from "@chakra-ui/react";
import MySpinner from "src/components/atoms/MySpinner";
import { FaComment } from "react-icons/fa";
import MemoModal from "src/components/atoms/MemoModal";
import { useRecordContext } from "src/App";

const Records = () => {
  const url = import.meta.env.VITE_SPREADSHEET_API;
  const [head, setHead] = useState<null | []>();
  const [body, setBody] = useState<null | []>();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { dispatch } = useRecordContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHead(data.head);
        setBody(data.body);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [fetch, url]);

  //마지막 종료가를 context에 보내기
  useEffect(() => {
    if (body) {
      const lastEndPrice = body[body.length - 1][4];
      dispatch({ type: "SET_LAST_END_PRICE", lastEndPrice });
    }
  }, [body]);

  const handleModalOpen = (str: string) => {
    setContent(str);
    onOpen();
  };

  if (!head || loading) return <MySpinner />;

  return (
    <Box>
      <Grid
        templateColumns="repeat(6, 1fr)"
        my={2}
        bg="blackAlpha.700"
        p={2}
        color="white"
        fontSize="sm"
      >
        {head.map((i) => (
          <Center key={i}>{i}</Center>
        ))}
      </Grid>

      {body &&
        body.map((row) => (
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

      <MemoModal isOpen={isOpen} onClose={onClose} content={content} />
    </Box>
  );
};

export default Records;
