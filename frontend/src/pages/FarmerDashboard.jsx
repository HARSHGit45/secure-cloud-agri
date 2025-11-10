import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { motion } from "framer-motion";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/167364/pexels-photo-167364.jpeg",
    "https://images.pexels.com/photos/219794/pexels-photo-219794.jpeg",
    "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg",
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await Auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-200 relative overflow-hidden">
      
      {/* Carousel */}
      <div className="relative w-full h-[55vh] overflow-hidden rounded-b-3xl shadow-lg">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="farm"
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 rounded-b-3xl ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-b-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg"
          >
            🌱 Farmer Dashboard
          </motion.h1>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/upload")}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform"
        >
          Upload / Replace
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/viewfiles")}
          className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform"
        >
          View Files
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-transform"
        >
          Logout
        </motion.button>
      </div>

      {/* Footer */}
      <footer className="mt-14 text-gray-600 text-sm font-medium text-center">
        © {new Date().getFullYear()} AgroCloud • Smart Farming, Better Tomorrow 🌾
      </footer>
    </div>
  );
}
