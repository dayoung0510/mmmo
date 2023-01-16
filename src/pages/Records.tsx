import { useEffect, useState } from "react";
import { Button, Box, HStack, Center } from "@chakra-ui/react";
import MySpinner from "src/components/atoms/MySpinner";

const Records = () => {
  const url = import.meta.env.VITE_SPREADSHEET_API;
  const [head, setHead] = useState<null | []>();
  const [body, setBody] = useState<null | []>();
  const [loading, setLoading] = useState(false);

  // const handleButton = () => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSheetData(data);
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHead(data.head[0]);
        setBody(data.body);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (!head) return <MySpinner />;

  return (
    <div>
      <Center
        justifyContent="space-between"
        my={2}
        bg="blackAlpha.700"
        p={2}
        color="white"
        fontSize="sm"
      >
        {head.map((i) => (
          <Box key={i}>{i}</Box>
        ))}
      </Center>
      {/* <Box>{sheetData && sheetData.map((d) => <div key={d}>{d}</div>)}</Box> */}
    </div>
  );
};

export default Records;
