'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Palette, FileText, IndianRupee, Clock, Package, MessageSquare } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/designs', label: 'Designs', icon: Palette },
    { href: '/documents', label: 'Documents', icon: FileText },
    { href: '/budget', label: 'Budget', icon: IndianRupee },
    { href: '/timeline', label: 'Timeline', icon: Clock },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/collaboration', label: 'Collaborate', icon: MessageSquare },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-lg border-b border-gold/20 py-4">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo & Project Name */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="text-2xl font-serif font-bold text-gradient">
              DISHA
            </div>
            <div className="hidden md:block h-8 w-px bg-gold/30"></div>
            <div className="hidden md:block text-sm text-gray-400">
              Kitchen Project
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-gold hover:bg-white/5 rounded-lg transition-all duration-300"
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Client Info */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-white">Neeru Tiwary</div>
              <div className="text-xs text-gray-500">Client</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-sm">
              NT
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gold p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-luxury-gray/95 backdrop-blur-lg rounded-lg p-4 space-y-2 border border-gold/20">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-gold hover:bg-white/5 rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
