import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { db } from "src/firebase-config";
import {
  collection,
  DocumentData,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Records = () => {
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

  if (!wallet) return <Center h="15rem">데이터를 불러올 수 없습니다.</Center>;

  return (
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
  );
};

export default Records;
