import { Button } from '@mui/material'

import { useQuestionsStore } from '../store/questionsStore';
import useQuestionsData from '../hooks/useQuestionsData';

export default function Footer() {
    const reset = useQuestionsStore(state => state.reset);
    
    const {correct, incorrect, unanswered} = useQuestionsData()

  return (
    <footer className='mt-4'>
        <strong>
            {`✅ ${correct} correctas - ❌${incorrect} incorrectas - ❗${unanswered} sin responder`}
        </strong>
        <div className='mt-4'>
            <Button onClick={()=> reset()}>
                Reset
            </Button> 
        </div>
    </footer>
  )
}

 