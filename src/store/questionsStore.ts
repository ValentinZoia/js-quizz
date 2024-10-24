import {create} from "zustand";
import {type Question} from "../types/types";
import confetti from 'canvas-confetti'


interface State  {
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number ) => void
    selectAnswer: (questionId: number, answerIndex: number) => void
}


export const useQuestionsStore = create<State>((set, get) => ({
    questions: [],
    currentQuestion:0,
    fetchQuestions: async (limit: number) => {
        const response = await fetch(`http://localhost:5173/data.json`);
        const data = await response.json();
        
        const questions = data.sort(() => Math.random() - 0.5).slice(0, limit);
        
        set({questions})
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
        const {questions} = get();
        console.log(questionId, answerIndex);
        //usar el structuredClone para crear el objeto
        const newQuestions = structuredClone(questions);

        //encontramos el indice de la pregunta
        const index = newQuestions.findIndex((question) => question.id === questionId);
        
        //obtener la pregunta actual y larespuesta correcta
        const questionCurrent = newQuestions[index];
        const correctAnswer = questionCurrent.correctAnswer;
        
        //verificamos si la respuesta es correcta
        const isCorrectUserAnswer = answerIndex === correctAnswer;
        
        //lanzar confetti si es correcta
        if(isCorrectUserAnswer) confetti();

        //cambiar esta info en la copia de la pregunta
        newQuestions[index] ={
            ...questionCurrent,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex
        };
        //actualiza el estado
        set({questions: newQuestions});
        }

        
        
    }
));