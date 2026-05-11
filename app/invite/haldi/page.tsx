'use client'

import { motion } from 'framer-motion'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import haldiAnimation from '@/public/lottie animation/haldi.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function HaldiInvitation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    // Trigger animation after initial entrance animations
    const timer = setTimeout(() => {
      setShowAnimation(true)
    }, 4500)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null


  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#fffbeb] flex flex-col items-center justify-center">
      
      {/* 1. Background (Layer 0) - Full Screen */}
      <motion.img
        src="/haldi/haldi-bg.png"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Main Content Container - Enforced 9:16 Aspect Ratio */}
      <div className="relative w-full h-full max-w-[calc(100vh*9/16)] mx-auto overflow-hidden z-10">

        
        {/* 2. Top Flowers (Layer 1) */}
        <motion.img
          src="/haldi/haldi-flowers.png"
          className="absolute top-0 left-0 w-full object-contain object-top pointer-events-none z-20"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
        />

        {/* 3. Center Text (Layer 2) */}
        <motion.div
          className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[85%] z-30"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        >
          <img 
            src="/haldi/haldi-text.png" 
            alt="Haldi Ceremony Invitation" 
            className="w-full object-contain"
          />
        </motion.div>

        {/* 4. Couple (Layer 3) */}
        <motion.img
          src="/haldi/haldi-couple.png"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] object-contain pointer-events-none z-40"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 5. Back Button (Fixed Arrow) */}
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

        {/* 6. Lottie Animation */}
        {showAnimation && (
          <div className="absolute -top-[10%] left-0 w-full h-[120%] pointer-events-none z-[100] flex items-center justify-center scale-90">
            <div className="w-full h-full">
              <Lottie 
                animationData={haldiAnimation} 
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
