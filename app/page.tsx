'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slogans = [
  'BUY LOW. SELL LOUD.',
  'TRADE THE BLAP. OWN THE SOUND.',
  'WHERE BLAPS HOLD VALUE.',
  'EXCHANGE HEAT.',
  'THE BEAT MARKET.',
  'CURRENCY IS RHYTHM.',
  'FLIP THE BLAP.',
  'VOLATILITY IN 808s.',
  'ALPHA IN EVERY 808.',
  'THE FUTURE TRADES IN BASS.',
]

export default function Home() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-neutral-100 overflow-hidden'>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='text-center space-y-6'
      >
        <h1 className='text-6xl md:text-8xl font-extralight tracking-tight'>
          BLAP TRADER
        </h1>

        <div className='h-8 flex items-center justify-center'>
          <AnimatePresence mode='wait'>
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className='text-sm md:text-base tracking-[0.3em] text-neutral-400'
            >
              {slogans[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className='pt-8'>
          <button className='border border-neutral-700 px-8 py-3 text-xs tracking-widest hover:bg-neutral-100 hover:text-black transition-all duration-500'>
            COMING SOONER THAN LATER
          </button>
        </div>
      </motion.div>

      {/* Subtle background grid */}
      <div className='absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:40px_40px]' />
    </main>
  )
}
