
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./app/**/*.{ts,tsx}",
//     "./components/**/*.{ts,tsx}",
//     "./pages/**/*.{ts,tsx}",
//     "./src/**/*.{ts,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",

//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },

//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },

//         mint: {
//           DEFAULT: "hsl(var(--accent-mint))",
//           foreground: "hsl(var(--accent-mint-foreground))",
//         },

//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },

//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },

//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//       },

//       borderRadius: {
//         lg: "var(--radius)",
//       },
//     },
//   },
// };


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'], 
  
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  
  theme: {
    extend: {
      colors: {
        // ✅ Your existing CSS var setup - PERFECT!
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        mint: {
          DEFAULT: "hsl(var(--accent-mint))",
          foreground: "hsl(var(--accent-mint-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },

      borderRadius: {
        lg: "var(--radius)",
        xl: "var(--radius)", // ✅ Added for your rounded-xl usage
      },

      // ✅ #2: Dark mode shadows & gradients
      backgroundImage: {
        'gradient-hero-dark': 'radial-gradient(ellipse at top, hsl(var(--accent-mint)/0.1) 0%, hsl(var(--background)) 70%)',
      },

      boxShadow: {
        'glow-dark': '0 0 30px hsl(var(--accent-mint)/0.4)',
        'lg-custom-dark': '0 25px 50px -12px rgba(0, 0%, 0%, 0.5)',
      },
    },
  },

  plugins: [],
};