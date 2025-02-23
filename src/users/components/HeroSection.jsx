import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-between px-16 py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            #FFFFFF 0%,
            rgba(255, 153, 51, 0.1) 50%,
            rgba(255, 153, 51, 0.3) 75%,
            rgba(255, 153, 51, 0.5) 100%
          )`,
        }}
      />
      {/* Grid Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(#003366 1px, transparent 1px),
                            linear-gradient(90deg, #003366 1px, transparent 1px)`,
          backgroundSize: "70px 40px",
          opacity: 0.1,
        }}
      />
      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-[60%] text-center md:text-left relative z-10 font-['Oswald']"
      >
        <h1 className="text-[5vw] font-extrabold text-orange-600 uppercase">
          Citizens'
        </h1>
        <h1 className="text-[7vw] font-extrabold text-blue-900 uppercase">
          Advocate
        </h1>
        <p className="text-[2.5vw] text-green-700 mt-6 font-semibold">
          Empowering Citizens, Strengthening Governance.
        </p>
        <p className="text-[1.5vw] text-gray-700 mt-4 max-w-2xl">
          A centralized platform for filing complaints across multiple ministries with ease.
        </p>
        <div className="mt-16 flex gap-12">
          <button className="px-8 py-4 bg-orange-500 text-white rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold text-lg">
            📢 File a Complaint
          </button>
          <button className="px-8 py-4 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg">
            📖 Learn More
          </button>
        </div>
      </motion.div>
      
      {/* 3D Model Using Model Viewer */}
      <div className="w-full md:w-[40%] h-[60vh] flex justify-center items-center mt-10 md:mt-0 relative z-10">
        <model-viewer 
          src="/ashoka_chakra.glb" 
          alt="Ashoka Chakra 3D Model"
          auto-rotate 
          auto-rotate-delay="0"
          rotation-per-second="30deg"
          disable-zoom
          disable-pan
          disable-tap
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </section>
  );
}
