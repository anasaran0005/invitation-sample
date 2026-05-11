'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MusicPlayerProps {
  url?: string
  delay?: number
}

export default function MusicPlayer({ 
  url = '/music.mp3',
  delay = 4500 // Delay in ms to appear after animations
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Show button after delay
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.7 // Increased volume for better experience

    const startAudio = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true)
          cleanup()
        })
        .catch(err => console.log("Playback failed:", err))
    }

    const cleanup = () => {
      window.removeEventListener('click', startAudio)
      window.removeEventListener('touchstart', startAudio)
    }

    // 1. Try to play immediately
    audio.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // 2. If blocked, wait for any user interaction
        window.addEventListener('click', startAudio, { once: true })
        window.addEventListener('touchstart', startAudio, { once: true })
      })

    return () => {
      clearTimeout(visibilityTimer)
      cleanup()
    }
    // We only want this to run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={url} loop />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 z-[200]"
          >
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex items-center justify-center bg-white/60 backdrop-blur-md rounded-full shadow-md border border-[#c5a059]/20 text-[#c5a059] hover:bg-white/80 transition-colors"
              aria-label={isPlaying ? "Mute Music" : "Play Music"}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="playing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Speaker Icon - Playing */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="paused"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Speaker Icon - Muted/Paused */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <line x1="23" y1="9" x2="17" y2="15"></line>
                      <line x1="17" y1="9" x2="23" y2="15"></line>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
