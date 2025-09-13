import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Send, Bot, User, AlertTriangle, Phone, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isCrisis?: boolean;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Crisis keywords for detection
  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm', 
    'want to die', 'better off dead', 'no point living', 'hopeless',
    'cutting', 'overdose', 'jump', 'hanging'
  ];

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('mindSupport_chatHistory');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: "Hello! I'm your AI mental health companion. I'm here to listen and provide support. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mindSupport_chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Check for crisis keywords
  const checkForCrisis = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  // Generate bot response
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Crisis responses
    if (checkForCrisis(userMessage)) {
      return "I'm very concerned about what you've shared. Your life has value and there are people who want to help. Please consider reaching out to a crisis helpline immediately at 988, or if you're in immediate danger, call 911. Would you like me to help you find local resources or schedule an appointment with a counselor?";
    }

    // Anxiety responses
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried')) {
      return "I hear that you're feeling anxious. That's a very common experience, especially for college students. Try this breathing exercise: Breathe in for 4 counts, hold for 4, breathe out for 6. Repeat this 4 times. What specific situation is making you feel anxious?";
    }

    // Depression responses
    if (lowerMessage.includes('depressed') || lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling this way. Depression can make everything feel overwhelming, but please know that these feelings can improve with support. Small steps like getting some sunlight, gentle exercise, or talking to someone can help. Have you been able to maintain your daily routines?";
    }

    // Stress responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed') || lowerMessage.includes('pressure')) {
      return "Stress is your body's natural response to challenges, but too much can be harmful. Let's break this down - what's the main source of your stress right now? Sometimes creating a priority list and tackling one thing at a time can help make things feel more manageable.";
    }

    // Sleep issues
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired')) {
      return "Sleep problems are very common among students. Good sleep hygiene can really help: try to go to bed at the same time each night, avoid screens 1 hour before bed, and create a relaxing bedtime routine. What's your current sleep pattern like?";
    }

    // Relationship issues
    if (lowerMessage.includes('relationship') || lowerMessage.includes('friend') || lowerMessage.includes('family')) {
      return "Relationships can be both a source of support and stress. It's important to communicate openly and set healthy boundaries. What specific relationship challenge are you facing? Remember, healthy relationships should make you feel supported, not drained.";
    }

    // Academic stress
    if (lowerMessage.includes('exam') || lowerMessage.includes('study') || lowerMessage.includes('grade') || lowerMessage.includes('school')) {
      return "Academic pressure is one of the top stressors for college students. Remember that your worth isn't defined by your grades. Try breaking study sessions into 25-minute focused blocks with 5-minute breaks. What subject or exam is causing you the most stress?";
    }

    // General supportive responses
    const supportiveResponses = [
      "Thank you for sharing that with me. It takes courage to talk about what you're going through. Can you tell me more about how this is affecting your daily life?",
      "I'm here to listen without judgment. Your feelings are valid, and it's okay to not be okay sometimes. What would be most helpful for you right now?",
      "It sounds like you're dealing with a lot. Remember that seeking help is a sign of strength, not weakness. What kind of support do you think would be most beneficial?",
      "I appreciate you trusting me with this. Everyone's mental health journey is unique. What coping strategies have you tried before, if any?",
      "Your wellbeing matters. Sometimes just talking about what we're going through can provide some relief. How long have you been feeling this way?"
    ];

    return supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Check for crisis
    if (checkForCrisis(inputValue)) {
      setShowCrisisAlert(true);
    }

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
        isCrisis: checkForCrisis(inputValue)
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('mindSupport_chatHistory');
    setShowCrisisAlert(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary-dark mb-2">AI Mental Health Support</h1>
        <p className="text-muted-foreground">
          Get immediate, confidential support from our AI counselor trained in evidence-based therapeutic approaches.
        </p>
      </div>

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <Alert className="mb-6 border-destructive bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive font-medium">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span>Crisis detected. Please get immediate help if you're in danger.</span>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive">
                  <Phone className="w-4 h-4 mr-1" />
                  Call 988
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/booking">
                    <Calendar className="w-4 h-4 mr-1" />
                    Book Counselor
                  </Link>
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col shadow-medium">
        <CardHeader className="border-b bg-gradient-surface rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">MindSupport AI</CardTitle>
                <p className="text-sm text-muted-foreground">Always here to listen</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat}>
              Clear Chat
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-gradient-healing'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : `bg-muted ${message.isCrisis ? 'border-l-4 border-l-destructive' : ''}`
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p
                        className={`text-xs mt-2 opacity-70 ${
                          message.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-healing flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4 bg-gradient-surface">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... Press Enter to send"
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This AI provides support but is not a replacement for professional help.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;