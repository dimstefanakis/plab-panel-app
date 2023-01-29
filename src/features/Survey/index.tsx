import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Flex, Box, Progress, Heading, useToast } from "@chakra-ui/react";
import SingleChoiceElement from "./SingleChoiceElement";
import MultipleChoiceElement from "./MultipleChoiceElement";
import NumberElement from "./NumberElement";
import TextElement from "./TextElement";
import ImageElement from "./ImageElement";
import ContentElement from "./ContentElement";
import { submitAnswer } from "./surveySlice";
import { handleError } from "@/utils/errors";
import { useAppDispatch } from "@/store";
import { openSuccessModal } from "./SuccessModal/successModalSlice";
import { RootState } from "@/store";
import api from "@/core/api";

function Survey() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const { submitting, data } = useSelector((state: RootState) => state.survey);
  const [, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [page, setPage] = useState<any>(null);
  const [isLastPage, setIsLastPage] = useState(false);
  const [questions, setQuestions] = useState<any>([]);
  const [question, setQuestion] = useState<any>(null);

  function onNextClick() {
    // This is the element index, not the page number. Currently there is one element per page.
    const element = page.elements[0];
    if (element.isRequired && !data[page.name]) {
      toast({
        title:
          element.type === "image"
            ? "Please select an image"
            : "Please answer the question",
        position: "top",
        description: "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (isLastPage) {
      handleComplete();
    } else {
      setPageIndex(pageIndex + 1);
    }
  }

  function onPreviousClick() {
    setPageIndex(Math.max(0, pageIndex - 1));
  }

  function loadQuestionDetails(questionId: string) {
    setLoading(true);
    api
      .get(`question_detail/${questionId}/`)
      .then((res) => {
        const { data } = res;
        if (data) {
          setQuestion(data.question);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => setLoading(false));
  }

  function loadQuestionBySurvey() {
    setLoading(true);
    api
      .get(`get_questions_by_survey/${id}/`)
      .then((res) => {
        const { data } = res;
        if (data) {
          if (data.questions?.length) {
            const { questions, current_question_index: index } = data;
            loadQuestionDetails(questions[index].id);
            setQuestions(questions);
          }
        }
      })
      .catch((err) => {
        handleError(err);
        setLoading(false);
      });
  }

  const handleComplete = () => {
    const fileAnswers = Object.entries(data).filter(
      ([key, value]) =>
        Array.isArray(value) && value.length > 0 && value[0] instanceof File
    );
    const payload = new FormData();
    let imageIndex = 0;
    const fileAnswerData = fileAnswers.map(([key, value]: any) => {
      return [
        key,
        value.map((file: File) => {
          const result = imageIndex;
          payload.append("image", file);
          imageIndex += 1;
          return { image: result };
        }),
      ];
    });
    const payloadData = {
      question: {
        question_id: question?.id,
        answer_type: question?.answer_type,
        answer:
          fileAnswers.length > 0
            ? { ...data, ...Object.fromEntries(fileAnswerData) }
            : data,
      },
    };
    payload.append("data", JSON.stringify(payloadData));
    dispatch(
      submitAnswer({
        payload: payload,
        includesFiles: fileAnswers.length > 0,
      })
    )
      .unwrap()
      .then((response) => {
        if (response.status != "error" && !toast.isActive("surveySuccess")) {
          dispatch(openSuccessModal());
          // updates wallet balance
          // history.push("/app");
        } else {
          let pageErrors = response.errors;
          if (pageErrors) {
            pageErrors = Object.entries(pageErrors).map(([key, value]) => {
              return `${value}\n`;
            });
          }
          toast({
            title: "An error occurred",
            description: pageErrors || response.error.message,
            position: "top",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.warn(err);
        toast({
          title: "An error occurred",
          position: "top",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    loadQuestionBySurvey();
  }, []);

  useEffect(() => {
    if (question && question.survey_js) {
      setPage(question.survey_js.data.pages[pageIndex]);
    }
  }, [pageIndex, question]);

  useEffect(() => {
    if (page && pageIndex === question.survey_js.data.pages.length - 1) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [pageIndex, page, question]);

  return (
    <Box h="100%">
      <Flex flexFlow="column" h="100%" pb="100px">
        {question && (
          <Progress
            colorScheme="brandGreen"
            mb={6}
            borderRadius="full"
            value={(pageIndex / question.survey_js.data.pages.length) * 100}
          />
        )}
        {page && (
          <Page
            page={page}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            submitting={submitting}
            isLastPage={isLastPage}
            id={question?.id}
          />
        )}
      </Flex>
      {/* <MaxBalanceChecker reward={question?.reward} /> */}
    </Box>
  );
}

function Page({
  page,
  onNextClick,
  onPreviousClick,
  isLastPage,
  submitting,
  id,
}: {
  page: any;
  onNextClick: () => void;
  onPreviousClick: () => void;
  isLastPage: boolean;
  submitting: boolean;
  id: string;
}) {
  let element = page.elements[0];
  let type = element.type;

  return (
    <Flex flexFlow="column">
      <Heading
        fontSize={
          element.title.length > 30
            ? "md"
            : element.title.length > 20
            ? "xl"
            : "2xl"
        }
      >
        <ContentElement content={element.html} isBlock />
      </Heading>
      <Box my={10}>
        {type == "radiogroup" && (
          <SingleChoiceElement
            element={element}
            submitting={submitting}
            isLastPage={isLastPage}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
          />
        )}
        {type == "checkbox" && (
          <MultipleChoiceElement
            element={element}
            submitting={submitting}
            isLastPage={isLastPage}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
          />
        )}
        {type == "number" && (
          <NumberElement
            element={element}
            submitting={submitting}
            isLastPage={isLastPage}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
          />
        )}
        {type == "text" && (
          <TextElement
            element={element}
            submitting={submitting}
            isLastPage={isLastPage}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
          />
        )}
        {type == "image" && (
          <ImageElement
            element={element}
            submitting={submitting}
            isLastPage={isLastPage}
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            questionId={id}
          />
        )}
      </Box>
    </Flex>
  );
}

export default Survey;
