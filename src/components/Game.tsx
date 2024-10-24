import { type Question as QuestionType } from "../types/types";
import { useQuestionsStore } from "../store/questionsStore";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import HeaderMac from "./HeaderMac";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
    console.log(index, correctAnswer, userSelectedAnswer)
  if (userSelectedAnswer == null) return "transparent";

  if (index !== correctAnswer && userSelectedAnswer === index)
    return "red";

  if (index === correctAnswer) return "green";

  if (index === userSelectedAnswer) return "red";
  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const handleClick = (questionId: number, answerIndex: number) => {
    selectAnswer(questionId, answerIndex);
  };
  console.log(info.userSelectedAnswer)
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 600,
          margin: "20px auto",
          borderRadius: 4,
          boxShadow: 3,
          backgroundColor: "transparent",
          border: "1px solid #ffa",
          textAlign: "left",
        }}
      >
        <CardContent>
          {/* Pregunta */}
          <Typography variant="h5" gutterBottom>
            {info.question}
          </Typography>

          {/* Bloque de código */}
          <Stack direction={"column"}>
            <HeaderMac />
            <SyntaxHighlighter
              language="javascript"
              style={atomOneDark}
              customStyle={{
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
            >
              {info.code}
            </SyntaxHighlighter>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Respuestas */}
          <List sx={{ bgcolor: "#222" }} disablePadding>
            {info.answers.map((answer, index) => (
              <ListItem
                key={index}
                disablePadding
                divider
                sx={{ bgcolor: getBackgroundColor(info, index) }}
              >
                <ListItemButton onClick={() => handleClick(info.id, index)} disabled={info.userSelectedAnswer !== undefined}>
                  <ListItemText primary={answer} sx={{ textAlign: "center" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </>
  );
};

export default function Game() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
}
