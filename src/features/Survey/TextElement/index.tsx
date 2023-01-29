import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Input, VStack } from '@chakra-ui/react';
import { Button } from '@/flat/Button';
import StickyBottom from '@/flat/StickyBottom';
import { setData } from '../surveySlice';
import { RootState } from '@/store';
import { PageProps } from '../interface';

interface TextElementProps {
  element: any;
  onNextClick: () => void;
  onPreviousClick: () => void;
}

function TextElement({ element, submitting, isLastPage, onNextClick, onPreviousClick }: PageProps) {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.survey);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setData({ ...data, [element.name]: e.target.value }));
  }

  return (
    <>
      <Input value={data[element.name] || ''} onChange={onChange}></Input>
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

export default TextElement;
