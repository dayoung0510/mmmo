import { useForm, FormProvider } from "react-hook-form";
import { Textarea, Box, Input, Button, VStack, HStack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import MySpinner from "src/components/atoms/MySpinner";
import CustomRadio from "src/components/atoms/CustomRadio";
import { getTime, getDate } from "src/utils";
import { useRecordContext } from "src/App";

export type FormDataType = {
  date: string;
  time: string;
  type: string;
  start: string;
  end: string;
  coin: string;
  leverage: string;
  memo: string;
};

const Recording = () => {
  const methods = useForm<FormDataType>();
  const { register, reset, setValue } = methods;

  const formRef = useRef(null!);
  const currentDate = getDate();
  const currentTime = getTime();

  //라디오들
  const types = ["거래", "출금", "입금", "청산"];
  const coins = ["BTC", "ETH", "etc..."];

  const { state, dispatch } = useRecordContext();

  //마지막 종료가 존재하면 시작가 디폴트값으로 넣어주기
  useEffect(() => {
    if (!state.loading && state.body.length !== 0) {
      const lastEndPrice = state.body[state.body.length - 1][4];
      setValue("start", lastEndPrice);
    }
  }, [state.body, setValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", loading: true });
    fetch(import.meta.env.VITE_SPREADSHEET_API, {
      method: "POST",
      body: new FormData(formRef.current),
    })
      .then((res) => {
        reset();
        dispatch({ type: "SET_LOADING", loading: false });
      })
      .catch((err) => {
        alert(err);
        dispatch({ type: "SET_LOADING", loading: false });
      });
  };

  if (state.loading) return <MySpinner />;

  return (
    <Box p={{ base: 2, md: 4 }}>
      <FormProvider {...methods}>
        <form method="post" ref={formRef} onSubmit={handleSubmit}>
          <VStack alignItems="center" gap={4} mt={4}>
            <HStack w="full" gap={2}>
              <Input defaultValue={currentDate} {...register("date")} />
              <Input defaultValue={currentTime} {...register("time")} />
            </HStack>

            <CustomRadio name="type" options={types} />
            <CustomRadio name="coin" options={coins} />

            <HStack gap={2}>
              <Input placeholder="배율" {...register("leverage")} />
              <Input placeholder="시작가" {...register("start")} />
              <Input placeholder="종료가" {...register("end")} />
            </HStack>

            <Textarea placeholder="메모" {...register("memo")} />
            <Button type="submit">확인</Button>
          </VStack>
        </form>
      </FormProvider>
    </Box>
  );
};

export default Recording;
