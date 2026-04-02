import React, { useState, useDeferredValue, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Square, Circle, Triangle, Hexagon, Star, Heart, Octagon, Diamond, Cloud, Sun, Moon, Sparkles, Dog, Cat, Bird, Fish, Rabbit, Turtle, Bug, Snail, Squirrel, Ghost, Pentagon, Flower, Snowflake, Droplet, Shield, Crown, Leaf, Flame,
  Umbrella, Anchor, Music, Key, Apple, Car, Plane, Bell, Camera, Trophy
} from 'lucide-react';

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
import tigerNewImg from './assets/animals/tiger_new.png';
import elephantImg from './assets/animals/elephant.png';
import giraffeImg from './assets/animals/giraffe.png';
import bearImg from './assets/animals/bear.png';
import foxImg from './assets/animals/fox.png';
import cowImg from './assets/animals/cow.png';
import lionImg from './assets/animals/lion.png';
import monkeyImg from './assets/animals/monkey.png';
import frogImg from './assets/animals/frog.png';
import zebraImg from './assets/animals/zebra.png';
import penguinImg from './assets/animals/penguin.png';
import pandaImg from './assets/animals/panda.png';
import kangarooImg from './assets/animals/kangaroo.png';
import rhinoImg from './assets/animals/rhino.png';
import hippoImg from './assets/animals/hippo.png';
import dolphinImg from './assets/animals/dolphin.png';
import sharkImg from './assets/animals/shark.png';
import owlImg from './assets/animals/owl.png';
import beeImg from './assets/animals/bee.png';
import butterflyImg from './assets/animals/butterfly.png';
import crocodileImg from './assets/animals/crocodile.png';
import antImg from './assets/animals/ant.png';
import snakeImg from './assets/animals/snake.png';

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
  { id: 'indigo', colorClass: 'bg-indigo-500', name: 'Màu chàm' },
  { id: 'teal', colorClass: 'bg-teal-500', name: 'Xanh mòng két' },
  { id: 'fuchsia', colorClass: 'bg-fuchsia-500', name: 'Màu tím đỏ' },
  { id: 'emerald', colorClass: 'bg-emerald-500', name: 'Xanh ngọc lục bảo' },
  { id: 'rose', colorClass: 'bg-rose-400', name: 'Màu hồng đào' },
  { id: 'sky', colorClass: 'bg-sky-400', name: 'Xanh da trời' },
  { id: 'amber', colorClass: 'bg-amber-500', name: 'Màu hổ phách' },
  { id: 'violet', colorClass: 'bg-violet-500', name: 'Màu hoa cà' },
  { id: 'red_dark', colorClass: 'bg-red-800', name: 'Màu đỏ đô' },
  { id: 'green_dark', colorClass: 'bg-green-800', name: 'Xanh rêu' },
  { id: 'slate', colorClass: 'bg-slate-600', name: 'Xanh đen' },
  { id: 'yellow_light', colorClass: 'bg-yellow-200', name: 'Vàng nhạt' },
  { id: 'orange_light', colorClass: 'bg-orange-300', name: 'Da cam nhạt' },
  { id: 'blue_light', colorClass: 'bg-blue-300', name: 'Xanh lơ' },
  { id: 'stone', colorClass: 'bg-stone-500', name: 'Màu đá' }
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
  { id: 'sparkles', icon: Sparkles, name: 'Tia sáng', color: 'text-yellow-400' },
  { id: 'pentagon', icon: Pentagon, name: 'Hình ngũ giác', color: 'text-teal-500' },
  { id: 'flower', icon: Flower, name: 'Bông hoa', color: 'text-rose-400' },
  { id: 'snowflake', icon: Snowflake, name: 'Bông tuyết', color: 'text-sky-300' },
  { id: 'droplet', icon: Droplet, name: 'Giọt nước', color: 'text-blue-400' },
  { id: 'shield', icon: Shield, name: 'Cái khiên', color: 'text-slate-600' },
  { id: 'crown', icon: Crown, name: 'Vương miện', color: 'text-amber-400' },
  { id: 'leaf', icon: Leaf, name: 'Cái lá', color: 'text-green-600' },
  { id: 'flame', icon: Flame, name: 'Ngọn lửa', color: 'text-orange-500' },
  { id: 'umbrella', icon: Umbrella, name: 'Cái ô', color: 'text-sky-500' },
  { id: 'anchor', icon: Anchor, name: 'Mỏ neo', color: 'text-slate-700' },
  { id: 'music', icon: Music, name: 'Nốt nhạc', color: 'text-fuchsia-500' },
  { id: 'key', icon: Key, name: 'Chìa khóa', color: 'text-amber-600' },
  { id: 'apple', icon: Apple, name: 'Quả táo', color: 'text-red-500' },
  { id: 'car', icon: Car, name: 'Ô tô', color: 'text-blue-600' },
  { id: 'plane', icon: Plane, name: 'Máy bay', color: 'text-slate-500' },
  { id: 'bell', icon: Bell, name: 'Cái chuông', color: 'text-yellow-500' },
  { id: 'camera', icon: Camera, name: 'Máy ảnh', color: 'text-zinc-600' },
  { id: 'trophy', icon: Trophy, name: 'Cúp vàng', color: 'text-amber-400' }
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
  { id: 'ghost', img: ghostImg, name: 'Con ma vui vẻ' },
  { id: 'tiger_new', img: tigerNewImg, name: 'Con hổ' },
  { id: 'elephant', img: elephantImg, name: 'Con voi' },
  { id: 'giraffe', img: giraffeImg, name: 'Hươu cao cổ' },
  { id: 'bear', img: bearImg, name: 'Con gấu' },
  { id: 'fox', img: foxImg, name: 'Con cáo' },
  { id: 'cow', img: cowImg, name: 'Bò sữa' },
  { id: 'lion', img: lionImg, name: 'Sư tử' },
  { id: 'monkey', img: monkeyImg, name: 'Con khỉ' },
  { id: 'frog', img: frogImg, name: 'Con ếch' },
  { id: 'zebra', img: zebraImg, name: 'Ngựa vằn' },
  { id: 'penguin', img: penguinImg, name: 'Chim cánh cụt' },
  { id: 'panda', img: pandaImg, name: 'Gấu trúc' },
  { id: 'kangaroo', img: kangarooImg, name: 'Chuột túi' },
  { id: 'rhino', img: rhinoImg, name: 'Tê giác' },
  { id: 'hippo', img: hippoImg, name: 'Hà mã' },
  { id: 'dolphin', img: dolphinImg, name: 'Cá heo' },
  { id: 'shark', img: sharkImg, name: 'Cá mập' },
  { id: 'owl', img: owlImg, name: 'Cú mèo' },
  { id: 'bee', img: beeImg, name: 'Con ong' },
  { id: 'butterfly', img: butterflyImg, name: 'Con bướm' },
  { id: 'crocodile', img: crocodileImg, name: 'Cá sấu' },
  { id: 'ant', img: antImg, name: 'Con kiến' },
  { id: 'snake', img: snakeImg, name: 'Con rắn' }
];

// Guess Picture Game Component
function GuessPictureGame({ speak }) {
  const [targetItem, setTargetItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [gameState, setGameState] = useState('playing'); // 'playing' | 'won'
  const [shakeWrong, setShakeWrong] = useState(false);

  const initGame = useCallback(() => {
    const allItems = [...animalsConfig, ...shapesConfig];
    if (allItems.length < 4) return;
    
    const targetIdx = Math.floor(Math.random() * allItems.length);
    const target = allItems[targetIdx];
    
    const others = allItems.filter((_, i) => i !== targetIdx);
    others.sort(() => Math.random() - 0.5);
    const wrongOptions = others.slice(0, 3);
    
    const allOptions = [target, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setTargetItem(target);
    setOptions(allOptions);
    setRevealedTiles([]);
    setGameState('playing');
  }, []);

  React.useEffect(() => {
    initGame();
  }, [initGame]);

  if (!targetItem) return null;

  const handleTileClick = (index) => {
    if (gameState !== 'playing') return;
    if (!revealedTiles.includes(index)) {
      setRevealedTiles(prev => [...prev, index]);
    }
  };

  const handleOptionClick = (item) => {
    if (gameState !== 'playing') return;
    if (item.id === targetItem.id) {
      setGameState('won');
      setRevealedTiles([0,1,2,3,4,5,6,7,8]);
      speak(targetItem.name);
    } else {
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto gap-6 sm:gap-8 mt-4 pb-8 px-4">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-700 drop-shadow-sm">Hình gì đây nhỉ?</h2>
        <p className="text-slate-500 font-bold mt-1">Mở lật các mảnh ghép và đoán nhé!</p>
      </div>

      {/* Grid Area */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-white shrink-0">
        {targetItem.img ? (
          <img 
            src={targetItem.img} 
            alt="Hidden" 
            className="absolute inset-0 w-full h-full object-contain p-6" 
          />
        ) : targetItem.icon ? (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 bg-slate-50">
             <targetItem.icon className={`w-full h-full ${targetItem.color} fill-current`} strokeWidth={2.5} />
          </div>
        ) : null}
        
        {/* The Grid Layer */}
        <div key={targetItem.id} className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0 z-10">
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.div
              key={i}
              onClick={() => handleTileClick(i)}
              initial={{ opacity: 1, rotateY: 0 }}
              animate={{ opacity: revealedTiles.includes(i) ? 0 : 1, rotateY: revealedTiles.includes(i) ? 90 : 0 }}
              transition={{ duration: 0.4 }}
              className="bg-sky-400 cursor-pointer shadow-sm flex items-center justify-center border-2 border-sky-300"
              whileHover={!revealedTiles.includes(i) ? { scale: 0.95 } : {}}
              whileTap={!revealedTiles.includes(i) ? { scale: 0.9 } : {}}
            >
              <div className="w-4 h-4 rounded-full bg-white/30" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Options Area */}
      <div className="w-full">
        {gameState === 'won' ? (
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="text-3xl sm:text-4xl font-black text-rose-500 text-center animate-bounce mt-4">
              Chính xác!
            </div>
            <button 
              onClick={initGame}
              className="px-8 py-4 mt-2 bg-emerald-500 text-white font-black text-xl sm:text-2xl rounded-full shadow-lg hover:bg-emerald-600 active:scale-95 transition-transform w-full max-w-xs border-4 border-emerald-400"
            >
              Chơi tiếp nào!
            </button>
          </motion.div>
        ) : (
          <motion.div 
            animate={shakeWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 gap-3 sm:gap-4 w-full"
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionClick(opt)}
                className="bg-white/90 backdrop-blur-sm border-4 border-white shadow-md rounded-3xl p-3 flex justify-center items-center gap-3 hover:border-amber-300 hover:shadow-lg active:scale-95 transition-all text-slate-700 font-bold"
              >
                {opt.img ? (
                  <img src={opt.img} alt={opt.name} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                ) : opt.icon ? (
                  <opt.icon className={`w-10 h-10 sm:w-14 sm:h-14 ${opt.color} fill-current`} strokeWidth={2.5} />
                ) : null}
                <span className="text-sm sm:text-lg">{opt.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

const emojipediaAnimals = [
  { id: 1, char: '🐶', name: 'Chó' }, { id: 2, char: '🐱', name: 'Mèo' }, { id: 3, char: '🐭', name: 'Chuột' }, { id: 4, char: '🐹', name: 'Chuột Hamster' },
  { id: 5, char: '🐰', name: 'Thỏ' }, { id: 6, char: '🦊', name: 'Cáo' }, { id: 7, char: '🐻', name: 'Gấu' }, { id: 8, char: '🐼', name: 'Gấu trúc' },
  { id: 9, char: '🐻‍❄️', name: 'Gấu Bắc cực' }, { id: 10, char: '🐨', name: 'Koala' }, { id: 11, char: '🐯', name: 'Hổ' }, { id: 12, char: '🦁', name: 'Sư tử' },
  { id: 13, char: '🐮', name: 'Bò sữa' }, { id: 14, char: '🐷', name: 'Heo' }, { id: 15, char: '🐸', name: 'Ếch' }, { id: 16, char: '🐵', name: 'Khỉ' },
  { id: 17, char: '🐔', name: 'Gà' }, { id: 18, char: '🐧', name: 'Chim cánh cụt' }, { id: 19, char: '🐦', name: 'Chim' }, { id: 20, char: '🐤', name: 'Gà con' },
  { id: 21, char: '🦆', name: 'Vịt' }, { id: 22, char: '🦅', name: 'Đại bàng' }, { id: 23, char: '🦉', name: 'Cú mèo' }, { id: 24, char: '🦇', name: 'Dơi' },
  { id: 25, char: '🐺', name: 'Chó sói' }, { id: 26, char: '🐗', name: 'Lợn rừng' }, { id: 27, char: '🐴', name: 'Ngựa' }, { id: 28, char: '🦄', name: 'Kỳ lân' },
  { id: 29, char: '🐝', name: 'Con ong' }, { id: 30, char: '🐛', name: 'Sâu bọ' }, { id: 31, char: '🦋', name: 'Bướm' }, { id: 32, char: '🐌', name: 'Ốc sên' },
  { id: 33, char: '🐞', name: 'Bọ rùa' }, { id: 34, char: '🐜', name: 'Kiến' }, { id: 35, char: '🦟', name: 'Muỗi' }, { id: 36, char: '🐢', name: 'Rùa' },
  { id: 37, char: '🐍', name: 'Rắn' }, { id: 38, char: '🦎', name: 'Thằn lằn' }, { id: 39, char: '🦖', name: 'Khủng long' }, { id: 40, char: '🦕', name: 'Khủng long cổ dài' },
  { id: 41, char: '🐙', name: 'Bạch tuộc' }, { id: 42, char: '🦑', name: 'Mực' }, { id: 43, char: '🦐', name: 'Tôm' }, { id: 44, char: '🦞', name: 'Tôm hùm' },
  { id: 45, char: '🦀', name: 'Cua' }, { id: 46, char: '🐡', name: 'Cá nóc' }, { id: 47, char: '🐠', name: 'Cá nhiệt đới' }, { id: 48, char: '🐟', name: 'Cá' },
  { id: 49, char: '🐬', name: 'Cá heo' }, { id: 50, char: '🐳', name: 'Cá voi' }, { id: 51, char: '🐋', name: 'Cá voi' }, { id: 52, char: '🦈', name: 'Cá mập' }, 
  { id: 53, char: '🦭', name: 'Hải cẩu' }, { id: 54, char: '🐊', name: 'Cá sấu' }, { id: 55, char: '🐅', name: 'Cọp' }, { id: 56, char: '🐆', name: 'Báo' },
  { id: 57, char: '🦓', name: 'Ngựa vằn' }, { id: 58, char: '🦍', name: 'Khỉ đột' }, { id: 59, char: '🦧', name: 'Đười ươi' }, { id: 60, char: '🐘', name: 'Voi' },
  { id: 61, char: '🦛', name: 'Hà mã' }, { id: 62, char: '🦏', name: 'Tê giác' }, { id: 63, char: '🐪', name: 'Lạc đà' }, { id: 64, char: '🦒', name: 'Hươu cao cổ' },
  { id: 65, char: '🦘', name: 'Kangaroo' }, { id: 66, char: '🐃', name: 'Trâu nước' }, { id: 67, char: '🐂', name: 'Bò tót' }, { id: 68, char: '🐑', name: 'Cừu' },
  { id: 69, char: '🐐', name: 'Dê' }, { id: 70, char: '🦌', name: 'Nai' }, { id: 71, char: '🐕', name: 'Chó nhà' }, { id: 72, char: '🐈', name: 'Mèo cưng' },
  { id: 73, char: '🐓', name: 'Gà trống' }, { id: 74, char: '🦃', name: 'Gà tây' }, { id: 75, char: '🦚', name: 'Con công' }, { id: 76, char: '🦜', name: 'Con vẹt' },
  { id: 77, char: '🦢', name: 'Thiên nga' }, { id: 78, char: '🦩', name: 'Hồng hạc' }, { id: 79, char: '🕊️', name: 'Bồ câu trắng' }, { id: 80, char: '🐇', name: 'Thỏ trắng' },
  { id: 81, char: '🦝', name: 'Gấu trúc Mỹ' }, { id: 82, char: '🦨', name: 'Chồn hôi' }, { id: 83, char: '🦡', name: 'Con lửng' }, { id: 84, char: '🦦', name: 'Rái cá' },
  { id: 85, char: '🦥', name: 'Lười' }, { id: 86, char: '🐁', name: 'Chuột nhắt' }, { id: 87, char: '🐀', name: 'Chuột cống' }, { id: 88, char: '🐿️', name: 'Sóc' },
  { id: 89, char: '🦔', name: 'Con nhím' }
];

function EmojipediaTab({ speak }) {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto gap-6 sm:gap-8 pb-12 px-2 sm:px-4 mt-4">
      <div className="w-full bg-white/70 backdrop-blur-xl p-5 sm:p-8 rounded-3xl shadow-lg border-4 border-white flex flex-col items-center gap-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-700 drop-shadow-sm text-center">Thư viện Động Vật Khổng Lồ</h2>
        <p className="text-slate-500 text-center text-sm sm:text-base font-bold max-w-2xl">
          Danh sách gần 90 con vật dễ thương đã được ứng dụng tự động liệt kê sẵn cho bé! Bé chỉ việc lướt xem và bấm vào hình để nghe tiếng Việt nhé!
        </p>
      </div>

      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 sm:gap-4 w-full mt-2">
        {emojipediaAnimals.map((icon) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.15, y: -5 }}
            onClick={() => speak(icon.name)}
            className="bg-white rounded-[2rem] p-2 sm:p-4 shadow-sm border-4 border-white flex flex-col items-center justify-center cursor-pointer hover:shadow-xl hover:border-blue-300 transition-all aspect-square group relative"
          >
            <span className="text-[3.5rem] sm:text-[4.5rem] drop-shadow-md group-hover:scale-110 transition-transform leading-none">{icon.char}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('numbers'); // 'numbers' | 'alphabet' | 'colors' | 'shapes' | 'animals'
  const [activeCardId, setActiveCardId] = useState(null);
  
  const [maxNumber, setMaxNumber] = useState(() => {
    const saved = localStorage.getItem('maxNumber');
    return saved ? parseInt(saved) : 9;
  });
  const deferredMaxNumber = useDeferredValue(maxNumber);

  // Settings State for Colors, Shapes, and Animals (init from local storage)
  const [enabledColors, setEnabledColors] = useState(() => {
    const saved = localStorage.getItem('enabledColors');
    return saved ? JSON.parse(saved) : colorsConfig.map(c => c.id);
  });
  const [enabledShapes, setEnabledShapes] = useState(() => {
    const saved = localStorage.getItem('enabledShapes');
    return saved ? JSON.parse(saved) : shapesConfig.map(s => s.id);
  });
  const [enabledAnimals, setEnabledAnimals] = useState(() => {
    const saved = localStorage.getItem('enabledAnimals');
    return saved ? JSON.parse(saved) : animalsConfig.map(a => a.id);
  });

  // Tự động lưu thiết lập của các tab vào localStorage mỗi khi có thay đổi
  React.useEffect(() => { localStorage.setItem('maxNumber', maxNumber.toString()); }, [maxNumber]);
  React.useEffect(() => { localStorage.setItem('enabledColors', JSON.stringify(enabledColors)); }, [enabledColors]);
  React.useEffect(() => { localStorage.setItem('enabledShapes', JSON.stringify(enabledShapes)); }, [enabledShapes]);
  React.useEffect(() => { localStorage.setItem('enabledAnimals', JSON.stringify(enabledAnimals)); }, [enabledAnimals]);

  // Quét các tuỳ chọn MỚI được thêm vào source code để tự động tự kích hoạt chúng (không đè lên config setting mà user đã tắt)
  React.useEffect(() => {
    const syncNewItems = (configList, stateSetter, keyPrefix) => {
      const knownKey = `known_${keyPrefix}`;
      const knownItems = JSON.parse(localStorage.getItem(knownKey) || '[]');
      const currentIds = configList.map(i => i.id);
      
      const missingIds = currentIds.filter(id => !knownItems.includes(id));
      if (missingIds.length > 0) {
        stateSetter(prev => [...prev, ...missingIds]);
      }
      
      if (missingIds.length > 0 || knownItems.length < currentIds.length) {
         localStorage.setItem(knownKey, JSON.stringify(currentIds));
      }
    };

    syncNewItems(colorsConfig, setEnabledColors, 'colors');
    syncNewItems(shapesConfig, setEnabledShapes, 'shapes');
    syncNewItems(animalsConfig, setEnabledAnimals, 'animals');
  }, []);

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

    const isActive = activeCardId?.startsWith(ttsText + '-'); // Check exact prefix since we added dash before timestamp

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
          ) : type === 'alphabet' ? (
            <div className="flex items-baseline gap-1 sm:gap-2 z-10 pointer-events-none drop-shadow-sm">
              <span className="text-5xl sm:text-7xl font-black">{item}</span>
              <span className="text-4xl sm:text-6xl font-bold opacity-60 mix-blend-overlay">{item.toLowerCase()}</span>
            </div>
          ) : (
            // Number mode
            <div className="z-10 pointer-events-none flex items-center justify-center w-full h-full p-2 sm:p-4">
              <div className="bg-white/90 text-slate-700 tracking-tighter w-[80%] h-[80%] rounded-full flex items-center justify-center shadow-sm border-4 border-white group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <span className="text-5xl sm:text-7xl font-black">
                  {item}
                </span>
              </div>
            </div>
          )}
      </motion.div>
    );
  }, [activeCardId, speak]);

  const numbersElements = useMemo(() => {
    return Array.from({ length: deferredMaxNumber + 1 }, (_, i) => i).map((item, index) => renderCard(item, index, 'number'));
  }, [deferredMaxNumber, renderCard]);

  const alphabetElements = useMemo(() => alphabetConfig.map((item, index) => renderCard(item, index, 'alphabet')), [renderCard]);
  const colorsElements = useMemo(() => colorsConfig.filter(c => enabledColors.includes(c.id)).map((item, index) => renderCard(item, index, 'colors')), [renderCard, enabledColors]);
  const shapesElements = useMemo(() => shapesConfig.filter(s => enabledShapes.includes(s.id)).map((item, index) => renderCard(item, index, 'shapes')), [renderCard, enabledShapes]);
  const animalsElements = useMemo(() => animalsConfig.filter(a => enabledAnimals.includes(a.id)).map((item, index) => renderCard(item, index, 'animals')), [renderCard, enabledAnimals]);

  return (
    <div className="w-full relative flex flex-col items-center font-kid">
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
            { id: 'animals', label: 'Động Vật', color: 'bg-orange-400' },
            { id: 'guess_picture', label: 'Đoán Hình', color: 'bg-rose-400' },
            { id: 'emojipedia', label: 'Emojipedia', color: 'bg-blue-400' }
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
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 mt-4 pb-8 w-full">
              <AnimatePresence>
                {numbersElements}
              </AnimatePresence>
            </div>
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
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 pb-8">
              <AnimatePresence>
                {colorsElements}
              </AnimatePresence>
            </div>
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
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 px-4">
              <AnimatePresence>
                {shapesElements}
              </AnimatePresence>
            </div>
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
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pb-8 px-4">
              <AnimatePresence>
                {animalsElements}
              </AnimatePresence>
            </div>
          </div>
        )}

        {activeTab === 'guess_picture' && <GuessPictureGame speak={speak} />}

        {activeTab === 'emojipedia' && <EmojipediaTab speak={speak} />}
      </div>
    </div>
  );
}
