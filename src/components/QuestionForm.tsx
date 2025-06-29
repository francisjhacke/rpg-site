import React, { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import useStore from "../hooks/useStore";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./ui/carousel";

interface QuestionFormProps {
  onComplete?: (answers: Record<string, any>) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const setStats = useStore((state) => state.setStats);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  // Sync carousel when step changes
  useEffect(() => {
    if (carouselApi && typeof carouselApi.scrollTo === "function") {
      carouselApi.scrollTo(step);
    }
  }, [step, carouselApi]);

  // Sync step when carousel is swiped
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      const idx = carouselApi.selectedScrollSnap();
      setStep(idx);
    };
    carouselApi.on("select", onSelect);
    return () => carouselApi.off("select", onSelect);
  }, [carouselApi]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    setAnswers({ ...answers, [key]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStats(answers);
      if (onComplete) onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="flex justify-center min-h-[60vh]">
      <div className="space-y-8 w-full max-w-md my-auto bg-card/80 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-center text-primary">
          Character Creator
        </h2>
        <Carousel className="w-full" setApi={setCarouselApi} opts={{ containScroll: 'trimSnaps', skipSnaps: false }}>
          <CarouselContent>
            {questions.map((q, idx) => (
              <CarouselItem key={q.key}>
                <p className="text-muted-foreground text-center mb-4">
                  {`Step ${idx + 1} of ${questions.length}: ${q.question}`}
                </p>
                <Label className="block mb-2 w-full text-lg text-foreground">
                  {q.type === "text" ? (
                    <Textarea
                      value={answers[q.key] || ""}
                      onChange={e => handleChange(e, q.key)}
                      className="mt-2"
                      placeholder="Describe here..."
                    />
                  ) : (
                    <Input
                      type={q.type}
                      value={answers[q.key] || ""}
                      onChange={e => handleChange(e, q.key)}
                      className="mt-2"
                      placeholder={q.question}
                    />
                  )}
                </Label>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex gap-4 w-full mt-4 justify-center">
            <CarouselPrevious onClick={handlePrev} disabled={step === 0} />
            <Button onClick={handleNext} className="w-1/2 text-lg">
              {step < questions.length - 1 ? "Next" : "Finish & Begin Adventure"}
            </Button>
            <CarouselNext onClick={handleNext} disabled={step === questions.length - 1} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default QuestionForm;
