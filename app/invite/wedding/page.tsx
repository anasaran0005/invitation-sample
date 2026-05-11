'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import heartAnimation from '@/public/lottie animation/Heart Animation.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

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

      {/* Main Content Container - Enforced 9:16 Aspect Ratio */}
      <div className="relative w-full h-full max-w-[calc(100vh*9/16)] mx-auto overflow-hidden z-10">

        
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
        {/* 9. Back Button (Fixed Arrow) */}
        {showConfetti && (
          <motion.div
            className="fixed bottom-6 left-6 z-[200]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/invite/ceremonies">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-full shadow-md border border-[#c5a059]/20 text-[#c5a059] hover:bg-white/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </div>

    </div>
  )
}
