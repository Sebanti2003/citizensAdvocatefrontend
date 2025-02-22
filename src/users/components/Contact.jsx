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
    <section id="contact" className="w-full py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h2>
        <p className="mt-4 text-gray-600">Reach out to us for any queries or support.</p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.form
            className="bg-white p-6 shadow-lg rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-left font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
                className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </motion.form>

          {/* Contact Details */}
          <motion.div
            className="bg-white p-6 shadow-lg rounded-lg text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <p className="mt-2 text-gray-600">We’re here to help! Contact us via email or phone.</p>
            <div className="mt-4 flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span>support@citizensadvocate.com</span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <FaPhone className="text-blue-600" />
              <span>+91 98765 43210</span>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
