# Play with My Angel (Educational Soundboard)

An interactive, ad-free educational web application built specifically for toddlers to learn Vietnamese numbers, alphabet, colors, and shapes.

## Features
- **4 Learning Modes**: Numbers (0-9), Alphabet (A-Y), Colors (10 varieties), and Shapes (6 varieties).
- **Vietnamese TTS Integration**: Fully native browser `window.speechSynthesis` configured for Vietnamese phonetics. No external audio files to manage or download.
- **Toddler-Proof UI**: 
  - Locked scrolling on main layout
  - Disabled right click and text selection
  - Pastel aesthetics with Framer Motion bouncy ripple animations.

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development
1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Visit `http://localhost:5173`

*(Note: Ensure your Operating System has the Vietnamese language pack installed for the best text-to-speech pronunciation)*

## Deployment
Can be easily deployed statically to Vercel, Netlify, or Github Pages since it relies natively on the Client Browser TTS Engine.
