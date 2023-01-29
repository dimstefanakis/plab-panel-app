import { useSelector, useDispatch } from 'react-redux';
import { Modal, ModalBody, ModalContent, Text, Flex } from '@chakra-ui/react';
import { RootState } from '../../../../store';
import { closeSuccessModal } from './successModalSlice';
import Lottie from 'lottie-react';
import confetti from './lottie/confetti.json';

function SuccessModal() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.successModal);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(closeSuccessModal());
      }}
      isCentered
      size="full"
    >
      <ModalContent
        onClick={() => {
          dispatch(closeSuccessModal());
        }}
        bg="#435ff4"
        border="none"
        boxShadow="none"
        p={0}
        w="100%"
        h="100%"
        maxW="100%"
        maxH="100%"
        overflow="hidden"
      >
        <ModalBody w="100%" h="100%" maxW="100%" maxH="100%" overflow="hidden">
          <Flex h="100%" w="100%" flexFlow="column" justifyContent="center" alignItems="center">
            <Lottie animationData={confetti} loop />
            <Text flex="1" mt={8} mx={2} fontSize="xl" fontWeight="semibold" textAlign="center">
              Task complete! Check your wallet for any rewards!
            </Text>
            <Text mb={10} mx={4} fontSize="lg" textAlign="center">
              Tap anywhere to continue
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SuccessModal;
