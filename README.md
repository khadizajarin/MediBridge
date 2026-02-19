# ✨ Tailwind CSS Custom Design System

A lightweight Tailwind CSS setup that replaces external design tokens with a clean, native configuration — while preserving gradients, semantic colors, animations, and reusable UI utilities.

This project focuses on:

- Tailwind-first styling
- Semantic color tokens
- Reusable gradient utilities
- Smooth animations
- Clean global theming

---

## 🚀 Features

### 🎨 Semantic Color System

Colors are defined using CSS variables and mapped into Tailwind. This allows consistent styling and easy theme updates.

Available tokens include:

- Primary brand colors
- Mint accent tones
- Card surfaces
- Background & foreground layers

Update variables once → changes apply everywhere.

---

### 🌈 Gradient Utilities

Reusable gradient classes powered by CSS variables:

- `gradient-hero`
- `gradient-card`
- `gradient-subtle`

No inline CSS needed — just apply the utility class.

Example:

```html
<div class="gradient-hero p-6 rounded-xl">
  Call to Action
</div>
```

---

### 💫 Animation Utilities

Built-in animations for smooth UI motion:

- `animate-float`
- `animate-pulse-glow`
- `animate-fade-in-up`
- `animate-slide-in-left`

Example:

```html
<div class="animate-fade-in-up">
  Animated content
</div>
```

---

### 🧱 Shadow Utilities

Predefined elevation styles:

- `shadow-card`
- `shadow-glow`
- `shadow-lg-custom`

---

## 📂 Project Structure

```
project-root
│
├── global.css
│   → CSS variables
│   → gradients
│   → animations
│
├── tailwind.config.js
│   → semantic color mapping
│
└── app/
    → components & pages
```

---

## ⚙ Installation

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## 🎯 Styling Workflow

### Use semantic colors

Instead of raw hex values:

```html
bg-[#12ffaa]
```

Use:

```html
bg-primary
bg-mint
text-card-foreground
```

This keeps styling scalable and consistent.

---

### Use gradient utilities

```html
<div class="gradient-hero"></div>
```

---

### Use animations

```html
<div class="animate-float"></div>
```

---

## 🔧 Customization

To modify theme colors:

Open **global.css**:

```css
:root {
  --primary: ...;
  --accent-mint: ...;
}
```

Tailwind automatically reflects the changes.

---

## 🧠 Design Philosophy

This setup:

✅ Removes external token dependency  
✅ Keeps Tailwind workflow intact  
✅ Enables scalable theming  
✅ Promotes design consistency  
✅ Reduces repeated styling  

Perfect for maintainable UI systems.

---

## 📌 Best Practices

- Prefer semantic classes over raw colors
- Use utility gradients instead of inline styles
- Keep animations subtle
- Centralize theme updates in CSS variables

---

## 📜 License

Open-source — free to customize and use in your projects.

---

## 🙌 Contributing

Feel free to fork, experiment, and improve the design system.

Pull requests are welcome!

---

**Built with Tailwind CSS + modern CSS architecture.**
