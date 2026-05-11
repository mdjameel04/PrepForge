import React from 'react'

const HeroSection = () => {
  return (
    <div className='mt-6 min-h-screen flex flex-col items-center px-4'>

      {/* tagline */}
      <div className='flex items-center gap-2 border border-orange-500/50 bg-orange-500/10 py-2 px-4 rounded-2xl mt-8'>
        <div className='w-2 h-2 bg-orange-400 rounded-full animate-pulse' />
        <p className='text-sm text-orange-400 uppercase tracking-widest font-semibold'>
          AI-Powered Interview Prep
        </p>
      </div>

      {/* heading */}
      <div className='relative flex flex-col items-center mt-6'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse' />

        <div className='text-center flex flex-col leading-tight items-center font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight'>
          <h1 className='text-foreground'>Forge your</h1>
          <span className='text-orange-400'>Frontend</span>
          <span className='text-foreground'>Interview Skills</span>
        </div>
      </div>

      {/* subheadline */}
      <p className='mt-6 text-center text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed'>
        Master JavaScript, React, and Next.js through structured learning,
        AI-evaluated practice sessions, and real-time feedback.
      </p>

      {/* CTA buttons */}
      <div className='flex items-center gap-4 mt-10 flex-wrap justify-center'>
        <button className='flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25 text-base'>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21"/>
          </svg>
          Start Practicing Free
        </button>
        <button className='flex items-center gap-2 border border-border hover:border-orange-500 hover:text-orange-400 text-foreground font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-base bg-transparent'>
          Browse Topics
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
          </svg>
        </button>
      </div>

      {/* hero mockup card */}
      <div className='mt-16 w-full max-w-3xl border border-border rounded-2xl overflow-hidden bg-card shadow-2xl shadow-black/40'>
        {/* browser bar */}
        <div className='flex items-center gap-2 px-5 py-4 bg-muted border-b border-border'>
          <div className='w-3 h-3 rounded-full bg-red-500'/>
          <div className='w-3 h-3 rounded-full bg-yellow-400'/>
          <div className='w-3 h-3 rounded-full bg-green-500'/>
        </div>

        {/* card body */}
        <div className='p-8'>
          {/* question meta */}
          <div className='flex items-center gap-3 mb-4'>
            <span className='text-xs font-bold uppercase tracking-widest bg-orange-500/15 text-orange-400 px-3 py-1 rounded-md'>
              JavaScript
            </span>
            <span className='text-sm text-muted-foreground font-medium'>Question 2 of 5</span>
          </div>

          {/* question */}
          <p className='text-lg font-bold text-foreground mb-5 leading-snug'>
            What is a closure in JavaScript and how does it work?
          </p>

          {/* MCQ */}
          <div className='grid grid-cols-2 gap-3 mb-5'>
            {[
              'A function with no return value',
              'A function that remembers its outer scope',
              'An arrow function syntax',
              'A built-in JS method',
            ].map((opt, i) => (
              <button
                key={i}
                className={`text-left px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200
                  ${i === 1
                    ? 'border-orange-500 bg-orange-500/10 text-orange-400'
                    : 'border-border bg-muted text-muted-foreground hover:border-orange-500/50'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* text explanation box */}
          <div className='w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground min-h-[72px]'>
            A closure is a function that has access to variables from its outer scope even after the outer function has returned...
          </div>

          {/* footer */}
          <div className='flex items-center justify-between mt-5 pt-5 border-t border-border'>
            <div className='flex items-center gap-3 flex-1'>
              <div className='flex-1 h-1.5 bg-muted rounded-full overflow-hidden'>
                <div className='h-full w-2/5 bg-orange-500 rounded-full'/>
              </div>
              <span className='text-xs text-muted-foreground font-semibold'>2 / 5</span>
            </div>
            <button className='ml-5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors'>
              Get Feedback →
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroSection