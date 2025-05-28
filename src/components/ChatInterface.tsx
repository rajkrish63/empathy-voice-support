
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, AlertTriangle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  emotion?: "positive" | "negative" | "neutral" | "crisis";
  emotionScore?: number;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI mental health companion. I'm here to listen and support you. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
      emotion: "positive"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "can't go on"];

  const analyzeEmotion = (text: string): { emotion: "positive" | "negative" | "neutral" | "crisis", score: number } => {
    const lowerText = text.toLowerCase();
    
    // Crisis detection
    if (crisisKeywords.some(keyword => lowerText.includes(keyword))) {
      return { emotion: "crisis", score: 1.0 };
    }

    // Simple sentiment analysis (in real app, this would use NLP models)
    const positiveWords = ["happy", "good", "great", "wonderful", "amazing", "better", "grateful", "thankful"];
    const negativeWords = ["sad", "depressed", "anxious", "worried", "stressed", "angry", "frustrated", "hopeless"];

    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;

    if (positiveCount > negativeCount) {
      return { emotion: "positive", score: positiveCount / (positiveCount + negativeCount) };
    } else if (negativeCount > positiveCount) {
      return { emotion: "negative", score: negativeCount / (positiveCount + negativeCount) };
    }

    return { emotion: "neutral", score: 0.5 };
  };

  const generateAIResponse = (userMessage: string, emotion: string): string => {
    if (emotion === "crisis") {
      return "I'm really concerned about what you're sharing with me. Your life has value and there are people who want to help. Please consider reaching out to a crisis hotline: National Suicide Prevention Lifeline: 988. Would you like me to help you find local mental health resources?";
    }

    if (emotion === "negative") {
      const responses = [
        "I hear that you're going through a difficult time. Those feelings are valid, and it's okay to not be okay sometimes. Can you tell me more about what's troubling you?",
        "It sounds like you're dealing with some challenging emotions right now. I'm here to listen without judgment. What's been weighing on your mind?",
        "Thank you for sharing that with me. It takes courage to open up about difficult feelings. How long have you been experiencing this?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (emotion === "positive") {
      const responses = [
        "I'm so glad to hear that you're feeling positive! It's wonderful that you're taking time to check in with yourself. What's been contributing to these good feelings?",
        "That's great to hear! Positive moments are worth celebrating. How can we build on this feeling?",
        "I'm happy you're feeling well. It's important to acknowledge and appreciate these positive emotions."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Neutral responses
    const responses = [
      "I appreciate you sharing that with me. Can you tell me more about how you've been feeling lately?",
      "Thank you for opening up. What's been on your mind today?",
      "I'm here to listen. Is there anything specific you'd like to talk about?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date()
    };

    // Analyze emotion
    const { emotion, score } = analyzeEmotion(userMessage.content);
    userMessage.emotion = emotion;
    userMessage.emotionScore = score;

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Show crisis alert if detected
    if (emotion === "crisis") {
      toast({
        title: "Crisis Detected",
        description: "We've detected you may be in distress. Please reach out for immediate help.",
        variant: "destructive",
      });
    }

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content, emotion),
        sender: "ai",
        timestamp: new Date(),
        emotion: "neutral"
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getEmotionColor = (emotion?: string) => {
    switch (emotion) {
      case "positive": return "text-green-600";
      case "negative": return "text-red-600";
      case "crisis": return "text-red-800";
      default: return "text-gray-600";
    }
  };

  const getEmotionIcon = (emotion?: string) => {
    switch (emotion) {
      case "crisis": return <AlertTriangle className="w-4 h-4 text-red-800" />;
      case "positive": return <Heart className="w-4 h-4 text-green-600" />;
      default: return null;
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <Card className="flex-1 bg-white/60 backdrop-blur-sm border-blue-100">
        <div className="p-4 border-b border-blue-100">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">AI Mental Health Companion</h3>
            <div className="flex-1" />
            <div className="text-sm text-gray-500">
              {isTyping && "AI is typing..."}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4" style={{ height: "calc(100% - 140px)" }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === "ai" && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                    {message.sender === "user" && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.emotion && message.sender === "user" && (
                          <div className="flex items-center space-x-1">
                            {getEmotionIcon(message.emotion)}
                            <span className={`text-xs ${getEmotionColor(message.emotion)}`}>
                              {message.emotion}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-blue-100">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts and feelings..."
              className="flex-1 border-blue-200 focus:ring-blue-500"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            All conversations are confidential and encrypted for your privacy.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
