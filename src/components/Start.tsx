import { Button } from '@mui/material'

import { useQuestionsStore } from '../store/questionsStore'

export default function Start() {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

  const handleClick = ()=>{
    fetchQuestions(5);
  }


  return (
    <Button onClick={handleClick} variant='contained' sx={{ transition: '0.2s',}}>
        Start
    </Button>
  )
}
