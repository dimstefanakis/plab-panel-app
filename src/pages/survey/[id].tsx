import { useRouter } from "next/router";
import Survey from "@/features/Survey";

export default function SurveyPage() {
  const router = useRouter();
  const { id } = router.query;

  return <>{id && <Survey id={id} />}</>;
}
