import { useForm } from "react-hook-form";
import { Flex, Input, Button, Center } from "@chakra-ui/react";
import React, { useRef } from "react";

type FormDataType = {
  time: string;
  wallet: string;
  name: string;
  leverage: string;
  memo: string;
};

const getTime = () => {
  const date = new Date();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return month + "월" + day + "일 " + hours + ":" + minutes;
};

const Recording = () => {
  const { register, reset } = useForm<FormDataType>();

  const formRef = useRef(null!);

  const currentTime = getTime();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formRef.current);
    fetch(
      "https://script.google.com/macros/s/AKfycbzaa4Lcjam3g10dDVcTNfCIoyuyhSvfE2mICW_JA32wAZXzwqlPJsQ8OHjvHj4mgoUMFw/exec",
      { method: "POST", body: new FormData(formRef.current) }
    )
      .then((res) => {
        reset();
        console.log("SUCCESSFULLY SUBMITTED");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form method="post" ref={formRef} onSubmit={handleSubmit}>
        <Flex alignItems="center">
          <Input defaultValue={currentTime} {...register("time")} />
          <Input placeholder="현재 지갑 금액" {...register("wallet")} />
          <Input placeholder="종목" {...register("name")} />
          <Input placeholder="배율" {...register("leverage")} />
          <Input placeholder="메모" {...register("memo")} />
          <Button type="submit">확인</Button>
        </Flex>
      </form>
    </>
  );
};

export default Recording;
