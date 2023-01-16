import { Text, Box, Flex, Center, Spinner } from "@chakra-ui/react";

const MySpinner = () => {
  return (
    <Center
      bg="blackAlpha.600"
      position="absolute"
      top="3rem"
      right={0}
      w="full"
      h="calc(100vh - 3rem)"
    >
      <Spinner size="xl" color="white" />
    </Center>
  );
};

export default MySpinner;
