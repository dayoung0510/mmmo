import { useState } from "react";
import { Button, Box } from "@chakra-ui/react";

const Records = () => {
  const url = import.meta.env.VITE_SPREADSHEET_API;

  const [sheetData, setSheetData] = useState<null | []>();

  const handleButton = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSheetData(data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <Button onClick={handleButton}>데이터 불러오기</Button>
      <Box>{sheetData && sheetData.map((d) => <div key={d}>{d}</div>)}</Box>
    </div>
  );
};

export default Records;
