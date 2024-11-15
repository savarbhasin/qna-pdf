import { Message } from "@/app/page";
import { User, Brain } from "lucide-react";

const ChatMessage = ({message}: {
  message: Message
}) => (
  <div className={`flex items-start gap-4 ${message.isUser ? 'flex-row-reverse' : ''}`}>
    <div className={`rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
      {message.isUser ? <User size={20} /> : <Brain size={20} className="text-black" />}
    </div>
    <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg max-w-[85%] sm:max-w-[70%] ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
      {message.text}
    </div>
  </div>

);

export default ChatMessage;