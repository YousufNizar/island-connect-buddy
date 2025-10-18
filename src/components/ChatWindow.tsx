import React, { useEffect, useRef, useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "./ui/button";
import { ConnectUser } from "@/data/users";

type Props = {
  user: ConnectUser | null;
  open: boolean;
  onClose: () => void;
};

const ChatWindow: React.FC<Props> = ({ user, open, onClose }) => {
  const [messages, setMessages] = useState<{ id: string; fromMe: boolean; text: string }[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    // reset messages when opening a new chat (local demo)
    const greetings = [
      `Hey! 👋 I'm ${user?.name}. Great to connect with you!`,
      `Hi there! ${user?.name} here. How's your trip going?`,
      `Hello! 😊 ${user?.name} here. What brings you to the island?`,
      `Hey! I'm ${user?.name}. Always happy to meet fellow travelers!`,
    ];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setMessages([
      { id: "m1", fromMe: false, text: randomGreeting },
    ]);
  }, [open, user]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  if (!open || !user) return null;

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Varied responses based on message content
    if (msg.includes("hey") || msg.includes("hi") || msg.includes("hello")) {
      const responses = [
        "Hey! 😊 How can I help you today?",
        "Hi there! What's up?",
        "Hello! Great to hear from you!",
        "Hey hey! How's everything going?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("meet") || msg.includes("hang out") || msg.includes("plans")) {
      const responses = [
        "I'd love to! What did you have in mind? 🌴",
        "Sounds great! When are you free?",
        "Yeah, let's do it! I'm exploring around here for the next few days.",
        "Absolutely! I'm always down for an adventure. What are you thinking?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("food") || msg.includes("eat") || msg.includes("restaurant")) {
      const responses = [
        "Oh I LOVE food! Have you tried the kottu roti yet? It's amazing! 🍛",
        "I know a great local spot! The curry is incredible there.",
        "Yes! I'm always looking for food buddies. There's this place I've been wanting to try...",
        "Street food here is next level! Want to explore some local markets together?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("beach") || msg.includes("surf") || msg.includes("swim")) {
      const responses = [
        "Beach day sounds perfect! The sunset there is unreal 🌅",
        "I'm literally on my way to the beach right now! Want to join?",
        "Yes! I've been wanting to check out that beach everyone's talking about.",
        "The waves are supposed to be great this week! Are you into surfing?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("hike") || msg.includes("trek") || msg.includes("mountain")) {
      const responses = [
        "Oh nice! I'm planning a sunrise hike soon. Want to come along? ⛰️",
        "Hiking is my thing! There's an amazing trail I discovered recently.",
        "Yes! The views from the top are absolutely breathtaking.",
        "I'm always down for a good hike! Early morning or afternoon?",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("where") || msg.includes("location") || msg.includes("area")) {
      const responses = [
        `I'm currently in ${user?.currentLocation.city}! You nearby?`,
        `I'm staying around ${user?.currentLocation.city} for a bit. Beautiful area!`,
        `${user?.currentLocation.city} right now! Have you been here before?`,
        `I'm exploring ${user?.currentLocation.city} at the moment. It's incredible here!`,
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (msg.includes("thank") || msg.includes("thanks")) {
      const responses = [
        "No problem! Happy to help 😊",
        "Anytime! That's what we're here for!",
        "Of course! Let me know if you need anything else.",
        "You're welcome! Hope you have an amazing time!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default varied responses
    const defaultResponses = [
      "That sounds interesting! Tell me more 😊",
      "Cool! I'm down for whatever honestly.",
      "Nice! I've been wanting to try something new.",
      "Sounds good to me! What time works for you?",
      "I'm definitely interested! Let's figure out the details.",
      "Love it! Count me in 🙌",
      "That would be awesome! I'm free most days.",
      "Great idea! I'm always looking for new experiences here.",
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const m = { id: `m_${Date.now()}`, fromMe: true, text: input.trim() };
    setMessages((s) => [...s, m]);

    // Simulate typing delay and human-like response
    const typingDelay = 1200 + Math.random() * 800; // 1.2-2 seconds
    setTimeout(() => {
      const response = generateResponse(input.trim());
      setMessages((s) => [...s, { id: `r_${Date.now()}`, fromMe: false, text: response }]);
    }, typingDelay);

    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Chat container - bottom sheet on mobile, centered panel on larger screens */}
      <div className="relative w-full sm:max-w-lg max-h-[90vh] sm:max-h-[85vh] bg-card rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={user.photos?.[0]} alt={user.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></span>
            </div>
            <div>
              <div className="font-semibold text-base">{user.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Online
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-destructive/10 hover:text-destructive">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="p-4 overflow-y-auto h-[50vh] sm:h-[55vh] space-y-3 bg-muted/20">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`${
                m.fromMe 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-card border border-border shadow-sm"
              } max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl ${
                m.fromMe ? "rounded-br-md" : "rounded-bl-md"
              }`}>
                <p className="text-sm leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-background rounded-full border border-border p-1 shadow-sm hover:shadow-md transition-shadow">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
              className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Type a message..."
            />
            <Button 
              size="icon" 
              onClick={sendMessage} 
              disabled={!input.trim()}
              className="rounded-full h-10 w-10 shadow-sm disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            This is a demo chat. Messages aren't saved yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
