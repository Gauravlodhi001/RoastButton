import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Ghost, MousePointerClick, Zap } from 'lucide-react';

// A mix of generic, coding, and gaming roasts
const ROASTS = [
  "Click me again, I dare you.",
  "Is that all you got?",
  "You click like a backend developer designs UI.",
  "Even your Minecraft server has better uptime than your attention span.",
  "Go touch grass. Seriously.",
  "I've seen better aim from a stormtrooper.",
  "You're chasing this button like it's the One Piece.",
  "Your browser called, it wants to crash just to get away from you.",
  "Are you debugging? Because you're making no progress.",
  "404: Life not found.",
  "Stop clicking and go fix your compile errors.",
  "I bet you use light mode IDEs.",
];

export default function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Click me if you dare...");
  const [isAnnoyed, setIsAnnoyed] = useState(false);
  
  // Controls the button's physical position
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = () => {
    // 1. Increment click count
    const newCount = count + 1;
    setCount(newCount);

    // 2. Trigger Confetti if you catch the button while it's annoyed
    if (isAnnoyed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff0000', '#ffa500', '#ffffff']
      });
      setMessage("OKAY OKAY! YOU CAUGHT ME! 🏆");
      setIsAnnoyed(false); // Reset anger
      setPosition({ x: 0, y: 0 }); // Reset position
      return;
    }

    // 3. Normal Roast Logic
    const randomRoast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    setMessage(randomRoast);

    // 4. Trigger "Annoyed Mode" after 5 clicks
    if (newCount >= 5) {
      setIsAnnoyed(true);
      setMessage("ALRIGHT, THAT'S IT! 😡 TRY CLICKING NOW!");
    }
  };

  const handleHover = () => {
    // Only run away if the button is annoyed
    if (isAnnoyed) {
      // Calculate random X and Y values between -300 and 300
      const x = Math.random() * 600 - 300; 
      const y = Math.random() * 600 - 300;
      
      setPosition({ x, y });
      
      // Add a taunt while running away
      const taunts = ["Missed me!", "Too slow!", "Lagging?", "Nope!","Bhai tu rhenae dae", "U can now sit next to Trash", "dont u have any self respect"];
      setMessage(taunts[Math.floor(Math.random() * taunts.length)]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 overflow-hidden relative">
      
      {/* Background decoration */}
      <div className="absolute top-10 left-10 opacity-20 animate-pulse">
        <Zap size={100} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 animate-bounce">
        <Ghost size={100} />
      </div>

      {/* Score Counter */}
      <div className="absolute bottom-10 right-5 text-gray-500 font-mono text-sm">
        Clicks: {count}
      </div>

      {/* The Roast Message */}
      <motion.h1 
        key={message} // Re-animates when text changes
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-3xl md:text-5xl font-bold text-center mb-40 h-32 flex items-center justify-center
          ${isAnnoyed ? 'text-red-500 font-black tracking-widest' : 'text-blue-400'}
        `}
      >
        {message}
      </motion.h1>

      {/* The Button */}
      <motion.button
        animate={position} // Connects Framer Motion to our state
        transition={{ type: "spring", stiffness: 300, damping: 20 }} // Makes movement snappy
        onHoverStart={handleHover} // Triggers when mouse touches button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        className={`
          relative px-8 py-4 rounded-full text-xl font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)]
          transition-colors duration-200 flex items-center gap-2 select-none
          ${isAnnoyed 
            ? 'bg-red-600 hover:bg-red-700 text-white animate-shake' 
            : 'bg-blue-600 hover:bg-blue-500 text-white'
          }
        `}
      >
        {isAnnoyed ? <Flame /> : <MousePointerClick />}
        {isAnnoyed ? "CATCH ME!" : "ROAST ME"}
      </motion.button>

    </div>
  );
}