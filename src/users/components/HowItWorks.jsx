import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <section className="w-full py-20 bg-gray-100 text-center">
      <motion.h2
        className="text-4xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <motion.div
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold">Step 1: Login</h3>
          <p className="mt-2 text-gray-600">
            Users log in and select their state to route complaints to the respective government.
          </p>
        </motion.div>
        <motion.div
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-xl font-semibold">Step 2: File a Complaint</h3>
          <p className="mt-2 text-gray-600">
            Select a category, provide complaint details, and submit proof (if required).
          </p>
        </motion.div>
        <motion.div
          className="p-6 bg-white shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-xl font-semibold">Step 3: Track Progress</h3>
          <p className="mt-2 text-gray-600">
            Check complaint status updates directly from the ministry dashboard.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
