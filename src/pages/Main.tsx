import { useForm } from 'react-hook-form';
import { FlexVer } from 'components/atoms/Divs';
import { Input } from 'components/atoms/Inputs';
import { Button } from 'components/atoms/Buttons';

type FormDataType = {
  date: string;
  time: string;
  wallet: string;
  name: string;
  memo: string;
};

const Main = () => {
  const { handleSubmit, register } = useForm<FormDataType>();

  const onSubmit = async (formData: FormDataType) => {
    try {
      const res = await fetch(
        'https://sheet.best/api/sheets/9005c4be-feec-4fe7-bdc0-89ac72469237',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        console.log('성공');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexVer>
          <Input type='date' {...register('date')} />
          <Input placeholder='현재 지갑 금액' {...register('wallet')} />
          <Input placeholder='시간' {...register('time')} />
          <Input placeholder='종목' {...register('name')} />
          <Input placeholder='메모' {...register('memo')} />
        </FlexVer>
        <div>
          <Button type='submit'>확인</Button>
        </div>
      </form>
    </>
  );
};

export default Main;
