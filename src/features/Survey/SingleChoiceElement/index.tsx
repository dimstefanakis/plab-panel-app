import { useDispatch, useSelector } from 'react-redux';
import { Radio, RadioGroup, Flex, VStack } from '@chakra-ui/react';
import { Button } from '@/flat/Button';
import StickyBottom from '@/flat/StickyBottom';
import ContentElement from '../ContentElement';
import { setData } from '../surveySlice';
import { RootState } from '@/store';
import { PageProps } from '../interface';

function SingleChoiceElement({ element, submitting, isLastPage, onNextClick, onPreviousClick }: PageProps) {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.survey);

  function onChange(value: string) {
    dispatch(setData({ ...data, [element.name]: value }));
  }

  return (
    <>
      <RadioGroup colorScheme="brandGreen" value={data[element.name] || ''} onChange={onChange}>
        <VStack alignItems="baseline">
          {element.choices.map((choice: any, index: number) => {
            return (
              <Flex
                key={choice.value}
                backgroundColor="bg.200"
                w="100%"
                borderRadius="md"
                py={3}
                px={4}
              >
                <Radio
                  key={choice.value}
                  h="50"
                  w="100%"
                  size="md"
                  value={choice.value}
                >
                  <ContentElement content={choice.html} />
                </Radio>
              </Flex>
            );
          })}
        </VStack>
      </RadioGroup>
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

export default SingleChoiceElement;
