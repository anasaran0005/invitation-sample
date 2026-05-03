'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function InviteEntry() {
  const router = useRouter()

  return (
    <div className="h-screen flex items-center justify-center bg-[#fdfbf7] relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #c5a059 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="z-10 text-center space-y-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-pinyon text-4xl text-[#c5a059] mb-2">Wedding Invitation</h2>
          <h1 className="font-playfair text-5xl md:text-6xl text-[#2d2d2d] font-bold">Tharun & Keerthi</h1>
        </motion.div>

        <motion.button
          onClick={() => router.push('/invite/experience')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
          className="px-10 py-4 bg-[#2d2d2d] text-white rounded-full font-inter tracking-widest text-sm uppercase shadow-xl hover:bg-[#c5a059] transition-colors duration-300 group relative overflow-hidden"
        >
          <span className="relative z-10">Open Invitation</span>
          <motion.div 
            className="absolute inset-0 bg-white/10"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 1 }}
          className="font-inter text-xs uppercase tracking-[0.2em] text-[#2d2d2d]"
        >
          May — June 2026
        </motion.p>
      </div>
    </div>
  )
}
