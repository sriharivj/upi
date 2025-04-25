import React, { useState } from 'react';
import { Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getChatResponse } from '../services/aiService';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Message {
  content: string;
  isBot: boolean;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hi! I'm your UPI safety assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { content: input.trim(), isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    try {
      const response = await getChatResponse(input.trim());
      
      setTimeout(() => {
        setMessages(prev => [...prev, { content: response, isBot: true }]);
        setIsTyping(false);
      }, 500); // Small delay to simulate typing
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        content: "I apologize, but I'm having trouble processing your request. Please try again.", 
        isBot: true 
      }]);
      setIsTyping(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full bg-purple-100 hover:bg-purple-200"
        >
          <Bot className="h-6 w-6 text-purple-600" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            UPI Safety Assistant
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">
          <div className="space-y-4 mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-purple-100 text-purple-900'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2">
                  Typing...
                </div>
              </div>
            )}
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
