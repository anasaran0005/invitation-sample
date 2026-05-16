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
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#fdfaf5] flex flex-col items-center justify-center">
      
      {/* 0. Full Screen Background Overlay (External) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <img 
          src="/wedding/5/wedding-bg.png" 
          className="w-full h-full object-cover opacity-30 blur-md"
          alt=""
        />
      </motion.div>

      {/* Main Content Container - Enforced 9:16 Aspect Ratio */}
      <div className="relative w-full h-full max-w-[calc(100vh*9/16)] mx-auto overflow-hidden z-10 shadow-2xl">

        {/* 1. Container Background Fill - Eliminates Top/Bottom White Gaps */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/wedding/5/wedding-bg.png" 
            className="w-full h-full object-cover opacity-60 blur-lg scale-110"
            alt=""
          />
        </div>

        {/* 2. Primary Background (Layer 0) - Centered and High Res */}
        <motion.img
          src="/wedding/5/wedding-bg.png"
          className="absolute inset-0 w-full h-full object-top object-contain z-[1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />

        {/* 3. Wedding Frame (Layer 1) */}
        <motion.img
          src="/wedding/5/wedding-bg-frame.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-[5]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        />

        {/* 4. Floral Decor / Mandap (Layer 2) */}
        <motion.img
          src="/wedding/5/wedding-flowers-2.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-10 translate-y-[3%]"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        />

        {/* 5. Couple (Layer 3) */}
        <motion.img
          src="/wedding/5/wedding-couple.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-20 translate-y-[-5%]"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 6. Wedding Text 0 - Save The Date (Layer 4) */}
        <motion.img
          src="/wedding/5/wedding-text-0.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-30 translate-y-[-15%]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 1.2 }}
        />

        {/* 7. Wedding Text 1 - Names (Layer 5) */}
        <motion.img
          src="/wedding/5/wedding-text-1.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-31 translate-y-[-10%]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 1.5 }}
        />

        {/* 8. Wedding Text 3 - Muhurtham (Layer 6) */}
        <motion.img
          src="/wedding/5/wedding-text-3.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-33 translate-y-[-8%]"
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 4.2, duration: 1.2 }}
        />

        {/* 9. Wedding Text 4 - Date/Venue/Dress (Layer 7) */}
        <motion.img
          src="/wedding/5/wedding-text-4.png"
          className="absolute inset-0 w-full h-full object-bottom object-contain pointer-events-none z-34"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.8, duration: 1.5 }}
        />

        {/* 10. Heart Confetti (Lottie) */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-[100] flex items-center justify-center">
            <div className="w-full h-full scale-[1.3] opacity-80">
              <Lottie 
                animationData={heartAnimation} 
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        )}

        {/* 11. Back Button (Fixed Arrow) */}
        <motion.div
          className="fixed bottom-6 left-6 z-[200]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 6, duration: 0.5 }}
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
      </div>

    </div>
  )
}
