'use client'

import { useEffect, useRef, useState } from 'react'
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

const tracks = [
  '/Lo-Hype Type Beat 1.mp3',
  '/Lo-Hype Type Beat 2.mp3',
  '/rob-e-the_panic95bpm',
]

// Fisher-Yates shuffle
function shuffleArray(array: string[]) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function Home() {
  const [shuffledSlogans, setShuffledSlogans] = useState<string[]>([])
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Shuffle slogans once on mount
  useEffect(() => {
    const shuffled = shuffleArray(slogans)
    setShuffledSlogans(shuffled)
  }, [])

  // Rotate slogans
  const shuffleTrackAndPlay = async () => {
    if (!audioRef.current) return

    const randomIndex = Math.floor(Math.random() * tracks.length)
    const newTrack = tracks[randomIndex]

    audioRef.current.src = newTrack
    audioRef.current.loop = true
    audioRef.current.volume = 0.4

    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch (err) {
      console.log('Autoplay blocked until user interaction')
    }
  }

  useEffect(() => {
    if (!shuffledSlogans.length) return

    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = prev + 1

        // If we reached the end, reshuffle again
        if (next >= shuffledSlogans.length) {
          setShuffledSlogans(shuffleArray(slogans))
          return 0
        }

        return next
      })
    }, 9696)

    return () => clearInterval(interval)
  }, [shuffledSlogans])

  // Random track after mount
  useEffect(() => {
    if (!audioRef.current) return

    const randomIndex = Math.floor(Math.random() * tracks.length)
    audioRef.current.src = tracks[randomIndex]
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
  }, [])

  const toggleAudio = async () => {
    if (!audioRef.current) return

    if (!isPlaying) {
      await audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-neutral-100 overflow-hidden'>
      <audio ref={audioRef} />

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
            {shuffledSlogans.length > 0 && (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
                className='text-sm md:text-base tracking-[0.3em] text-neutral-400'
              >
                {shuffledSlogans[index]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className='pt-8 flex flex-col items-center gap-4'>
          <button
            onClick={toggleAudio}
            className='text-xs tracking-widest text-neutral-500 hover:text-white transition'
          >
            {isPlaying ? 'BLAPS ON' : 'BLAPS OFF'}
          </button>

          <button
            onClick={shuffleTrackAndPlay}
            className='border border-neutral-700 px-8 py-3 text-xs tracking-widest hover:bg-neutral-100 hover:text-black transition-all duration-500'
          >
            COMING SOONER THAN LATER
          </button>
        </div>
      </motion.div>

      <div className='absolute inset-0 -z-10 opacity-10 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:40px_40px]' />
    </main>
  )
}
