import { Container, Stack, Typography } from "@mui/material";
import JavaScriptLogo from "./components/JavaScriptLogo";
import Start from "./components/Start";
import { useQuestionsStore } from "./store/questionsStore";
import Game from "./components/Game";

export default function App() {
  const questions = useQuestionsStore((state) => state.questions);
  


  return (
    <main className="w-full min-h-screen bg-zinc-900 text-slate-200 flex items-center justify-center">
      <Container  maxWidth="sm" sx={{ textAlign: "center" }}  >
          <Stack
            direction="row"
            gap={2}
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <JavaScriptLogo />
        <Typography variant="h2" component="h1">
            JavaScript Quizz
        </Typography>
          </Stack>

          {/* Transición del componente Start */}
        <div className={`transition-all duration-500 ${questions.length === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {questions.length === 0 && <Start />}
        </div>

        {/* Transición del componente Game */}
        <div className={`transition-all duration-500 ${questions.length > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {questions.length > 0 && <Game />}
        </div>
          
      </Container>
    </main>
  );
}
