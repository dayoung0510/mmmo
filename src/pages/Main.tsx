import { useForm } from "react-hook-form";
import { FlexVer } from "components/atoms/Divs";
import { Input } from "components/atoms/Inputs";
import { Button } from "components/atoms/Buttons";

type FormDataType = {
  date: string;
  currentValue: number;
  name: string;
  memo: string;
};

const Main = () => {
  const { handleSubmit, register } = useForm<FormDataType>();

  const onSubmit = (formData: FormDataType) => {
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexVer>
          <Input type="date" {...register("date")} />
          <Input placeholder="현재 지갑 금액" {...register("currentValue")} />
          <Input placeholder="종목" {...register("name")} />
          <Input placeholder="메모" {...register("memo")} />
        </FlexVer>
        <div>
          <Button type="submit">확인</Button>
        </div>
      </form>
    </>
  );
};

export default Main;
