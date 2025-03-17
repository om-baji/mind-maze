import Navbar from "@/components/Navbar";
import { QuizConfigForm } from "@/components/quiz/quiz-config-form";

export default function QuizConfigPage() {
  return (
    <Navbar>
      <div className="flex gap-4 items-center justify-center min-h-screen">
        <span className="text-lg text-gray-500">No Configs Saved!</span>
        <QuizConfigForm />
      </div>
    </Navbar>
  );
}
