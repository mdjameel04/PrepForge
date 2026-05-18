"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const navItems = [
  { name: "Features",     path: "/#features" },
  { name: "Topics",       path: "/#topics"   },
  { name: "How it works", path: "/#works"    },
  { name: "Pricing",      path: "/#pricing"  },
]

const Navbar = () => {
  const { user } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className='w-full max-w-6xl fixed top-4 left-1/2 -translate-x-1/2 px-4 z-50'>

      {/* Main bar */}
      <div className='flex items-center justify-between rounded-2xl border border-white/10 bg-background dark:bg-black/40 backdrop-blur-xl py-3 px-4 md:px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] shadow-black/20'>

        {/* Logo */}
        <Link href="/" className='flex items-center gap-2'>
          <Image src="/logo.svg" alt='PrepForge logo' width={40} height={60} />
          <h1 className='text-xl font-bold text-foreground'>
            Prep<span className='text-orange-500'>Forge</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-1 border border-white/10 bg-orange-400 py-2 px-3 rounded-2xl'>
          {navItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              className='text-white hover:text-orange-500 font-bold text-sm px-3 py-1.5 rounded-xl hover:bg-white/10 transition-all duration-200'
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth + Theme Toggle */}
        <div className='hidden md:flex items-center gap-3'>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-xl text-white/70 hover:text-orange-500 bg-black hover:bg-white/10 border border-white/10 transition-all"
          >
            <Sun size={18} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {!user ? (
            <Link href="/sign-in">
              <Button
                variant="ghost"
                className="h-10 px-5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/dashboard">
                <Button className="h-10 px-5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-orange-900/30">
                  Get Started
                </Button>
              </Link>
              <UserButton />
            </>
          )}
        </div>

        {/* Mobile: Theme Toggle + Auth + Hamburger */}
        <div className='flex md:hidden items-center gap-2'>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
          >
            <Sun size={16} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon size={16} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {user && <UserButton />}

          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            className='p-2 rounded-lg hover:bg-white/10 transition-colors text-white'
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      <div className={`
        md:hidden mt-2 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md overflow-hidden
        transition-all duration-300 ease-in-out
        ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className='flex flex-col px-4 py-4 gap-1'>
          {navItems.map((item, index) => (
            <Link
              href={item.path}
              key={index}
              onClick={() => setMenuOpen(false)}
              className='text-white/70 font-medium py-2.5 px-3 rounded-xl hover:bg-white/10 hover:text-orange-500 transition-all text-sm'
            >
              {item.name}
            </Link>
          ))}

          <div className='border-t border-white/10 mt-2 pt-3'>
            {!user ? (
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full h-10 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 border border-white/10"
                >
                  Sign In
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                <Button className="w-full h-10 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar