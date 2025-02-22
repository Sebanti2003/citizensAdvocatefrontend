import { motion } from "framer-motion";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
// Assume this is a pre-made 3D component
import Button from "./ui/Button";
import ComplaintBox from "./3D/ComplaintBox";


export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
      {/* Left Side Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Citizen’s Advocate
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mt-4">
          Empowering Citizens, Strengthening Governance.
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          A centralized platform for filing complaints across multiple ministries with ease.
        </p>
        <div className="mt-6 flex gap-4">
          <Button className="px-6 py-3 text-lg" variant="default">
            📢 File a Complaint
          </Button>
          <Button className="px-6 py-3 text-lg" variant="outline">
            📖 Learn More
          </Button>
        </div>
      </motion.div>

      {/* Right Side 3D Object */}
      <motion.div
        className="w-full md:w-1/2 h-64 flex justify-center items-center mt-10 md:mt-0"
        whileHover={{ scale: 1.05 }}
      >
        <Canvas>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            <ComplaintBox />
          </Suspense>
        </Canvas>
      </motion.div>
    </section>
  );
}
