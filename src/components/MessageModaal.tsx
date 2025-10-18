import React, { useState } from "react";
import { Send } from "lucide-react";

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ visible, onClose }) => {
  const [message, setMessage] = useState("");

  if (!visible) return null;

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl w-[90%] max-w-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Message the Organizer
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Send a short message to the event organizer.
        </p>

        {/* Bottom Sheet Style Message Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Close Button */}
        <div className="text-center mt-5">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
