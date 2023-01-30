import { Box, Flex } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout(props: LayoutProps) {
  const { children, ...rest } = props;

  return (
    <Flex w="100%" justifyContent="center" alignItems="center">
      <Box w="100%" maxW="800px" px={10} py={10}>
        {children}
      </Box>
    </Flex>
  );
}

export default Layout;
