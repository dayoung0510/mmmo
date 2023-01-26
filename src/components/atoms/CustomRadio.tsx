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
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    defaultValue: options[0],
  });

  const group = getRootProps();

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
