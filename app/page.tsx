'use client'
import { v4 as uuidv4 } from 'uuid';
import ChatInput from "@/components/chat-input";
import ChatMessage from "@/components/chat-message";
import Navbar from "@/components/navbar";
import { useEffect, useRef, useState } from "react";

export type Message = {
  isUser: boolean;
  text: string;
}

export default function ChatApp() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cid, setCid] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [latestResponse, setLatestResponse] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file) {
      setCid(uuidv4());
    }
    setMessages([]);
    setLoading(false);
  }, [file]);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);

    try {
      if (file) {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
        }
        setLoading(false);
      }

      const response = await receiveAIResponse(message);
      setMessages((prev) => [...prev, { isUser: false, text: response }]);
      setLatestResponse('');
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [...prev, { isUser: false, text: 'Sorry, there was an error getting a response from the AI.' }]);
      setLoading(false);
    }
  };

  const receiveAIResponse = async (question: string): Promise<string> => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: cid, question }),
      });

      if (!response.ok) throw new Error(`Failed to get response: ${response.statusText}`);
      if (!response.body) throw new Error('No response received');

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let responseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = value.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.slice(5).trim());
              if (jsonData.content) {
                responseText += jsonData.content;
                setLatestResponse(responseText);
              }
            } catch (error) {
              console.error('Error parsing response:', error);
            }
          }
        }
      }

      return responseText;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const scrollToBottom = () => {
      chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar file={file} setFile={setFile} />
      <div className="py-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col justify-between h-full">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
          {messages.map((message: Message, index: number) => (
            <ChatMessage key={index} message={message} />
          ))}
          {latestResponse && <ChatMessage message={{ isUser: false, text: latestResponse }} />}
        </div>
        <ChatInput onSend={handleSendMessage} loading={loading} disabled={file === null} />
      </div>
    </div>

  );
}