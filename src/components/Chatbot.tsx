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
  "hello": "Hello! Welcome to Jharkhand Tourism. How can I help you today? 🙏",
  "destinations": "Popular destinations include Netarhat (Queen of Chotanagpur), Dassam Falls (144-feet waterfall), Betla National Park (tiger reserve), and Ranchi city.",
  "netarhat": "Best time to visit Netarhat: October to March. Known for stunning sunrise/sunset views from Queen of Chotanagpur plateau. Stay at Forest Rest House or JTDC properties.",
  "dassam falls": "Dassam Falls is 144-feet high, 34km from Ranchi. Best during monsoon (July-October). Take Ranchi-Taimara road, then 10km trek through Saranda Forest.",
  "betla": "Betla National Park: Open Oct-May. Safari timings: 6-10 AM & 2-6 PM. Online booking required. See tigers, elephants, leopards. Entry fee: ₹150 Indians, ₹600 foreigners.",
  "ranchi": "How to reach Ranchi: Fly to Birsa Munda Airport (5km from city). Train: Ranchi Junction connects to Delhi, Kolkata, Mumbai. Road: NH33 from Kolkata, NH75 from Patna.",
  "green tokens": "Green Token System: Clean tourist spots → Earn Virtual Cash! Test codes: CLEAN10 (+₹10), CLEAN20 (+₹20), CLEAN100 (+₹100). Help keep Jharkhand beautiful! 🌿",
  "trip planning": "Use our Trip Planner for customized itineraries. Select dates, group size, interests (wildlife/waterfalls/culture), budget. We'll create perfect Jharkhand experience!",
  "tribal culture": "Experience Jharkhand's 32 tribal communities: Santhali dances, Dokra metalwork, Sohrai paintings. Visit during Sarhul (spring festival) or Karma festivals.",
  "food": "Try Jharkhand cuisine: Litti Chokha, Dhuska, Rugra (mushroom curry), Bamboo shoot curry, Handia (rice beer). Visit local haats (markets) for authentic flavors.",
  "default": "I'm here to help with Jharkhand tourism info! Ask about destinations, travel tips, Green Tokens, or trip planning. For complex queries, contact our support team."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      message: "Hello! I'm your Jharkhand Tourism assistant 🗺️ Ask me about destinations, Green Tokens, trip planning, or travel tips!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const faqs = [
    {
      question: "Best time to visit Netarhat?",
      answer: "October to March is ideal for Netarhat. The Queen of Chotanagpur offers stunning sunrise/sunset views and pleasant weather during these months."
    },
    {
      question: "How to reach Ranchi?",
      answer: "Ranchi is well-connected by air, rail, and road. Birsa Munda Airport has flights from major cities. Regular trains connect to Delhi, Kolkata, and Mumbai."
    },
    {
      question: "Green Tokens earning process?",
      answer: "Clean tourist spots, dispose waste properly, participate in eco-activities. Use codes CLEAN10, CLEAN20, CLEAN100 to test the system!"
    },
    {
      question: "Tribal culture experiences?",
      answer: "Experience Jharkhand's 32 tribal communities: Santhali dances, Dokra metalwork, Sohrai paintings. Visit during festivals like Sarhul or Karma."
    }
  ];

  const quickActions = [
    { title: "Plan Trip", action: "/trip-planner", icon: "🗺️" },
    { title: "Book Hotel", action: "#", icon: "🏨" },
    { title: "Marketplace", action: "#marketplace", icon: "🛒" },
    { title: "Virtual Cash", action: "/green-tokens", icon: "💰" }
  ];

  const sendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now(),
      message: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simple FAQ response logic
    const lowercaseInput = message.toLowerCase();
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
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              
              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => window.location.href = action.action}
                        className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm"
                      >
                        <span>{action.icon}</span>
                        <span>{action.title}</span>
                      </button>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground font-medium mt-4">FAQs:</p>
                  {faqs.map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(faq.question)}
                      className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about destinations, travel tips..."
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