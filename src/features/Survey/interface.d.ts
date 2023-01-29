export interface PageProps {
  element: any;
  submitting: boolean;
  onNextClick: () => void;
  onPreviousClick: () => void;
  questionId?: string;
  isLastPage: boolean;
}
