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
    answer: "Yes, Citizen’s Advocate covers complaints from all states and ministries across India.",
  },
  {
    question: "🛠️ What if I don’t receive a response?",
    answer: "You can escalate the complaint or repost it to gain more attention from the ministry.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
      <p className="text-center text-lg mt-4 text-gray-600">
        Find answers to common queries about our platform.
      </p>

      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-4 flex justify-between items-center text-gray-800 font-semibold text-lg focus:outline-none"
            >
              {faq.question}
              <span>{openIndex === index ? "➖" : "➕"}</span>
            </button>
            {openIndex === index && (
              <motion.div
                className="px-6 pb-4 text-gray-600"
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
    </section>
  );
};

export default FAQ;
