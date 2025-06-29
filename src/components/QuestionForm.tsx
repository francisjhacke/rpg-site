import React, { useState } from "react";
import { questions } from "../data/questions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

type QuestionFormProps = {
  onComplete: (answers: Record<string, any>) => void;
};

const QuestionForm: React.FC<QuestionFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const current = questions[step];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswers({ ...answers, [current.key]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  if (!current) return null;

  return (
    <div className="flex justify-center min-h-[60vh]">
      <div className="space-y-6 w-full max-w-md my-auto">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Question {step + 1} of {questions.length}
        </h2>
        <Label className="block mb-2">
          {current.question}
          {current.type === "text" ? (
            <Textarea
              value={answers[current.key] || ""}
              onChange={handleChange}
              className="mt-2"
            />
          ) : (
            <Input
              type={current.type}
              value={answers[current.key] || ""}
              onChange={handleChange}
              className="mt-2"
            />
          )}
        </Label>
        <Button onClick={handleNext} className="mt-4 w-full">
          {step < questions.length - 1 ? "Next" : "Finish"}
        </Button>
      </div>
    </div>
  );
};

export default QuestionForm;
