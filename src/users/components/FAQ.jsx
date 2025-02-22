import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "📌 How do I file a complaint?",
    answer: "Simply log in, select your state, choose a category, provide details, and submit your complaint.",
  },
  {
    question: "⏳ How long does it take for complaints to be resolved?",
    answer: "Resolution time depends on the ministry. However, high-priority complaints are addressed faster.",
  },
  {
    question: "💬 Can I track my complaint status?",
    answer: "Yes! You can check the 'Track Complaint' section to see real-time updates.",
  },
  {
    question: "📍 Is this service available across India?",
    answer: "Yes, Citizen's Advocate covers complaints from all states and ministries across India.",
  },
  {
    question: "🛠️ What if I don't receive a response?",
    answer: "You can escalate the complaint or repost it to gain more attention from the ministry.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full min-h-screen relative overflow-hidden">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(34, 197, 94, 0.2), #FFFFFF)",
        }}
      />

      {/* Additional gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(34, 197, 94, 0.3) 40%, rgba(34, 197, 94, 0.2), #FFFFFF)",
          opacity: 0.95,
        }}
      />

  

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-6 py-20">
        <motion.h2 
          className="text-5xl font-bold text-center text-green-900 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p 
          className="text-center text-xl text-green-800 mb-16 max-w-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Find answers to common queries about our platform.
        </motion.p>

        <div className="max-w-4xl w-full space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-70 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-8 py-6 flex justify-between items-center text-green-800 font-semibold text-xl focus:outline-none hover:bg-white hover:bg-opacity-50 transition-colors duration-300"
              >
                {faq.question}
                <span className="text-green-600">{openIndex === index ? "➖" : "➕"}</span>
              </button>
              {openIndex === index && (
                <motion.div
                  className="px-8 pb-6 text-green-700 text-lg"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;