import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  loading: boolean;
  disabled: boolean;
}

const ChatInput = ({ onSend, loading, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 sm:p-4 bg-gray-100 rounded-md">
      <div className="flex flex-row text-black space-x-2 sm:space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send message ..."
          className="flex-1 bg-gray-100 px-4 py-2 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          className="text-gray-400 hover:text-gray-600 px-4 py-2 flex items-center justify-center space-x-2"
          disabled={disabled}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400" />
          ) : (
            <>
              <Send size={18} />
              <span className="hidden sm:inline">Send</span> 
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
