import { Flex } from "@chakra-ui/react";

interface StickyBottomProps {
  children: JSX.Element;
  backgroundColor?: string;
  pb?: number;
}

function StickyBottom({
  children,
  backgroundColor = "transparent",
  pb = 12,
}: StickyBottomProps) {
  return (
    <Flex
      position="fixed"
      justifyContent="center"
      bottom="0"
      left="0"
      w="100%"
      pb={pb}
      pt={0}
      bg={backgroundColor}
    >
      <Flex px={10} maxW="800px" w="100%">
        {children}
      </Flex>
    </Flex>
  );
}

export default StickyBottom;
