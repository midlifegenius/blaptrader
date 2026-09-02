'use client'

import { useEffect, useRef, useState } from 'react'
import cardsData from './data/cards.json'

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const card = cardsData[currentIndex]

  // Stop audio whenever the card changes
  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setIsPlaying(false)
  }

  // Preview / Stop button
  const handlePreview = () => {
    if (!card.mp3) return

    // If currently playing, stop it
    if (isPlaying) {
      stopPreview()
      return
    }

    // Create audio for current card
    if (!audioRef.current) {
      audioRef.current = new Audio(card.mp3)

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    } else {
      // Make sure audio is using the current card
      audioRef.current.src = card.mp3
    }

    audioRef.current.currentTime = 0

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Could not play preview:', error)
      })
  }

  // NEXT
  const handleNext = () => {
    stopPreview()
    setIsFlipped(false)

    setCurrentIndex((prev) => (prev + 1) % cardsData.length)
  }

  // PREVIOUS
  const handlePrev = () => {
    stopPreview()
    setIsFlipped(false)

    setCurrentIndex((prev) => (prev - 1 + cardsData.length) % cardsData.length)
  }

  // Cleanup audio if component is removed
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  return (
    <main className='max-w-md mx-auto pt-20 px-4 flex flex-col items-center gap-8'>
      {/* HEADER */}
      <div className='text-center'>
        <h2 className='text-cyan-400 text-sm tracking-widest font-bold'>
          {'// BLAP_TRADER PACK'}
        </h2>

        <p className='text-slate-500 text-xs mt-2'>
          CARD {currentIndex + 1} OF {cardsData.length}
        </p>
      </div>

      {/* CARD */}
      <div className='relative w-[300px] h-[420px] [perspective:1000px]'>
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================= FRONT ================= */}

          <div className='absolute inset-0 w-full h-full [backface-visibility:hidden]'>
            <div className='w-full h-full rounded-xl overflow-hidden border border-purple-500/40 bg-[#0a0f1c] shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]'>
              <img
                src={card.image}
                alt={card.title}
                className='w-full h-full object-cover'
              />
            </div>
          </div>

          {/* ================= BACK ================= */}

          <div className='absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]'>
            <div className='w-full h-full rounded-xl border border-slate-800 bg-[#0a0f1c] px-6 py-5 shadow-xl flex flex-col'>
              {/* TITLE */}

              <h2 className='text-slate-500 text-xs tracking-widest mb-5'>
                {'// BEAT INFO & STATS'}
              </h2>

              {/* BASIC INFO */}

              <div className='flex flex-col gap-2 border-b border-slate-800 pb-5 mb-5 text-sm'>
                <p>{card.bpm} BPM</p>
                <p>{card.key}</p>
                <p>{card.duration}</p>
              </div>

              {/* STATS */}

              <div className='flex flex-col gap-3 text-xs tracking-wider'>
                {/* ENERGY */}

                <div className='flex justify-between items-center'>
                  <span className='text-slate-500'>ENERGY</span>

                  <span>{card.stats.energy}</span>
                </div>

                {/* HARDNESS */}

                <div className='flex justify-between items-center gap-3'>
                  <span className='text-slate-500'>HARDNESS</span>

                  <div className='flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-lime-400'
                      style={{
                        width: `${card.stats.hardness}%`,
                      }}
                    />
                  </div>

                  <span>{card.stats.hardness}</span>
                </div>

                {/* VIBE */}

                <div className='flex justify-between items-center'>
                  <span className='text-slate-500'>VIBE</span>

                  <span>{card.stats.vibe}</span>
                </div>

                {/* STYLE */}

                <div className='flex justify-between items-center'>
                  <span className='text-slate-500'>STYLE</span>

                  <span>{card.stats.style}</span>
                </div>

                {/* ERA */}

                <div className='flex justify-between items-center'>
                  <span className='text-slate-500'>ERA</span>

                  <span>{card.stats.era}</span>
                </div>
              </div>

              {/* ACTION AREA */}

              <div className='mt-auto pt-5 border-t border-slate-800'>
                <p className='text-[10px] text-slate-400 text-center mb-3 tracking-widest'>
                  LICENSE AVAILABLE
                </p>

                <div className='flex gap-3'>
                  {/* PREVIEW / STOP */}

                  <button
                    onClick={handlePreview}
                    className={`flex-1 rounded border py-2.5 text-xs transition-colors ${
                      isPlaying
                        ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                        : 'border-slate-600 hover:bg-slate-800'
                    }`}
                  >
                    {isPlaying ? 'STOP' : 'PREVIEW'}
                  </button>

                  {/* REDEEM */}

                  <button className='flex-1 rounded bg-lime-400 text-black py-2.5 text-xs font-bold hover:bg-lime-300 transition-colors shadow-[0_0_15px_-3px_rgba(163,230,53,0.4)]'>
                    REDEEM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}

      <div className='flex items-center gap-4 w-full max-w-[300px]'>
        <button
          onClick={handlePrev}
          className='px-4 py-3 rounded border border-slate-700 text-xs font-bold hover:bg-slate-800 transition-colors text-slate-400'
        >
          PREV
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className='flex-1 px-4 py-3 rounded bg-slate-800 border border-slate-600 text-xs font-bold hover:bg-slate-700 transition-colors tracking-widest text-white'
        >
          {isFlipped ? 'SHOW ARTWORK' : 'FLIP CARD'}
        </button>

        <button
          onClick={handleNext}
          className='px-4 py-3 rounded border border-slate-700 text-xs font-bold hover:bg-slate-800 transition-colors text-slate-400'
        >
          NEXT
        </button>
      </div>
    </main>
  )
}
