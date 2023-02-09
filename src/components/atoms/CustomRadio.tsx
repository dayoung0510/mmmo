import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "src/pages/Recording";
import {
  HStack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  Box,
  Center,
} from "@chakra-ui/react";

type CustomRadioProps = {
  options: string[];
  name: string;
};

type Props = {
  props: UseRadioProps;
  children?: React.ReactNode;
  colorScheme?: string;
};

const CustomRadio = ({ options, name }: CustomRadioProps) => {
  const [state, setState] = useState("");
  const { getRootProps, getRadioProps, onChange } = useRadioGroup({
    name,
    defaultValue: options[0],
    onChange: setState,
  });

  const group = getRootProps();

  const { setValue } = useFormContext<FormDataType>();

  //'거래'가 아닌 항목 선택 시, 레버리지 칸에 해당 텍스트 표시
  useEffect(() => {
    if (state === "입금") {
      setValue("leverage", "입금");
    } else if (state === "출금") {
      setValue("leverage", "출금");
    } else if (state === "청산") {
      setValue("leverage", "청산");
    }
  }, [state, setValue]);

  return (
    <HStack w="full" {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            colorScheme={name === "coin" ? "cyan" : "red"}
            props={{ ...radio }}
          >
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};

const RadioCard = ({ props, children, colorScheme = "blue" }: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Center
        {...checkbox}
        borderRadius="md"
        py={3}
        bg={`${colorScheme}.300`}
        color="white"
        _checked={{
          bg: `${colorScheme}.500`,
          color: "white",
        }}
      >
        {children}
      </Center>
    </Box>
  );
};

export default CustomRadio;
