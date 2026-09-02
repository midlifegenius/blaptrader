'use client'

import { useEffect, useRef, useState } from 'react'
import cardsData from './data/cards.json'

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const card = cardsData[currentIndex]

  // Completely stop whatever is currently playing
  const stopPreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    setIsPlaying(false)
  }

  const playPreview = () => {
    if (!card.mp3) return

    // If this card's audio isn't loaded yet, create it
    if (!audioRef.current) {
      const audio = new Audio(card.mp3)

      audioRef.current = audio

      audio.addEventListener('ended', () => {
        setIsPlaying(false)
      })
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Could not play preview:', error)
        setIsPlaying(false)
      })
  }

  const pausePreview = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }

    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pausePreview()
    } else {
      playPreview()
    }
  }

  // NEXT
  const handleNext = () => {
    // Navigation NEVER starts audio
    stopPreview()

    const nextIndex = (currentIndex + 1) % cardsData.length

    setCurrentIndex(nextIndex)
    setIsFlipped(false)

    // Make sure next card starts with a fresh audio player
    audioRef.current = null
  }

  // PREVIOUS
  const handlePrev = () => {
    // Navigation NEVER starts audio
    stopPreview()

    const prevIndex = (currentIndex - 1 + cardsData.length) % cardsData.length

    setCurrentIndex(prevIndex)
    setIsFlipped(false)

    // Make sure previous card starts with a fresh audio player
    audioRef.current = null
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
        {/* ROTATING CARD */}
        <div
          className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================= FRONT ================= */}

          <div className='absolute inset-0 w-full h-full [backface-visibility:hidden]'>
            <div className='w-full h-full rounded-xl overflow-hidden border border-purple-500/40 bg-[#0a0f1c] shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] flex items-center justify-center p-3'>
              <img
                src={card.image}
                alt={card.title}
                className='max-w-full max-h-full object-contain rounded-lg'
              />
            </div>
          </div>

          {/* ================= BACK ================= */}

          <div className='absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]'>
            <div className='relative w-full h-full rounded-xl overflow-hidden border border-fuchsia-500/30 bg-[#080b14] shadow-xl'>
              {/* BACKGROUND ARTWORK */}

              <img
                src={card.image}
                alt=''
                className='absolute inset-0 w-full h-full object-cover opacity-[.8] scale-200'
              />

              {/* DARK OVERLAY */}

              <div className='absolute inset-0 bg-[#080b14]/80' />

              {/* CONTENT */}

              <div className='relative z-10 w-full h-full px-5 py-4 flex flex-col'>
                {/* TOP IDENTIFICATION */}

                <div className='flex items-start justify-between border-b border-slate-800 pb-3'>
                  <div>
                    <p className='text-[9px] text-slate-500 tracking-widest'>
                      BLAP_TRADER
                    </p>

                    <h2 className='text-xl font-bold tracking-wider text-white mt-1'>
                      {card.title}
                    </h2>

                    <p className='text-[10px] text-slate-400 tracking-widest mt-1'>
                      {card.producer}
                    </p>
                  </div>

                  <div className='text-right'>
                    <p className='text-[9px] text-slate-500'>EDITION</p>

                    <p className='text-sm font-bold text-slate-200'>
                      {card.id}/{card.editionTotal}
                    </p>

                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest text-${card.rarityColor} mt-1`}
                    >
                      {card.rarity}
                    </p>
                  </div>
                </div>

                {/* BEAT INFO */}

                <div className='grid grid-cols-3 gap-2 py-4 border-b border-slate-800'>
                  <div className='text-center'>
                    <p className='text-[8px] text-slate-500 tracking-widest'>
                      BPM
                    </p>

                    <p className='text-sm font-bold text-white mt-1'>
                      {card.bpm}
                    </p>
                  </div>

                  <div className='text-center border-x border-slate-800'>
                    <p className='text-[8px] text-slate-500 tracking-widest'>
                      KEY
                    </p>

                    <p className='text-sm font-bold text-white mt-1'>
                      {card.key}
                    </p>
                  </div>

                  <div className='text-center'>
                    <p className='text-[8px] text-slate-500 tracking-widest'>
                      LENGTH
                    </p>

                    <p className='text-sm font-bold text-white mt-1'>
                      {card.duration}
                    </p>
                  </div>
                </div>

                {/* STATS */}

                <div className='pt-4 flex flex-col gap-3'>
                  {/* ENERGY */}

                  <div>
                    <div className='flex justify-between items-center mb-1'>
                      <span className='text-[9px] text-slate-400 tracking-widest'>
                        ENERGY
                      </span>

                      <span className='text-[10px] text-white font-bold'>
                        {card.stats.energy}
                      </span>
                    </div>

                    <div className='w-full h-1.5 bg-slate-800 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-lime-400 rounded-full'
                        style={{
                          width: `${card.stats.energy}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* HARDNESS */}

                  <div>
                    <div className='flex justify-between items-center mb-1'>
                      <span className='text-[9px] text-slate-400 tracking-widest'>
                        HARDNESS
                      </span>

                      <span className='text-[10px] text-white font-bold'>
                        {card.stats.hardness}
                      </span>
                    </div>

                    <div className='w-full h-1.5 bg-slate-800 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-lime-400 rounded-full'
                        style={{
                          width: `${card.stats.hardness}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* VIBE */}

                  <div className='flex justify-between items-center'>
                    <span className='text-[9px] text-slate-400 tracking-widest'>
                      VIBE
                    </span>

                    <span className='text-[10px] font-bold text-white tracking-widest'>
                      {card.stats.vibe}
                    </span>
                  </div>

                  {/* STYLE */}

                  <div className='flex justify-between items-center'>
                    <span className='text-[9px] text-slate-400 tracking-widest'>
                      STYLE
                    </span>

                    <span className='text-[10px] font-bold text-white tracking-widest'>
                      {card.stats.style}
                    </span>
                  </div>

                  {/* ERA */}

                  <div className='flex justify-between items-center'>
                    <span className='text-[9px] text-slate-400 tracking-widest'>
                      ERA
                    </span>

                    <span className='text-[10px] font-bold text-white tracking-widest'>
                      {card.stats.era}
                    </span>
                  </div>
                </div>

                {/* REDEEM */}

                <div className='mt-auto pt-3 border-t border-slate-800'>
                  <button className='w-full rounded bg-lime-400 text-black py-3 text-xs font-bold tracking-widest hover:bg-lime-300 transition-colors shadow-[0_0_15px_-3px_rgba(163,230,53,0.4)]'>
                    REDEEM BEAT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MUSIC + NAVIGATION */}

      <div className='w-full max-w-[300px] flex flex-col gap-3'>
        {/* AUDIO CONTROLS */}

        <div className='flex items-center gap-2'>
          <button
            onClick={handlePlayPause}
            disabled={!card.mp3}
            className='flex-1 px-4 py-3 rounded border border-cyan-500/40 bg-[#0a0f1c] text-cyan-400 text-xs font-bold tracking-widest hover:bg-cyan-400/10 transition-colors disabled:opacity-40'
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>

          <button
            onClick={handlePrev}
            className='px-4 py-3 rounded border border-slate-700 bg-[#0a0f1c] text-slate-400 text-xs font-bold hover:bg-slate-800 transition-colors'
          >
            PREV
          </button>

          <button
            onClick={handleNext}
            className='px-4 py-3 rounded border border-slate-700 bg-[#0a0f1c] text-slate-400 text-xs font-bold hover:bg-slate-800 transition-colors'
          >
            NEXT
          </button>
        </div>

        {/* FLIP */}

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className='w-full px-4 py-3 rounded bg-slate-800 border border-slate-600 text-xs font-bold hover:bg-slate-700 transition-colors tracking-widest text-white'
        >
          {isFlipped ? 'SHOW ARTWORK' : 'FLIP CARD'}
        </button>
      </div>
    </main>
  )
}
