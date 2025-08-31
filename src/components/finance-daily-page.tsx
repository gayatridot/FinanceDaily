"use client";

import { useState, useEffect, useMemo } from 'react';
import { Lightbulb, BrainCircuit, Trophy, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { dailyFinancialTips, topicIcons } from '@/lib/data';
import type { FinancialTip } from '@/lib/data';
import { summarizeUserScores } from '@/ai/flows/summarize-user-scores';
import { AnimatedCounter } from '@/components/animated-counter';

type QuizScore = {
  date: string;
  score: number;
  topic: string;
};

export default function FinanceDailyPage() {
  const { toast } = useToast();

  const [currentTip, setCurrentTip] = useState<FinancialTip | null>(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const storedPoints = localStorage.getItem('totalPoints');
    if (storedPoints) {
      setTotalPoints(JSON.parse(storedPoints));
    }
    const storedScores = localStorage.getItem('quizScores');
    if (storedScores) {
      setQuizScores(JSON.parse(storedScores));
    }
    const storedSubmittedDate = localStorage.getItem('quizSubmittedDate');

    const today = new Date().toDateString();
    if (storedSubmittedDate === today) {
        setQuizSubmitted(true);
    }
    
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % dailyFinancialTips.length;
    setCurrentTip(dailyFinancialTips[tipIndex]);

  }, []);

  const TipIcon = useMemo(() => {
    if (!currentTip) return Lightbulb;
    return topicIcons[currentTip.topic] || Lightbulb;
  }, [currentTip]);
  
  const handleQuizSubmit = () => {
    if (selectedAnswer === null || !currentTip) return;

    const selectedIndex = parseInt(selectedAnswer, 10);
    const isCorrect = selectedIndex === currentTip.quiz.correctAnswerIndex;
    
    let newPoints = totalPoints;
    if (isCorrect) {
      newPoints += currentTip.quiz.points;
      setTotalPoints(newPoints);
      toast({
        title: 'Correct!',
        description: `You've earned ${currentTip.quiz.points} points.`,
      });
    } else {
      toast({
        title: 'Incorrect',
        description: "Don't worry, try again tomorrow!",
        variant: 'destructive',
      });
    }
    
    const newScore: QuizScore = {
      date: new Date().toISOString().split('T')[0],
      score: isCorrect ? currentTip.quiz.points : 0,
      topic: currentTip.topic,
    };
    const newScores = [...quizScores, newScore];
    setQuizScores(newScores);

    localStorage.setItem('totalPoints', JSON.stringify(newPoints));
    localStorage.setItem('quizScores', JSON.stringify(newScores));
    localStorage.setItem('quizSubmittedDate', new Date().toDateString());

    setQuizSubmitted(true);
    setSelectedAnswer(null);
  };

  const handleGetSummary = async () => {
    if (quizScores.length === 0) {
      toast({
        title: 'Not enough data',
        description: 'Take a few quizzes first to get your performance summary.',
      });
      return;
    }
    setIsLoadingSummary(true);
    setSummary(null);
    try {
      const result = await summarizeUserScores(quizScores);
      setSummary(result.summary);
    } catch (error) {
      console.error('Error getting summary:', error);
      toast({
        title: 'Error',
        description: 'Could not generate summary. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingSummary(false);
    }
  };

  if (!isClient || !currentTip) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
            Finance Daily
          </h1>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-lg font-bold text-primary">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <AnimatedCounter value={totalPoints} />
            <span className="text-sm font-medium">Points</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <Card className="overflow-hidden shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4 bg-card p-4 md:p-6">
              <div className="rounded-full bg-accent/20 p-3">
                <TipIcon className="h-8 w-8 text-accent" />
              </div>
              <div>
                <CardTitle className="font-headline text-xl md:text-2xl">Today's Financial Tip</CardTitle>
                <CardDescription className="text-base">{currentTip.topic}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 md:p-6 text-lg">
              <p>{currentTip.tip}</p>
            </CardContent>
          </Card>

          <Card className="shadow-md transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-xl md:text-2xl">
                <BrainCircuit className="h-7 w-7 text-primary" />
                Daily Quiz
              </CardTitle>
              <CardDescription>Test your knowledge and earn points!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="font-semibold text-base">{currentTip.quiz.question}</p>
                <RadioGroup
                  value={selectedAnswer ?? undefined}
                  onValueChange={setSelectedAnswer}
                  disabled={quizSubmitted}
                >
                  {currentTip.quiz.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={String(index)} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {quizSubmitted ? (
                    <p className="text-center font-medium text-primary p-3 bg-primary/10 rounded-md">
                        You've completed today's quiz. Come back tomorrow for a new tip!
                    </p>
                ) : (
                    <Button onClick={handleQuizSubmit} disabled={!selectedAnswer} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        Submit Answer
                    </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="summary" className="border-b-0">
              <Card className="shadow-md transition-shadow hover:shadow-lg">
                <AccordionTrigger className="text-lg font-medium hover:no-underline px-6 py-4">
                  My Performance Summary
                </AccordionTrigger>
                <AccordionContent className="pt-0 p-6">
                  {summary && !isLoadingSummary && (
                    <div className="space-y-4 rounded-md border bg-card p-4 text-base">
                      <h4 className="font-semibold">Your AI-powered Analysis:</h4>
                      <p className="whitespace-pre-wrap leading-relaxed">{summary}</p>
                    </div>
                  )}
                  {isLoadingSummary && (
                      <div className="flex items-center justify-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <p className="ml-4 text-muted-foreground">Generating your summary...</p>
                      </div>
                  )}
                  {!summary && !isLoadingSummary && (
                      <p className="text-muted-foreground text-center p-4">
                          {quizScores.length > 0 ? "Click below to generate a summary of your scores." : "Take some quizzes to see your performance summary here."}
                      </p>
                  )}
                  <Button onClick={handleGetSummary} disabled={isLoadingSummary || quizScores.length === 0} className="mt-4 w-full">
                    {isLoadingSummary ? 'Generating...' : 'Generate My Summary'}
                  </Button>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <footer className="py-6 mt-8 border-t bg-background">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Finance Daily. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
