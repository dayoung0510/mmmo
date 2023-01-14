import { Text, Box, Flex, Center, Spinner } from "@chakra-ui/react";

const MySpinner = () => {
  return (
    <Center
      bg="blackAlpha.600"
      position="absolute"
      top={0}
      right={0}
      w="full"
      h="full"
    >
      <Spinner size="xl" color="white" />
    </Center>
  );
};

export default MySpinner;
