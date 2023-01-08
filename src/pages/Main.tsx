import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlexVer } from "src/components/atoms/Divs";
import { Input } from "src/components/atoms/Inputs";
import { Button } from "src/components/atoms/Buttons";
import { db } from "src/firebase-config";
import { collection, DocumentData, getDocs, addDoc } from "firebase/firestore";

type FormDataType = {
  id: string;
  date: Date;
  value: string;
  name: string;
  memo: string;
};

const Main = () => {
  //파이어베이스 지갑 데이터
  const [wallet, setWallet] = useState<null | DocumentData[]>(null);
  const walletCollectionRef = collection(db, "wallet");

  //데이터 불러오기
  useEffect(() => {
    const getWallet = async () => {
      const data = await getDocs(walletCollectionRef);
      setWallet(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data);
    };
    getWallet();
  }, []);

  const { handleSubmit, register } = useForm<FormDataType>();

  const onSubmit = async (formData: FormDataType) => {
    await addDoc(walletCollectionRef, { ...formData });
    console.log("성공");
  };

  if (!wallet) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <FlexVer>
          <Input type="date" {...register("date")} />
          <Input placeholder="현재 지갑 금액" {...register("value")} />
          <Input placeholder="종목" {...register("name")} />
          <Input placeholder="메모" {...register("memo")} />
        </FlexVer>
        <div>
          <Button type="submit">확인</Button>
        </div>
        <div>
          {wallet.map((w) => {
            return <div key={w.id}>{w.name}</div>;
          })}
        </div>
      </form>
    </>
  );
};

export default Main;
