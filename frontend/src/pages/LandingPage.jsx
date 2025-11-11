import React from "react";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-green-200 relative overflow-hidden px-6">

      {/* Decorative Agriculture Illustration (Top Left) */}
      <div className="absolute top-0 left-0 w-48 h-48 opacity-30 pointer-events-none bg-[url('https://cdn-icons-png.flaticon.com/512/1534/1534369.png')] bg-contain bg-no-repeat"></div>

      {/* Decorative Wheat Illustration (Bottom Right) */}
      <div className="absolute bottom-0 right-0 w-56 h-56 opacity-25 pointer-events-none bg-[url('https://cdn-icons-png.flaticon.com/512/4151/4151060.png')] bg-contain bg-no-repeat"></div>

      {/* Title Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-extrabold text-green-700 drop-shadow-sm">
          🌱 AgroCloud
        </h1>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed font-medium">
          Empowering farmers with secure cloud storage and smart agricultural insights.
        </p>
      </div>

      {/* Farming Image */}
     

      {/* Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-10 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-10 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1"
        >
          Register
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-14 text-gray-600 text-sm font-medium">
        © {new Date().getFullYear()} AgroCloud • Smart Farming, Better Tomorrow 🌾
      </footer>

      {/* Floating Animation */}
      <style>
        {`
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}
