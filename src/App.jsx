import React, { useState, useDeferredValue, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Square, Circle, Triangle, Hexagon, Star, Heart, Octagon, Diamond, Cloud, Sun, Moon, Sparkles, Dog, Cat, Bird, Fish, Rabbit, Turtle, Bug, Snail, Squirrel, Ghost } from 'lucide-react';

// Animal Image Assets
import dogImg from './assets/animals/dog.png';
import catImg from './assets/animals/cat.png';
import birdImg from './assets/animals/bird.png';
import fishImg from './assets/animals/fish.png';
import rabbitImg from './assets/animals/rabbit.png';
import turtleImg from './assets/animals/turtle.png';
import bugImg from './assets/animals/bug.png';
import snailImg from './assets/animals/snail.png';
import squirrelImg from './assets/animals/squirrel.png';
import ghostImg from './assets/animals/ghost.png';

// Vietnamese Alphabet Data (29 letters)
const alphabetConfig = [
  'A', 'Ă', 'Â', 'B', 'C', 'D', 'Đ', 'E', 'Ê', 'G', 'H', 'I', 'K', 'L', 'M',
  'N', 'O', 'Ô', 'Ơ', 'P', 'Q', 'R', 'S', 'T', 'U', 'Ư', 'V', 'X', 'Y'
];


// Vibrant Playful Color Palette for Kids
const colors = [
  'from-rose-400 to-rose-200 text-rose-900',
  'from-blue-400 to-blue-200 text-blue-900',
  'from-emerald-400 to-emerald-200 text-emerald-900',
  'from-indigo-400 to-indigo-200 text-indigo-900',
  'from-amber-400 to-amber-200 text-amber-900',
  'from-purple-400 to-purple-200 text-purple-900',
  'from-teal-400 to-teal-200 text-teal-900',
  'from-pink-400 to-pink-200 text-pink-900',
  'from-cyan-400 to-cyan-200 text-cyan-900',
  'from-orange-400 to-orange-200 text-orange-900'
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
  { id: 'white', colorClass: 'bg-white', name: 'Màu trắng' },
  { id: 'gray', colorClass: 'bg-gray-500', name: 'Màu xám' },
  { id: 'cyan', colorClass: 'bg-cyan-400', name: 'Màu xanh lơ' },
  { id: 'lime', colorClass: 'bg-lime-400', name: 'Màu xanh đọt chuối' },
];

// Shapes Data
const shapesConfig = [
  { id: 'circle', icon: Circle, name: 'Hình tròn', color: 'text-red-500' },
  { id: 'square', icon: Square, name: 'Hình vuông', color: 'text-blue-500' },
  { id: 'triangle', icon: Triangle, name: 'Hình tam giác', color: 'text-green-500' },
  { id: 'star', icon: Star, name: 'Ngôi sao', color: 'text-yellow-500' },
  { id: 'heart', icon: Heart, name: 'Trái tim', color: 'text-pink-500' },
  { id: 'hexagon', icon: Hexagon, name: 'Hình lục giác', color: 'text-purple-500' },
  { id: 'octagon', icon: Octagon, name: 'Hình bát giác', color: 'text-orange-500' },
  { id: 'diamond', icon: Diamond, name: 'Hình thoi', color: 'text-cyan-500' },
  { id: 'cloud', icon: Cloud, name: 'Đám mây', color: 'text-slate-400' },
  { id: 'sun', icon: Sun, name: 'Mặt trời', color: 'text-amber-500' },
  { id: 'moon', icon: Moon, name: 'Mặt trăng', color: 'text-indigo-400' },
  { id: 'sparkles', icon: Sparkles, name: 'Tia sáng', color: 'text-yellow-400' }
];

// Animals Data
const animalsConfig = [
  { id: 'dog', img: dogImg, name: 'Con chó' },
  { id: 'cat', img: catImg, name: 'Con mèo' },
  { id: 'bird', img: birdImg, name: 'Con chim' },
  { id: 'fish', img: fishImg, name: 'Con cá' },
  { id: 'rabbit', img: rabbitImg, name: 'Con thỏ' },
  { id: 'turtle', img: turtleImg, name: 'Con rùa' },
  { id: 'bug', img: bugImg, name: 'Con bọ' },
  { id: 'snail', img: snailImg, name: 'Con ốc sên' },
  { id: 'squirrel', img: squirrelImg, name: 'Con sóc' },
  { id: 'ghost', img: ghostImg, name: 'Con ma vui vẻ' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('numbers'); // 'numbers' | 'alphabet' | 'colors' | 'shapes' | 'animals'
  const [activeCardId, setActiveCardId] = useState(null);
  const [maxNumber, setMaxNumber] = useState(9);
  const deferredMaxNumber = useDeferredValue(maxNumber);

  // Settings State for Colors, Shapes, and Animals
  const [enabledColors, setEnabledColors] = useState(colorsConfig.map(c => c.id));
  const [enabledShapes, setEnabledShapes] = useState(shapesConfig.map(s => s.id));
  const [enabledAnimals, setEnabledAnimals] = useState(animalsConfig.map(a => a.id));

  const toggleConfigItem = (id, type) => {
    if (type === 'colors') {
      setEnabledColors(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    } else if (type === 'shapes') {
      setEnabledShapes(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
    } else {
      setEnabledAnimals(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
    }
  };

  const speak = useCallback((item) => {
    // Use a unique ID string to force AnimatePresence re-trigger
    const uniqueId = `${item}-${Date.now()}`;
    setActiveCardId(uniqueId);


    // Stop any currently playing speech
    window.speechSynthesis.cancel();

    // Convert to explicit Vietnamese words or phonetics
    let textToSpeak = item.toString();
    if (typeof item === 'number') {
      textToSpeak = numberWords[item] || item.toString();
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
  }, []);

  const renderCard = useCallback((item, index, type = 'default') => {
    // Determine uniqueness and TTS string
    let id = item;
    let ttsText = item.toString();
    
    // Config overrides based on mode
    let displayColor = colors[index % colors.length]; // Now contains gradient and text classes
    let colorClassForColorsTab = '';

    if (type === 'colors') {
      id = item.id;
      ttsText = item.name;
      colorClassForColorsTab = item.colorClass; // Direct block color
    } else if (type === 'shapes' || type === 'animals') {
      id = item.id;
      ttsText = item.name;
    }

    const isActive = activeCardId?.startsWith(ttsText); // Check prefix since we added timestamp

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
        key={id}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => speak(ttsText)}
        className={`
          relative flex flex-col items-center justify-center 
          cursor-pointer aspect-square
          ${type === 'shapes' || type === 'animals' ? '' : `rounded-[2rem] sm:rounded-[2.5rem] shadow-lg border-[6px] border-white/80 bg-gradient-to-br ${type === 'colors' ? '' : displayColor} overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:border-white`}
          ${type === 'colors' ? `${colorClassForColorsTab} !border-white/20` : ''}
          ${type === 'colors' && id === 'white' ? 'border-slate-200 bg-white' : ''}
        `}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <AnimatePresence mode="popLayout">
          {isActive && (
            <motion.div
              key={activeCardId} // Use unique ID as key to force re-render on double click
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: type === 'shapes' || type === 'animals' ? 3.0 : 4.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`absolute inset-0 bg-white rounded-full pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.8)]`}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          )}
        </AnimatePresence>

        {type === 'colors' ? null /* Colors mode has no text inside */ :
          type === 'animals' ? (
            <div className="relative flex items-center justify-center w-full h-full p-2">
              <motion.img 
                src={item.img} 
                alt={item.name}
                className="w-full h-full object-contain z-10"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          ) : type === 'shapes' ? (
            // Shapes mode renders with a soft circular backdrop
            <div className={`relative flex items-center justify-center w-full h-full`}>
              <div className={`absolute w-[70%] h-[70%] rounded-full bg-white/40 blur-sm`} />
              <item.icon size={130} className={`sm:w-44 sm:h-44 z-10 pointer-events-none ${item.color} fill-current`} strokeWidth={2.5} />
            </div>
          ) : (
            // Default Text mode (Numbers/Alphabet)
            <span className={`
              text-5xl sm:text-7xl font-extrabold z-10 pointer-events-none
            `}>
              {item}
            </span>
          )}
      </motion.div>
    );
  }, [activeCardId, speak]);

  const numbersElements = useMemo(() => {
    return Array.from({ length: deferredMaxNumber + 1 }, (_, i) => i).map((item, index) => renderCard(item, index, 'default'));
  }, [deferredMaxNumber, renderCard]);

  const alphabetElements = useMemo(() => alphabetConfig.map((item, index) => renderCard(item, index, 'default')), [renderCard]);
  const colorsElements = useMemo(() => colorsConfig.filter(c => enabledColors.includes(c.id)).map((item, index) => renderCard(item, index, 'colors')), [renderCard, enabledColors]);
  const shapesElements = useMemo(() => shapesConfig.filter(s => enabledShapes.includes(s.id)).map((item, index) => renderCard(item, index, 'shapes')), [renderCard, enabledShapes]);
  const animalsElements = useMemo(() => animalsConfig.filter(a => enabledAnimals.includes(a.id)).map((item, index) => renderCard(item, index, 'animals')), [renderCard, enabledAnimals]);

  return (
    <div className="w-full min-h-full flex flex-col items-center font-kid">
      {/* Header Container */}
      <div className="w-full max-w-4xl p-6 sm:p-8 flex flex-col items-center justify-center gap-6 z-10 bg-white/40 backdrop-blur-md shadow-lg rounded-b-[3rem] border-b-4 border-white/50">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.h1 
            className="text-4xl sm:text-6xl font-black tracking-tight flex gap-2"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
          >
            {"Play with My Angel".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                className={i === 0 ? "text-rose-500" : i === 1 ? "text-blue-500" : i === 2 ? "text-amber-500" : "text-emerald-500"}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-600 font-bold text-lg sm:text-xl italic opacity-80"
          >
            Cùng bé yêu khám phá thế giới! ✨
          </motion.p>
        </motion.div>

        {/* Play Modes Toggles */}
        <div className="flex flex-wrap justify-center bg-slate-200 p-1 rounded-3xl shadow-inner gap-1 max-w-full">
          {[
            { id: 'numbers', label: 'Học Số', color: 'bg-amber-400' },
            { id: 'alphabet', label: 'Học Chữ', color: 'bg-blue-400' },
            { id: 'colors', label: 'Học Màu', color: 'bg-pink-400' },
            { id: 'shapes', label: 'Học Hình', color: 'bg-emerald-400' },
            { id: 'animals', label: 'Động Vật', color: 'bg-orange-400' }
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

      {/* Grid Container */}
      <div className="w-full max-w-4xl p-4 sm:p-6 pb-12">
        {activeTab === 'numbers' && (
          <div className="flex flex-col items-center mt-2 w-full">
            <div className="w-full max-w-sm flex items-center justify-between gap-4 bg-white/60 px-5 py-3 rounded-3xl shadow-sm border border-slate-100 mb-2">
              <span className="text-slate-700 font-bold text-lg whitespace-nowrap">
                Đến số: <span className="text-amber-500 text-2xl">{maxNumber}</span>
              </span>
              <input 
                type="range" 
                min="1" 
                max="30" 
                value={maxNumber} 
                onChange={(e) => setMaxNumber(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                style={{
                  background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(maxNumber - 1) / 29 * 100}%, #e2e8f0 ${(maxNumber - 1) / 29 * 100}%, #e2e8f0 100%)`
                }}
              />
            </div>
            <motion.div layout className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 mt-4 pb-8 w-full">
              <AnimatePresence>
                {numbersElements}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {activeTab === 'alphabet' && (
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4 mt-4 pb-8">
            {alphabetElements}
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="flex flex-col w-full mt-2">
            <div className="mb-4 bg-white/60 p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-2 justify-center">
              <span className="w-full text-center text-slate-500 text-sm font-bold mb-1">Cài đặt màu sắc:</span>
              {colorsConfig.map(color => (
                <button
                  key={`toggle-${color.id}`}
                  onClick={() => toggleConfigItem(color.id, 'colors')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                    enabledColors.includes(color.id) 
                      ? 'bg-slate-800 border-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-transparent border-slate-300 text-slate-400 hover:border-slate-400'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
            <motion.div layout className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 pb-8">
              <AnimatePresence>
                {colorsElements}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {activeTab === 'shapes' && (
          <div className="flex flex-col w-full mt-2">
            <div className="mb-4 bg-white/60 p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-2 justify-center px-4">
              <span className="w-full text-center text-slate-500 text-sm font-bold mb-1">Cài đặt hình khối:</span>
              {shapesConfig.map(shape => (
                <button
                  key={`toggle-${shape.id}`}
                  onClick={() => toggleConfigItem(shape.id, 'shapes')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-1 ${
                    enabledShapes.includes(shape.id) 
                      ? 'bg-slate-800 border-slate-800 text-white hover:bg-slate-700' 
                      : 'bg-transparent border-slate-300 text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <shape.icon size={14} className={enabledShapes.includes(shape.id) ? 'text-white' : 'text-slate-400'} />
                  {shape.name}
                </button>
              ))}
            </div>
            <motion.div layout className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 px-4">
              <AnimatePresence>
                {shapesElements}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {activeTab === 'animals' && (
          <div className="flex flex-col w-full mt-2">
            <div className="mb-4 bg-white/60 p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-wrap gap-2 justify-center px-4">
              <span className="w-full text-center text-slate-500 text-sm font-bold mb-1">Cài đặt động vật:</span>
              {animalsConfig.map(animal => (
                <button
                  key={`toggle-${animal.id}`}
                  onClick={() => toggleConfigItem(animal.id, 'animals')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all flex items-center gap-1 ${
                    enabledAnimals.includes(animal.id) 
                      ? 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600' 
                      : 'bg-transparent border-slate-300 text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <img src={animal.img} alt={animal.name} className="w-5 h-5 object-contain" />
                  {animal.name}
                </button>
              ))}
            </div>
            <motion.div layout className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 px-4">
              <AnimatePresence>
                {animalsElements}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
