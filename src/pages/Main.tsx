import { useEffect } from "react";
import Recording from "src/components/organisms/Recording";
import { useRecordContext } from "src/App";

const Main = () => {
  const url = import.meta.env.VITE_SPREADSHEET_API;
  const { state, dispatch } = useRecordContext();

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

  console.log(state);

  return (
    <>
      <Recording />
    </>
  );
};

export default Main;
