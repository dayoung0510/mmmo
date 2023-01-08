import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlexVer } from "src/components/atoms/Divs";
import { Input } from "src/components/atoms/Inputs";
import { Button } from "src/components/atoms/Buttons";
import { db } from "src/firebase-config";
import { collection, DocumentData, getDocs } from "firebase/firestore";

type FormDataType = {
  id: string;
  date: string;
  time: string;
  wallet: string;
  name: string;
  memo: string;
};

const Main = () => {
  //파이어베이스 데이터
  const [wallet, setWallet] = useState<null | DocumentData[]>(null);
  const dataCollectionRef = collection(db, "wallet");

  useEffect(() => {
    const getWallet = async () => {
      const data = await getDocs(dataCollectionRef);
      setWallet(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getWallet();
  }, []);

  const { handleSubmit, register } = useForm<FormDataType>();

  const onSubmit = async (formData: FormDataType) => {};

  if (!wallet) return <>데이터를 불러올 수 없습니다.</>;

  return (
    <>
      <form action="" method="POST">
        <input id="name" />
        <input id="request" />
        <button type="submit">확인</button>
      </form>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <FlexVer>
          <Input type="date" {...register("date")} />
          <Input placeholder="현재 지갑 금액" {...register("wallet")} />
          <Input placeholder="시간" {...register("time")} />
          <Input placeholder="종목" {...register("name")} />
          <Input placeholder="메모" {...register("memo")} />
        </FlexVer>
        <div>
          <Button type="submit">확인</Button>
        </div>
        <div>{wallet.map((w) => w.name)}</div>
      </form>
    </>
  );
};

export default Main;
