import { Flex } from '@chakra-ui/react';

interface StickyBottomProps {
  children: JSX.Element;
  backgroundColor?: string;
  pb?: number;
}

function StickyBottom({ children, backgroundColor = 'transparent', pb = 12 }: StickyBottomProps) {
  return (
    <Flex position="fixed" bottom="0" left="0" w="100%" px={6} pb={pb} pt={0} bg={backgroundColor}>
      {children}
    </Flex>
  );
}

export default StickyBottom;
