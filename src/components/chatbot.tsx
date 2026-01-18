'use client';

import { BotMessageSquare, Send, User, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { useState, useRef, useEffect, useActionState } from 'react';
import { Input } from './ui/input';
import { useFormStatus } from 'react-dom';
import { getChatbotResponse } from '@/app/actions';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Logo } from './icons';

type Message = {
  type: 'user' | 'bot';
  text: string;
};

const initialState = {
  message: '',
  response: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} aria-label="Send message">
      {pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
      ) : (
        <Send className="h-5 w-5" />
      )}
    </Button>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, formAction] = useActionState(getChatbotResponse, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.message && state.response) {
      setMessages((prev) => [
        ...prev,
        { type: 'user', text: state.message },
        { type: 'bot', text: state.response },
      ]);
      formRef.current?.reset();
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open chatbot"
      >
        <BotMessageSquare className="h-8 w-8" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              <Logo className="h-6 w-6 text-primary" />
              DonorConnect Support
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[50vh]" ref={scrollAreaRef}>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border-2 border-primary">
                  <AvatarFallback><Logo className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 text-sm max-w-[80%]">
                  <p>Hello! I'm the DonorConnect assistant. How can I help you today? You can ask about donation eligibility, the process, and more.</p>
                </div>
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-start gap-3',
                    msg.type === 'user' && 'justify-end'
                  )}
                >
                  {msg.type === 'bot' && (
                    <Avatar className="h-8 w-8 border-2 border-primary">
                       <AvatarFallback><Logo className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'rounded-lg p-3 text-sm max-w-[80%]',
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p>{msg.text}</p>
                  </div>
                   {msg.type === 'user' && (
                    <Avatar className="h-8 w-8">
                       <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter className="p-4 border-t">
            <form action={formAction} ref={formRef} className="flex gap-2 w-full">
              <Input
                name="query"
                placeholder="Ask a question..."
                className="flex-1"
                autoComplete='off'
              />
              <SubmitButton />
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
