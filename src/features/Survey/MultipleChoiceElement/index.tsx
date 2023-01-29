import { useSelector, useDispatch } from 'react-redux';
import { Checkbox, CheckboxGroup, Flex, VStack } from '@chakra-ui/react';
import { Button } from "@/flat/Button";
import StickyBottom from '@/flat/StickyBottom';
import ContentElement from '../ContentElement';
import { setData } from '../surveySlice';
import { RootState } from '@/store';
import { PageProps } from '../interface';

function MultipleChoiceElement({ element, submitting, isLastPage, onNextClick, onPreviousClick }: PageProps) {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.survey);

  function onChange(value: string[]) {
    dispatch(setData({ ...data, [element.name]: value.join(';') }));
  }

  function getData() {
    if (data[element.name]) {
      return data[element.name].split(';');
    } else {
      return [];
    }
  }

  return (
    <>
      <CheckboxGroup colorScheme="brandGreen" value={getData()} onChange={onChange}>
        <VStack alignItems="baseline">
          {element.choices.map((choice: any, index: number) => {
            return (
              <Flex key={choice.value} backgroundColor="bg.200" w="100%" borderRadius="md" py={3} px={4}>
                <Checkbox h="50" w="100%" size="md" value={choice.value}>
                  <ContentElement content={choice.html} />
                </Checkbox>
              </Flex>
            );
          })}
        </VStack>
      </CheckboxGroup>
      <StickyBottom backgroundColor='bg.100'>
        <VStack w="100%" bg="bg.100" borderRadius="md">
          <Button isLoading={submitting} colorScheme="white" onClick={onNextClick}>
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

export default MultipleChoiceElement;
