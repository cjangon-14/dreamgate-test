import React from 'react'

const Hero = () => {
  return (
    <div className='hero-bg min-h-screen'>
      <div className='container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen pt-20'>

        {/* Hero logo placeholder */}
        <div className="relative mb-6 flex flex-col items-center leading-none select-none">
          {/* BYB small label */}
          <span className="mb-1 text-xs font-bold tracking-widest text-navy-dark/60 uppercase">byb</span>

          {/* BLUE SKY 3D-style text */}
          <div className="relative">
            <span
              className="block font-display font-black uppercase text-[96px] leading-none"
              style={{
                color: '#B3E5FC',
                textShadow: `
                  3px 3px 0 #4FC3F7,
                  6px 6px 0 #29B6F6,
                  9px 9px 0 #1A3A52,
                  0 0 40px rgba(255,200,50,0.4)
                `,
                WebkitTextStroke: '2px #29B6F6',
              }}
            >
              BLUE
            </span>
            <span
              className="block font-display font-black uppercase text-[96px] leading-none"
              style={{
                color: '#B3E5FC',
                textShadow: `
                  3px 3px 0 #4FC3F7,
                  6px 6px 0 #29B6F6,
                  9px 9px 0 #1A3A52,
                  0 0 40px rgba(255,200,50,0.4)
                `,
                WebkitTextStroke: '2px #29B6F6',
              }}
            >
              SKY
            </span>
          </div>
        </div>

        {/* Themed Park | Events Center */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-bold tracking-widest text-navy-dark uppercase">Themed<br/>Park</span>
          <span className="text-navy-dark/40 text-xl font-light">|</span>
          <span className="text-sm font-bold tracking-widest text-navy-dark uppercase">Events<br/>Center</span>
        </div>

        {/* Tagline */}
        <p className="max-w-md text-navy-dark/80 text-base mb-10">
          Packed day full of excitement, laughter, and unforgettable memories in your life
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button className="btn-secondary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            BOOK NOW
          </button>
          <button className="btn-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            CHECK STATUS
          </button>
        </div>

      </div>
    </div>
  )
}

export default Hero