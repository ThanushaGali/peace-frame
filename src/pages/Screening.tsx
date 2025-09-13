import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, ArrowLeft, ArrowRight, Download, Calendar, Phone, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import screeningData from "@/mock-data/screening.json";

interface Answer {
  questionId: number;
  value: number;
}

interface TestResult {
  score: number;
  level: string;
  color: string;
  description: string;
}

const Screening = () => {
  const [currentTest, setCurrentTest] = useState<'selection' | 'phq9' | 'gad7' | 'results'>('selection');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [results, setResults] = useState<{ phq9?: TestResult; gad7?: TestResult }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const getCurrentTestData = () => {
    return currentTest === 'phq9' ? screeningData.phq9 : screeningData.gad7;
  };

  const calculateScore = (testType: 'phq9' | 'gad7', testAnswers: Answer[]): TestResult => {
    const score = testAnswers.reduce((sum, answer) => sum + answer.value, 0);
    const testData = testType === 'phq9' ? screeningData.phq9 : screeningData.gad7;
    
    const range = testData.scoring.ranges.find(
      range => score >= range.min && score <= range.max
    );

    return {
      score,
      level: range?.level || 'Unknown',
      color: range?.color || 'muted',
      description: range?.description || 'Unable to determine severity level.'
    };
  };

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswer: Answer = {
      questionId: currentQuestionIndex + 1,
      value: selectedAnswer
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    const testData = getCurrentTestData();
    
    if (currentQuestionIndex < testData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Test completed
      const result = calculateScore(currentTest as 'phq9' | 'gad7', updatedAnswers);
      setResults(prev => ({ ...prev, [currentTest]: result }));
      
      if (currentTest === 'phq9') {
        // Move to GAD-7
        setCurrentTest('gad7');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSelectedAnswer(null);
      } else {
        // Both tests completed
        setCurrentTest('results');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const previousAnswer = answers[currentQuestionIndex - 1];
      setSelectedAnswer(previousAnswer?.value || null);
      setAnswers(answers.slice(0, -1));
    }
  };

  const startTest = (testType: 'phq9' | 'gad7') => {
    setCurrentTest(testType);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults({});
  };

  const restartScreening = () => {
    setCurrentTest('selection');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setResults({});
  };

  const exportResults = () => {
    const resultsText = `
Mental Health Screening Results
Generated on: ${new Date().toLocaleDateString()}

${results.phq9 ? `
PHQ-9 Depression Screening:
Score: ${results.phq9.score}/27
Level: ${results.phq9.level}
${results.phq9.description}
` : ''}

${results.gad7 ? `
GAD-7 Anxiety Screening:
Score: ${results.gad7.score}/21
Level: ${results.gad7.level}
${results.gad7.description}
` : ''}

Important Note: This screening is not a diagnosis. Please consult with a mental health professional for proper evaluation and treatment.
    `;

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mental-health-screening-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Test Selection Screen
  if (currentTest === 'selection') {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-dark mb-4">Mental Health Screening</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a confidential assessment to better understand your mental health. These validated screening tools can help identify symptoms of depression and anxiety.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Complete Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Take both PHQ-9 (depression) and GAD-7 (anxiety) screenings for a comprehensive assessment.
              </p>
              <Button 
                onClick={() => startTest('phq9')} 
                className="w-full bg-gradient-primary hover:opacity-90 text-white"
              >
                Start Complete Assessment
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Takes about 5-8 minutes</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-healing rounded-xl flex items-center justify-center mb-4">
                <ClipboardCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl">Individual Tests</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-3">
              <p className="text-muted-foreground mb-4">
                Choose to take one specific screening tool.
              </p>
              <Button 
                onClick={() => startTest('phq9')} 
                variant="outline" 
                className="w-full"
              >
                PHQ-9 (Depression)
              </Button>
              <Button 
                onClick={() => startTest('gad7')} 
                variant="outline" 
                className="w-full"
              >
                GAD-7 (Anxiety)
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary-light border-0">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-secondary-dark mb-2">Important Information</h3>
            <ul className="text-sm text-muted-foreground space-y-1 max-w-2xl mx-auto text-left">
              <li>• This screening is completely confidential and anonymous</li>
              <li>• Results are not stored unless you choose to save them</li>
              <li>• These tools are for screening purposes only, not diagnosis</li>
              <li>• If you're in crisis, please call 988 or visit your nearest emergency room</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Screen
  if (currentTest === 'results') {
    const hasHighRisk = (results.phq9?.level.includes('Severe') || results.gad7?.level.includes('Severe'));
    const needsAttention = (
      results.phq9?.level.includes('Moderate') || 
      results.gad7?.level.includes('Moderate') ||
      hasHighRisk
    );

    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-dark mb-4">Your Screening Results</h1>
          <p className="text-muted-foreground">
            Here are your confidential screening results. Remember, these are screening tools, not diagnostic instruments.
          </p>
        </div>

        {hasHighRisk && (
          <Alert className="mb-6 border-destructive bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="font-medium">Your results suggest you may benefit from immediate professional support.</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    <Phone className="w-4 h-4 mr-1" />
                    Crisis Line: 988
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/chat">Talk to AI</Link>
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {results.phq9 && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  PHQ-9 Depression Screening
                  <Badge variant={results.phq9.color === 'healing-green' ? 'default' : 'destructive'}>
                    {results.phq9.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-secondary-dark mb-2">
                    {results.phq9.score}/27
                  </div>
                  <p className="text-muted-foreground">{results.phq9.description}</p>
                </div>
                <Progress 
                  value={(results.phq9.score / 27) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          )}

          {results.gad7 && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  GAD-7 Anxiety Screening
                  <Badge variant={results.gad7.color === 'healing-green' ? 'default' : 'destructive'}>
                    {results.gad7.level}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-secondary-dark mb-2">
                    {results.gad7.score}/21
                  </div>
                  <p className="text-muted-foreground">{results.gad7.description}</p>
                </div>
                <Progress 
                  value={(results.gad7.score / 21) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recommendations */}
        <Card className="mb-6 shadow-medium">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {needsAttention && (
                <Button asChild className="bg-gradient-primary hover:opacity-90 text-white">
                  <Link to="/booking">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Counselor
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link to="/resources">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  Self-Help Resources
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/chat">
                  <ClipboardCheck className="w-4 h-4 mr-2" />
                  AI Support Chat
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={exportResults} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
          <Button onClick={restartScreening} variant="outline">
            Retake Screening
          </Button>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Question Screen
  const testData = getCurrentTestData();
  const currentQuestion = testData.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / testData.questions.length) * 100;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-secondary-dark">{testData.title}</h1>
          <Badge variant="outline">
            {currentQuestionIndex + 1} of {testData.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.text}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{testData.description}</p>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswer?.toString()} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            className="space-y-4"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value.toString()} id={option.value.toString()} />
                <Label 
                  htmlFor={option.value.toString()} 
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="bg-gradient-primary hover:opacity-90 text-white"
            >
              {currentQuestionIndex === testData.questions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Screening;