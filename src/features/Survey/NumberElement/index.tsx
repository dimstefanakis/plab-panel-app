import { useDispatch, useSelector } from 'react-redux';
import { NumberInput, NumberInputField, VStack } from '@chakra-ui/react';
import { Button } from '@/flat/Button';
import StickyBottom from '@/flat/StickyBottom';
import { setData } from '../surveySlice';
import { RootState } from '@/store';
import { PageProps } from '../interface';

interface NumberElementProps {
  element: any;
  onNextClick: () => void;
  onPreviousClick: () => void;
}

function NumberElement({ element, submitting, isLastPage, onNextClick, onPreviousClick }: PageProps) {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.survey);

  function onChange(valueAsString: string, valueAsNumber: number) {
    dispatch(setData({ ...data, [element.name]: valueAsString }));
  }

  return (
    <>
      <NumberInput value={data[element.name] || ''} onChange={onChange}>
        <NumberInputField />
      </NumberInput>
      <StickyBottom backgroundColor="bg.100">
        <VStack w="100%" bg="bg.100" borderRadius="md">
          <Button colorScheme="white" isLoading={submitting} onClick={onNextClick}>
            {isLastPage ? 'Submit' : 'Next'}
          </Button>
          <Button variant="outline" onClick={onPreviousClick}>
            Previous
          </Button>
        </VStack>
      </StickyBottom>
    </>
  );
}

export default NumberElement;
