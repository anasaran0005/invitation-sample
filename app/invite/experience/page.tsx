'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import heartAnimation from '@/public/lottie animation/Heart Animation.json'

export default function Experience() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Small delay to ensure smoother initial animation
    setIsLoaded(true)
    
    // Trigger confetti after initial entrance animations
    const timer = setTimeout(() => {
      setShowConfetti(true)
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f5efe9] flex flex-col items-center justify-center">
      
      {/* 1. Background (Layer 0) - Full Screen Always */}
      <motion.img
        src="/background.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Main Content Container - Centered Vertical Viewport for Desktop/Tablet */}
      <div className="relative w-full h-full max-w-[500px] mx-auto overflow-hidden z-10">
        
        {/* 2. Side Prop Right - Right Screen (Layer 1) */}
        <motion.img
          src="/right-screen.png"
          className="absolute top-0 right-0 h-full object-contain object-right-top pointer-events-none z-10"
          initial={{ x: 100, opacity: 0, filter: 'blur(10px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        />

        {/* 3. Top Flowers (Layer 2) */}
        <motion.img
          src="/flower.png"
          className="absolute top-0 left-0 w-full object-contain object-top pointer-events-none z-20"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        />

        {/* 4. Couple (Layer 3) */}
        <motion.img
          src="/couple.png"
          className="absolute bottom-[6%] md:bottom-[8%] left-1/2 -translate-x-1/2 w-full object-contain pointer-events-none z-30"
          initial={{ y: 150, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 5. Side Prop Left - Left Flower (Layer 4) */}
        <motion.img
          src="/left-flower.png"
          className="absolute bottom-[4%] md:bottom-[5%] left-0 h-[60%] md:h-[70%] object-contain object-left-bottom pointer-events-none z-40"
          initial={{ x: -100, opacity: 0, filter: 'blur(10px)' }}
          animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        />

        {/* 6. Candle (Layer 5) */}
        <motion.img
          src="/candle.png"
          className="absolute bottom-[4%] md:bottom-[5%] right-0 h-[65%] md:h-[80%] object-contain pointer-events-none z-50"
          initial={{ y: 50, opacity: 0, filter: 'blur(5px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        />

        {/* 7. Main Text (Layer 6) */}
        <motion.div
          className="absolute top-[12%] md:top-[10%] w-full flex justify-center items-center pointer-events-none z-60 px-4"
          initial={{ opacity: 0, filter: 'blur(15px)', y: 20, scale: 0.9 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
          transition={{ delay: 2.2, duration: 2, ease: "easeOut" }}
        >
          <img 
            src="/ceneter-text.png" 
            alt="Wedding Invitation Text" 
            className="max-w-full object-contain"
          />
        </motion.div>

        {/* 8. Heart Confetti (Lottie) */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-[100] flex items-end justify-center">
            <div className="w-full h-full">
              <Lottie 
                animationData={heartAnimation} 
                loop={false}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
