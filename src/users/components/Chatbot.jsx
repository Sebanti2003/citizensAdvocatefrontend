import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const quickReplies = [
  {
    q: "How do I file a complaint?",
    a: "Filing a complaint is easy:\n1. Click 'File a Complaint' on the home page.\n2. Sign up or log in as a citizen.\n3. From your dashboard, click '+ Post Complaint'.\n4. Select the relevant ministry.\n5. Fill in the details and submit.\nYou will receive a reference ID to track progress.",
    keys: ["file", "post", "submit", "complaint", "how"],
  },
  {
    q: "Which ministries are covered?",
    a: "We currently route grievances to 6 ministries:\n- Ministry of Railways\n- Ministry of Road Transport & Highways\n- Ministry of Consumer Affairs, Food & PD\n- Ministry of Health & Family Welfare\n- Ministry of Women & Child Development\n- Ministry of Education",
    keys: ["ministry", "ministries", "department", "covered", "list"],
  },
  {
    q: "How can I track my complaint?",
    a: "Log in to your Citizen Dashboard. All complaints you've filed appear there with live status - Pending, Under Review, or Resolved. You can also filter by ministry or status.",
    keys: ["track", "status", "progress", "update"],
  },
  {
    q: "How do I sign up?",
    a: "Click 'File a Complaint' on the home page, then choose 'Sign Up'. Provide a username, email, and password. After verification, you can start filing complaints immediately.",
    keys: ["sign up", "signup", "register", "account", "create"],
  },
  {
    q: "Is my data safe?",
    a: "Yes. Your data is encrypted in transit and stored securely. We comply with applicable Indian data protection regulations and the Citizens' Charter on data privacy.",
    keys: ["safe", "secure", "privacy", "data", "encrypt"],
  },
];

const findReply = (text) => {
  const t = text.toLowerCase();
  const match = quickReplies.find((r) => r.keys.some((k) => t.includes(k)));
  return match
    ? match.a
    : "I'm not sure about that yet. Try one of the quick options below, or visit the FAQ section on this page for more help.";
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Namaste, I'm your Citizens' Advocate assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: findReply(text) }]);
    }, 400);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl flex items-center justify-center"
        aria-label="Open chat assistant"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={18} className="text-white" />
              </div>
              <div className="leading-tight">
                <p className="text-white font-bold text-sm">Advocate Assistant</p>
                <p className="text-blue-200 text-[11px]">Online · Here to help</p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs whitespace-pre-line leading-relaxed ${
                      m.from === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-700 border border-gray-200 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 py-2 border-t border-gray-200 bg-white flex flex-wrap gap-1.5">
              {quickReplies.slice(0, 3).map((r, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(r.q)}
                  className="text-[10px] px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full hover:bg-orange-100 transition"
                >
                  {r.q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 px-3 py-2 border-t border-gray-200 bg-white"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 text-xs px-3 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
