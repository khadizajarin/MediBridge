"use client"
import { useState, useEffect, useCallback } from "react"
import { Menu, X, Heart } from "lucide-react"
import Link from "next/link"
import DarkModeToggle from "@/app/components/DarkModeToggle"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const


const Navbar = () => {
  // ✅ 1. ALL useState FIRST
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // ✅ 2. ALL useCallback NEXT (top level only!)
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  const handleLinkClick = useCallback((href: string) => {
    setIsOpen(false)
    
    if (href.startsWith('/') && !href.startsWith('#')) {
      window.location.href = href
      return
    }
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  // ✅ 3. ALL useEffect LAST
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // ✅ 4. Early return AFTER all hooks
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 lg:h-20 bg-transparent/80 backdrop-blur-sm" />
    )
  }

  // ✅ 5. JSX
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-card-custom border-b border-border/50"
          : "bg-transparent/80 backdrop-blur-sm"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 p-1.5 -m-1.5 rounded-xl hover:bg-accent/50 transition-all group"
          >
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-mint to-primary flex items-center justify-center shadow-glow-custom group-hover:shadow-glow group-hover:scale-[1.02] transition-all">
              <Heart className="w-4.5 h-4.5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className={`font-sora font-bold text-lg lg:text-xl transition-colors ${
              scrolled ? "text-foreground" : "text-primary-foreground"
            }`}>
              Medi<span className="text-mint">Care</span>Pro
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.href} className="group relative">
                {link.href.startsWith('#') ? (
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all hover:text-mint hover:bg-accent/50 ${
                      scrolled ? "text-foreground/80" : "text-primary-foreground/90"
                    }`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 rounded-lg font-medium text-sm transition-all hover:text-mint hover:bg-accent/50 ${
                      scrolled ? "text-foreground/80" : "text-primary-foreground/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-mint rounded-full transition-all duration-300 group-hover:w-full" />
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <DarkModeToggle />
            <Link
              href="/login"
              className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all hover:shadow-md ${
                scrolled
                  ? "border-border text-foreground hover:text-primary hover:bg-primary/5"
                  : "border-transparent text-primary-foreground/90 hover:text-primary-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("/login")
              }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-linear-to-r from-mint to-primary text-primary-foreground hover:opacity-90 hover:shadow-glow-custom transition-all duration-200 flex items-center gap-1.5 group"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("/register")
              }}
            >
              Get Started
              <span className="w-4 h-4 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-1.5 rounded-xl transition-all shadow-sm hover:shadow-md ${
              scrolled 
                ? "text-foreground hover:bg-accent" 
                : "text-primary-foreground hover:bg-primary-foreground/20"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0"
        }`}
        role="menu"
      >
        <div className="bg-card/98 backdrop-blur-xl border-t border-border px-4 py-6 space-y-1">
          <ul className="space-y-0.5 mb-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.href.startsWith('#') ? (
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="w-full text-left px-4 py-3.5 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-xl transition-all duration-200 flex items-center gap-3"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="block w-full px-4 py-3.5 text-base font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-xl transition-all duration-200 items-center gap-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          <div className="space-y-3 pt-4 border-t border-border/50">
            <Link
              href="/login"
              className="block w-full py-3.5 px-4 text-base font-medium text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-primary-foreground hover:shadow-glow-custom transition-all duration-200 text-center"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("/login")
              }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block w-full py-3.5 px-4 text-base font-semibold bg-linear-to-r from-mint to-primary text-primary-foreground rounded-xl hover:opacity-90 hover:shadow-glow-custom transition-all duration-200 text-center"
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick("/register")
              }}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar