import { useForm } from "react-hook-form";
import { db } from "src/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { Flex, Input, Button, Center } from "@chakra-ui/react";

type FormDataType = {
  date: Date;
  value: string;
  name: string;
  memo: string;
};

const Recording = () => {
  const walletCollectionRef = collection(db, "wallet");

  const { handleSubmit, register } = useForm<FormDataType>();

  //create
  const onSubmit = async (formData: FormDataType) => {
    await addDoc(walletCollectionRef, { ...formData });
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        <Flex alignItems="center">
          <Input type="date" {...register("date")} />
          <Input placeholder="현재 지갑 금액" {...register("value")} />
          <Input placeholder="종목" {...register("name")} />
          <Input placeholder="메모" {...register("memo")} />
          <Button type="submit">확인</Button>
        </Flex>
      </form>
    </>
  );
};

export default Recording;
