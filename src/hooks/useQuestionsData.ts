
import { useQuestionsStore } from '../store/questionsStore';


export default function useQuestionsData() {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  
  const questions = useQuestionsStore((state) => state.questions);

  questions.forEach((question) => {
    
    const {userSelectedAnswer, correctAnswer} = question;
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })
  
  return{
    correct,
    incorrect,
    unanswered
  }
}
