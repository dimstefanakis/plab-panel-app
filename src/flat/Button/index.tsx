import { Button as ChakraButton } from '@chakra-ui/react';
import { ButtonProps as ChakraButtonProps } from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {}

function Button(props: ButtonProps) {
  function handleClick(e: any) {
    if (props.onClick) {
      props.onClick(e);
    }
  }

  return (
    <ChakraButton w="100%" {...props} onClick={handleClick}>
      {props.children}
    </ChakraButton>
  );
}

export { Button };
