import { useState, useRef, KeyboardEvent } from "react";
import { Send, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications } from "@/utils/mockData";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  isCard?: boolean;
  cards?: Array<{
    id: string;
    description: string;
    dueDate: Date;
    tireModelName: string;
    status: string;
  }>;
}

interface ChatDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ChatDrawer({ isOpen, setIsOpen }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello Jane! How can I help you with your certifications today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(input);
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date(),
        isCard: response === "OVERDUE_CARDS",
        cards: response === "OVERDUE_CARDS" 
            ? certifications
              .filter(obl => obl.status === "overdue")
              .map(obl => ({
                id: obl.id,
                description: obl.description,
                dueDate: obl.dueDate,
                tireModelName: obl.tireModelName,
                status: obl.status
              }))
          : undefined
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Helper function to generate mock AI responses
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("certification") && input.includes("sync")) {
      return "I've checked the ERP system. All certifications are currently synchronized. The last sync was completed 10 minutes ago.";
    } else if (input.includes("overdue")) {
      return "OVERDUE_CARDS";
    } else if (input.includes("performance") || input.includes("sla")) {
      return "Currently tracking 12 SLAs across vendor certifications. All performance metrics are within acceptable ranges except for the Cloud Storage Provider which is showing 98.7% uptime (target: 99.9%).";
    } else {
      return "I can help you to understand product catalogues, track certifications, or monitor performance measurements. What specific information would you like me to provide?";
    }
  };

  return (
    <div
      className={cn(
        "fixed right-0 top-0 bottom-0 w-96 bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300 ease-in-out z-50",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Header */}
      <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-[#083264] text-white">H</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="text-sm font-medium">AI Agent</p>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-8rem)]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-2",
              message.isUser ? "justify-end" : "justify-start"
            )}
          >
            {!message.isUser && (
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-[#083264] text-white">H</AvatarFallback>
              </Avatar>
            )}
            {message.isCard && message.cards ? (
              <div className="space-y-4">
                {message.cards.map((card) => (
                  <Card key={card.id} className="w-[300px] border-red-500">
                    <CardHeader className="bg-red-50 p-4">
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        Overdue Certification
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Description:</span>
                          <span className="font-semibold">{card.description}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="font-semibold">{card.dueDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tire Model:</span>
                          <span className="font-semibold">{card.tireModelName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="text-red-600 font-semibold">Overdue</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%]",
                  message.isUser
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
            {message.isUser && (
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <Input
            className="flex-1 border-gray-300"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
