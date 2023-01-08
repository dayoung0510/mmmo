import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlexVer } from "src/components/atoms/Divs";
import { Input } from "src/components/atoms/Inputs";
import { Button } from "src/components/atoms/Buttons";
import { db } from "src/firebase-config";
import {
  collection,
  DocumentData,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

type FormDataType = {
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
      setWallet(data.docs.map((d) => ({ ...d.data(), id: d.id })));
    };
    getWallet();
  }, [walletCollectionRef]);

  const { handleSubmit, register } = useForm<FormDataType>();

  //create
  const onSubmit = async (formData: FormDataType) => {
    await addDoc(walletCollectionRef, { ...formData });
  };

  //update
  const handleUpdate = async ({ id, name }: { id: string; name: string }) => {
    const walletDoc = doc(db, "wallet", id);
    const newFields = { name: `${name}(수정됨)` };
    await updateDoc(walletDoc, newFields);
  };

  //delete
  const handleDelete = async (id: string) => {
    const walletDoc = doc(db, "wallet", id);
    await deleteDoc(walletDoc);
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
            return (
              <div key={w.id}>
                {Date.parse(w.date)}
                {w.value} {w.name} {w.memo}
                <button
                  type="button"
                  onClick={() => handleUpdate({ id: w.id, name: w.name })}
                >
                  수정
                </button>
                <button type="button" onClick={() => handleDelete(w.id)}>
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
};

export default Main;
