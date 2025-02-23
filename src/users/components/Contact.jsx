import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!"); // Replace with actual form submission logic
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="w-screen h-screen flex items-center justify-center bg-white px-6 py-20">

        {/* Grid lines overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(#166534 1px, transparent 1px),
                linear-gradient(90deg, #166534 1px, transparent 1px)
              `,
              backgroundSize: "70px 40px",
              backgroundPosition: "0 0, 0 0",
              opacity: 0.1,
            }}
          />
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.form
          className="bg-white p-8 shadow-lg rounded-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
          <div className="mb-4">
            <label className="block text-left font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-left font-semibold">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Details */}
        <motion.div
          className="bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-semibold text-center">Get in Touch</h3>
          <p className="mt-4 text-gray-600 text-center">We’re here to help! Contact us via email or phone.</p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <FaEnvelope className="text-blue-600 text-xl" />
              <span>support@citizensadvocate.com</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaPhone className="text-blue-600 text-xl" />
              <span>+91 98765 43210</span>
            </div>
          </div>
          {/* Social Media Links */}
          <div className="mt-6 flex justify-center gap-6 text-2xl">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaFacebook />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaTwitter />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
