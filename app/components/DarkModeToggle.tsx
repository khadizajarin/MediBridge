// "use client"
// import { useTheme } from 'next-themes';
// import { Moon, Sun } from 'lucide-react';

// export default function DarkModeToggle() {
//   const { theme, setTheme } = useTheme();

//   return (
//     <button
//       onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//       className="p-2 rounded-xl bg-card text-foreground hover:bg-muted "
//     >
//       {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//     </button>
//   );
// }

"use client"
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 rounded-xl bg-card text-foreground w-10 h-10 animate-pulse">
        {/* Skeleton loader - same size */}
      </div>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-6 right-6 z-50 p-2 rounded-xl bg-card text-foreground hover:bg-muted transition-all duration-200 shadow-lg hover:shadow-glow-custom"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}