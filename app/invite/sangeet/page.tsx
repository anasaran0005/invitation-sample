'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import sangeetAnimation from '@/public/lottie animation/sangeet.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function SangeetInvitation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Trigger animation after initial entrance animations
    const timer = setTimeout(() => {
      setShowAnimation(true)
    }, 3500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#001f3f] flex flex-col items-center justify-center">
      
      {/* 1. Background (Layer 0) */}
      <motion.img
        src="/sangeet/sangeet-bg.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Sangeet Light Layer - Desktop (Visible on Screen) */}
      <motion.img
        src="/sangeet/sangeet-light.png"
        className="hidden md:block absolute inset-0 w-full h-full object-contain z-[11] pointer-events-none mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
      />

      {/* Main Content Container - Enforced 9:16 Aspect Ratio */}
      <div className="relative w-full h-full max-w-[calc(100vh*9/16)] mx-auto overflow-hidden z-10">

        
        {/* 2. Top Flowers/Decor (Layer 1) */}
        <motion.img
          src="/sangeet/sangeet-flower.png"
          className="absolute top-0 left-0 w-full object-contain object-top pointer-events-none z-10"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        />

        {/* Sangeet Light Layer - Mobile (Fitted Inside Container) */}
        <motion.img
          src="/sangeet/sangeet-light.png"
          className="md:hidden absolute inset-0 w-full h-full object-cover z-[11] pointer-events-none mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 2 }}
        />

     

        {/* 3. Couple (Layer 2) */}
        <motion.img
          src="/sangeet/sangeet-couple.png"
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[100%] object-contain pointer-events-none z-20"

          initial={{ y: 150, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Sangeet Text 3 (Layer 2.1) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-[21] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1.5 }}
        >
          <img 
            src="/sangeet/sangeet-text-3.png" 
            alt="Sangeet Details 3" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Sangeet Text 4 (Layer 2.2) */}
        <motion.div
          className="absolute inset-0 w-full h-full z-[22] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        >
          <img 
            src="/sangeet/sangeet-text-4.png" 
            alt="Sangeet Details 4" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* 4. Sangeet Text 1 (Layer 3) */}
        <motion.div
          className="absolute top-[0%] left-1/2 -translate-x-1/2 w-full z-30"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src="/sangeet/sangeet-text-1.png" 
            alt="Sangeet Night" 
            className="w-full object-contain"
          />
        </motion.div>


        {/* 5. Sangeet Text 2 (Layer 4) */}
        <motion.div
          className="absolute top-[-4%] left-1/2 -translate-x-1/2 w-full h-full z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.5 }}
        >
          <img 
            src="/sangeet/sangeet-text-2.png" 
            alt="Event Details" 
            className="w-full h-full object-contain"
          />
        </motion.div>


        {/* 6. Back Button (Fixed Arrow) */}
        {showAnimation && (
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

        {/* 7. Lottie Animation */}
        {showAnimation && (
          <div className="absolute inset-0 pointer-events-none z-[100] flex items-center justify-center">
            <div className="w-full h-full">
              <Lottie 
                animationData={sangeetAnimation} 
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
