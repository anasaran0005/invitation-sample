'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const ceremonies = [
  {
    id: 'haldi',
    title: 'Haldi Ceremony',
    date: 'May 31, 2026',
    time: '10:00 AM - 12:00 PM',
    targetDate: '2026-05-31T10:00:00',
    liveDurationHours: 2,
    href: '/invite/haldi',
    color: '#eab308',
    bg: 'bg-[#fffbeb]',
    image: '/haldi/haldi-invitaion.png'
  },
  {
    id: 'sangeet',
    title: 'Sangeet Ceremony',
    date: 'May 31, 2026',
    time: '6:00 PM onwards',
    targetDate: '2026-05-31T18:00:00',
    liveDurationHours: 6,
    href: '/invite/sangeet',
    color: '#9333ea',
    bg: 'bg-[#faf5ff]',
    image: '/sangeet/sangeet-invitation.png'
  },
  {
    id: 'wedding',
    title: 'Wedding Ceremony',
    date: 'June 01, 2026',
    time: '10:00 AM onwards',
    targetDate: '2026-06-01T10:00:00',
    liveDurationHours: 14,
    href: '/invite/wedding',
    color: '#c5a059',
    bg: 'bg-[#fdfbf7]',
    image: '/wedding/5/wedding-invitation.png'
  }
]


function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setMounted(true)
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())
    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) return <div className="h-[60px] mb-8" />

  return (
    <div className="flex gap-2 mb-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hrs', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds }
      ].map((unit, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-[#c5a059]/10 group-hover:border-[#c5a059]/30 transition-colors duration-300">
            <span className="font-inter text-xl font-bold text-[#c5a059]">{unit.value}</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-[#2d2d2d]/40 mt-1 font-inter">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function CeremoniesSelection() {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getStatus = (targetDate: string, durationHours: number) => {
    const start = new Date(targetDate).getTime()
    const end = start + (durationHours * 60 * 60 * 1000)

    if (currentTime < start) return 'upcoming'
    if (currentTime >= start && currentTime <= end) return 'live'
    return 'completed'
  }

  const sortedCeremonies = [...ceremonies].sort((a, b) => {
    const statusA = getStatus(a.targetDate, a.liveDurationHours)
    const statusB = getStatus(b.targetDate, b.liveDurationHours)
    
    if (statusA === 'completed' && statusB !== 'completed') return 1
    if (statusA !== 'completed' && statusB === 'completed') return -1
    if (statusA === 'live' && statusB !== 'live') return -1
    if (statusA !== 'live' && statusB === 'live') return 1
    return 0
  })

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-pinyon text-4xl text-[#c5a059] mb-2">Join Our Joy</h2>
          <h1 className="font-playfair text-5xl text-[#2d2d2d] font-bold">The Ceremonies</h1>
          <div className="w-24 h-1 bg-[#c5a059] mx-auto mt-6 rounded-full opacity-30" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedCeremonies.map((ceremony, index) => {
            const status = getStatus(ceremony.targetDate, ceremony.liveDurationHours)
            const isLive = status === 'live'
            const isCompleted = status === 'completed'

            return (
              <motion.div
                key={ceremony.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ y: isCompleted ? 0 : -10 }}
                className={`${ceremony.bg} rounded-3xl p-8 shadow-xl border flex flex-col items-center text-center group relative overflow-hidden transition-all duration-500 ${
                  isLive ? 'border-[#ff4d4d] shadow-[0_0_20px_rgba(255,77,77,0.2)]' : 'border-black/5'
                } ${isCompleted ? 'grayscale opacity-80' : ''}`}
              >
                {/* Status Badge */}
                {isLive && (
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#ff4d4d]/20 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d4d] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d4d]"></span>
                    </span>
                    <span className="text-[10px] font-inter font-bold tracking-widest text-[#ff4d4d] uppercase">Live Now</span>
                  </div>
                )}

                {isCompleted && (
                  <div className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-[#2d2d2d]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5">
                    <span className="text-[10px] font-inter font-bold tracking-widest text-[#2d2d2d]/60 uppercase">Event Concluded</span>
                  </div>
                )}

                {/* Decorative Background Element */}
                <div 
                  className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ${
                    isLive ? 'bg-[#ff4d4d]' : ''
                  }`}
                  style={!isLive ? { backgroundColor: ceremony.color } : {}}
                />

                <div className="relative z-10 w-full">
                  <div className="h-64 flex items-center justify-center mb-6 overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm">
                    <motion.img 
                      src={ceremony.image} 
                      alt={ceremony.title}
                      className="h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-playfair text-2xl font-bold text-[#2d2d2d] mb-2">{ceremony.title}</h3>
                  <p className="font-inter text-sm text-[#2d2d2d]/60 mb-1">{ceremony.date}</p>
                  <p className="font-inter text-xs tracking-widest uppercase text-[#2d2d2d]/40 mb-8">{ceremony.time}</p>

                  <div className="flex justify-center">
                    {status === 'upcoming' ? (
                      <CountdownTimer targetDate={ceremony.targetDate} />
                    ) : (
                      <div className="mb-8 h-[60px] flex items-center justify-center">
                        <p className={`font-inter text-sm tracking-widest uppercase font-bold ${
                          isLive ? 'text-[#ff4d4d] animate-pulse' : 'text-[#2d2d2d]/40'
                        }`}>
                          {isLive ? 'Ceremony in Progress' : 'Thank you for joining'}
                        </p>
                      </div>
                    )}
                  </div>

                  <Link href={ceremony.href} className="inline-block w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ backgroundColor: isLive ? '#ff4d4d' : '#2d2d2d' }}
                      className={`py-4 rounded-xl text-white font-inter tracking-widest text-xs uppercase shadow-lg transition-colors duration-300 ${
                        isCompleted ? 'bg-[#2d2d2d]/40' : 'group-hover:bg-[#c5a059]'
                      }`}
                    >
                      {isCompleted ? 'View Gallery' : 'Enter Invitation'}
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>


        {/* Utility Cards Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Add to Calendar Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-[#c5a059]/10 flex flex-col items-center text-center group relative overflow-hidden"
          >
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#c5a059]/5 rounded-full" />
            
            <div className="w-16 h-16 bg-[#fdfbf7] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-[#c5a059]/10 group-hover:bg-[#c5a059]/10 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>

            <h3 className="font-playfair text-xl font-bold text-[#2d2d2d] mb-2">Save the Date</h3>
            <p className="font-inter text-sm text-[#2d2d2d]/60 mb-6">Add the wedding ceremony to your digital calendar</p>

            <a 
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+Celebrations+-+Tharun+%26+Keerthi&dates=20260531T100000Z/20260601T235900Z&details=We+invite+you+to+celebrate+the+wedding+celebrations+of+Tharun+and+Keerthi.+Join+us+from+the+Haldi+to+the+Grand+Wedding+Ceremony.+Click+the+map+link+for+location:+https://maps.app.goo.gl/HR9U4WrtCjDG44Pf7&location=https://maps.app.goo.gl/HR9U4WrtCjDG44Pf7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 rounded-xl border border-[#c5a059] text-[#c5a059] font-inter tracking-widest text-[10px] uppercase group-hover:bg-[#c5a059] group-hover:text-white transition-all duration-300"
              >
                Add to Calendar
              </motion.div>
            </a>
          </motion.div>

          {/* Location Map Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-[#c5a059]/10 flex flex-col items-center text-center group relative overflow-hidden"
          >
            <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-[#c5a059]/5 rounded-full" />

            <div className="w-16 h-16 bg-[#fdfbf7] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-[#c5a059]/10 group-hover:bg-[#c5a059]/10 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>

            <h3 className="font-playfair text-xl font-bold text-[#2d2d2d] mb-2">Venue Location</h3>
            <p className="font-inter text-sm text-[#2d2d2d]/60 mb-6">Find your way to the wedding venue using Google Maps</p>

            <a 
              href="https://maps.app.goo.gl/HR9U4WrtCjDG44Pf7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 rounded-xl border border-[#c5a059] text-[#c5a059] font-inter tracking-widest text-[10px] uppercase group-hover:bg-[#c5a059] group-hover:text-white transition-all duration-300"
              >
                Open in Maps
              </motion.div>
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-20"
        >
          <Link href="/invite" className="text-[#c5a059] font-inter text-sm tracking-widest uppercase hover:underline">
            ← Back to Welcome
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

