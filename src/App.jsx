import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Square, Circle, Triangle, Hexagon, Star, Heart } from 'lucide-react';

// Vietnamese Alphabet Data (29 letters)
const alphabetConfig = [
  'A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I', 'K', 'L', 'M',
  'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'
];

// Numbers Data (0-9)
const numbersConfig = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Pastel Color Palette
const colors = [
  'bg-rose-300', 'bg-blue-300', 'bg-emerald-300', 'bg-indigo-300',
  'bg-amber-300', 'bg-purple-300', 'bg-teal-300', 'bg-pink-300',
  'bg-cyan-300', 'bg-orange-300'
];

// Map numbers to standard Vietnamese words for TTS fallback
const numberWords = {
  0: "không", 1: "một", 2: "hai", 3: "ba", 4: "bốn",
  5: "năm", 6: "sáu", 7: "bảy", 8: "tám", 9: "chín"
};

// Map alphabet letters to Vietnamese phonetic spellings for accurate TTS reading
// TTS engines often mispronounce single characters, so we spell out how to say them.
const alphabetPhonetics = {
  'A': 'A', 'Ă': 'Á', 'Â': 'Ớ', 'B': 'Bờ', 'C': 'Cờ', 'D': 'Dờ', 'Đ': 'Đờ',
  'E': 'E', 'Ê': 'Ê', 'G': 'Gờ', 'H': 'Hờ', 'I': 'I', 'K': 'Ca', 'L': 'Lờ', 'M': 'Mờ',
  'N': 'Nờ', 'O': 'O', 'Ô': 'Ô', 'Ơ': 'Ơ', 'P': 'Pờ', 'Q': 'Cu', 'R': 'Rờ',
  'S': 'Sờ', 'T': 'Tờ', 'U': 'U', 'Ư': 'Ư', 'V': 'Vờ', 'X': 'Xờ', 'Y': 'Y dài'
};

// Colors Data
const colorsConfig = [
  { id: 'red', colorClass: 'bg-red-500', name: 'Màu đỏ' },
  { id: 'blue', colorClass: 'bg-blue-500', name: 'Màu xanh dương' },
  { id: 'green', colorClass: 'bg-green-500', name: 'Màu xanh lá' },
  { id: 'yellow', colorClass: 'bg-yellow-400', name: 'Màu vàng' },
  { id: 'orange', colorClass: 'bg-orange-500', name: 'Màu cam' },
  { id: 'purple', colorClass: 'bg-purple-500', name: 'Màu tím' },
  { id: 'pink', colorClass: 'bg-pink-400', name: 'Màu hồng' },
  { id: 'brown', colorClass: 'bg-amber-800', name: 'Màu nâu' },
  { id: 'black', colorClass: 'bg-slate-900', name: 'Màu đen' },
  { id: 'white', colorClass: 'bg-white', name: 'Màu trắng' }
];

// Shapes Data
const shapesConfig = [
  { id: 'circle', icon: Circle, name: 'Hình tròn', color: 'text-red-500' },
  { id: 'square', icon: Square, name: 'Hình vuông', color: 'text-blue-500' },
  { id: 'triangle', icon: Triangle, name: 'Hình tam giác', color: 'text-green-500' },
  { id: 'star', icon: Star, name: 'Ngôi sao', color: 'text-yellow-500' },
  { id: 'heart', icon: Heart, name: 'Trái tim', color: 'text-pink-500' },
  { id: 'hexagon', icon: Hexagon, name: 'Hình lục giác', color: 'text-purple-500' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('numbers'); // 'numbers' | 'alphabet'
  const [activeCardId, setActiveCardId] = useState(null);

  const speak = (item) => {
    setActiveCardId(item);

    // Stop any currently playing speech
    window.speechSynthesis.cancel();

    // Convert to explicit Vietnamese words or phonetics
    let textToSpeak = item.toString();
    if (typeof item === 'number') {
      textToSpeak = numberWords[item];
    } else if (alphabetPhonetics[item]) {
      textToSpeak = alphabetPhonetics[item];
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'vi-VN'; // Request Vietnamese language

    // Explicitly search and bind a Vietnamese voice if the browser has one loaded
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(voice => voice.lang.includes('vi') || voice.name.toLowerCase().includes('vietnam'));
    if (viVoice) {
      utterance.voice = viVoice;
    }

    utterance.rate = 0.9;     // Slightly slower for kids
    utterance.pitch = 1.1;    // Slightly higher pitch

    window.speechSynthesis.speak(utterance);

    // Reset visual state after a short delay for the ripple
    setTimeout(() => setActiveCardId(null), 400);
  };

  const renderCard = (item, index, type = 'default') => {
    // Determine uniqueness and TTS string
    let id = item;
    let ttsText = item.toString();
    let displayColor = colors[index % colors.length];

    // Config overrides based on mode
    if (type === 'colors') {
      id = item.id;
      ttsText = item.name;
      displayColor = item.colorClass; // Direct block color
    } else if (type === 'shapes') {
      id = item.id;
      ttsText = item.name;
    }

    const isActive = activeCardId === ttsText; // Speak uses ttsText tracking

    return (
      <motion.div
        key={id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.15 }}
        onClick={() => speak(ttsText)}
        className={`
          relative flex flex-col items-center justify-center 
          cursor-pointer aspect-square
          ${type === 'shapes' ? '' : `rounded-2xl sm:rounded-3xl shadow-md border-4 overflow-hidden ${displayColor} text-slate-800 border-white`}
          ${type === 'colors' && id === 'white' ? 'border-slate-200' : ''}
        `}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: type === 'shapes' ? 1.5 : 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`absolute inset-0 ${id === 'white' ? 'bg-slate-300' : type === 'shapes' ? 'bg-slate-200' : 'bg-white'} rounded-full pointer-events-none`}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          )}
        </AnimatePresence>

        {type === 'colors' ? null /* Colors mode has no text inside */ :
          type === 'shapes' ? (
            // Shapes mode renders only the huge Lucide icon
            <item.icon size={120} className={`sm:w-40 sm:h-40 z-10 drop-shadow-md pointer-events-none ${item.color} fill-current`} strokeWidth={2} />
          ) : (
            // Default Text mode (Numbers/Alphabet)
            <span className="text-4xl sm:text-6xl font-bold z-10 drop-shadow-sm pointer-events-none">
              {item}
            </span>
          )}
      </motion.div>
    );
  };

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center bg-slate-50 overflow-hidden font-kid">
      {/* Header Container */}
      <div className="w-full max-w-4xl p-4 sm:p-6 flex flex-col items-center justify-center gap-4 z-10 bg-white/80 backdrop-blur-sm shadow-sm">
        <h1 className="text-2xl sm:text-4xl text-slate-700 font-bold tracking-tight">
          Play with My Angel
        </h1>

        {/* Play Modes Toggles */}
        <div className="flex flex-wrap justify-center bg-slate-200 p-1 rounded-3xl shadow-inner gap-1 max-w-full">
          {[
            { id: 'numbers', label: 'Học Số', color: 'bg-amber-400' },
            { id: 'alphabet', label: 'Học Chữ', color: 'bg-blue-400' },
            { id: 'colors', label: 'Học Màu', color: 'bg-rose-400' },
            { id: 'shapes', label: 'Học Hình', color: 'bg-emerald-400' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-lg transition-all
                ${activeTab === tab.id ? `${tab.color} text-slate-800 shadow-md transform scale-105` : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Container (Scrollable internally so we don't break main layout) */}
      <div className="flex-1 w-full max-w-4xl overflow-y-auto p-4 sm:p-6 pb-12 scrollbar-none custom-scrollbar">
        {activeTab === 'numbers' && (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 mt-4 pb-8">
            {numbersConfig.map((item, index) => renderCard(item, index, 'default'))}
          </div>
        )}

        {activeTab === 'alphabet' && (
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4 mt-4 pb-8">
            {alphabetConfig.map((item, index) => renderCard(item, index, 'default'))}
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 mt-4 pb-8">
            {colorsConfig.map((item, index) => renderCard(item, index, 'colors'))}
          </div>
        )}

        {activeTab === 'shapes' && (
          <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mt-4 pb-8 px-4">
            {shapesConfig.map((item, index) => renderCard(item, index, 'shapes'))}
          </div>
        )}
      </div>
    </div>
  );
}
