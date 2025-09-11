import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  id: number;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const faqData = {
  "hello": "Hello! Welcome to Jharkhand Tourism. How can I help you today?",
  "destinations": "Popular destinations in Jharkhand include Netarhat Hill Station, Dassam Falls, Betla National Park, and Ranchi. What would you like to know about them?",
  "netarhat": "Netarhat is known as the 'Queen of Chotanagpur' and offers stunning sunrise and sunset views. It's perfect for nature lovers and photographers.",
  "dassam falls": "Dassam Falls is a spectacular 144-feet waterfall surrounded by dense forests. Best visited during monsoon season.",
  "betla": "Betla National Park is a tiger reserve with diverse wildlife and ancient fort ruins. Great for wildlife enthusiasts and history buffs.",
  "green tokens": "Our Green Token system rewards eco-friendly activities. Participate in cleanup drives and earn virtual cash! Use codes like CLEAN10, CLEAN20, CLEAN100.",
  "trip planning": "You can plan your trip using our Trip Planner tool. Select your preferences for accommodation, activities, and duration.",
  "default": "Thank you for your question! For detailed information, please contact our support team or explore our destination pages."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      message: "Hello! I'm your Jharkhand Tourism assistant. Ask me about destinations, green tokens, or trip planning!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      message: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple FAQ response logic
    const lowercaseInput = inputMessage.toLowerCase();
    let response = faqData.default;

    for (const [key, value] of Object.entries(faqData)) {
      if (lowercaseInput.includes(key)) {
        response = value;
        break;
      }
    }

    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        message: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 ${
          isOpen ? 'bg-destructive hover:bg-destructive/90' : 'bg-primary hover:bg-primary/90'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-40 shadow-2xl animate-scale-in">
          <CardHeader className="bg-primary text-primary-foreground p-4">
            <CardTitle className="text-lg">Tourism Assistant</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-80">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      msg.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about destinations..."
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;