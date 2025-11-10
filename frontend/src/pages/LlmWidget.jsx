import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function LlmWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://secure-cloud-agri.onrender.com/api/llm/generate",
        { prompt: input }
      );
      const botMessage = {
        type: "bot",
        text: res.data.output || "No response received.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("LLM Error:", err);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "❌ Error contacting the AI server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-transform hover:scale-110"
          title="Ask AI"
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-6 right-6 w-80 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center">
              <h4 className="font-semibold text-lg">AI Assistant 🤖</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-xl font-bold hover:scale-110 transition-transform"
              >
                ✖
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 text-sm text-gray-800"
            >
              {messages.length === 0 && !loading && (
                <p className="text-gray-500">
                  Ask me anything about your crops! 🌱
                </p>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[85%] ${
                    msg.type === "user"
                      ? "bg-green-100 text-green-900 self-end"
                      : "bg-gray-100 text-gray-900 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="text-gray-500">💭 Generating response...</div>
              )}
            </div>

            {/* Input */}
            <div className="flex p-3 gap-2 border-t border-gray-200">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 resize-none h-12 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 flex items-center justify-center shadow-md"
                title="Send"
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
