import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Square, Sparkles } from 'lucide-react';

/* ==========================================================================
   SUB-COMPONENT: VoiceVisualizerCanvas
   Renders smooth Bezier waves on a canvas, scaling height with active speaking.
   ========================================================================== */
function VoiceVisualizerCanvas({ isSpeaking, targetHeight }) {
  const canvasRef = useRef(null);
  const currentHeightRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth || 280;
      canvas.height = 60;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Interpolate current wave height toward targetHeight (smooth ease)
      const diff = targetHeight - currentHeightRef.current;
      currentHeightRef.current += diff * 0.12;

      const amp = currentHeightRef.current;
      const midY = canvas.height / 2;

      // Draw 3 layered waves with different colors, speeds, and offset phases
      const waves = [
        { strokeStyle: 'rgba(193, 98, 61, 0.55)', speed: 0.12, offset: 0 },
        { strokeStyle: 'rgba(168, 184, 154, 0.45)', speed: -0.08, offset: Math.PI / 3 },
        { strokeStyle: 'rgba(185, 174, 212, 0.35)', speed: 0.15, offset: Math.PI / 1.5 }
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.strokeStyle = w.strokeStyle;
        ctx.lineWidth = 1.8;

        for (let x = 0; x < canvas.width; x++) {
          // Combined sine-wave formula for organic, non-uniform wave look
          const radians = (x / canvas.width) * Math.PI * 2.5 + phase * w.speed + w.offset;
          const sine = Math.sin(radians) * 0.7 + Math.sin(radians * 2) * 0.3;
          const y = midY + sine * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      phase += 0.8;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [targetHeight]);

  return <canvas ref={canvasRef} className="w-full h-[60px]" />;
}

/* ==========================================================================
   MAIN EXPORT: VoiceTourWidget
   Manages speech synthesis and renders floating player with live captions.
   ========================================================================== */
export default function VoiceTourWidget({ onClose }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [caption, setCaption] = useState('');
  const [waveHeight, setWaveHeight] = useState(2); // idle height
  const utterRef = useRef(null);
  const timerRef = useRef(null);

  const fullText = "Hi there! Welcome to my developer portfolio. I'm a final-year IT student and software developer based in Mumbai, India. I specialize in full-stack MERN, Python, Django backend, and engineering intelligent AI calling agents and n8n pipelines. I've finished four developer internships and love shipping actual projects. Feel free to explore my project sandboxes, or try out my developer terminal below. Let's connect and build something awesome together!";

  useEffect(() => {
    // 1. Prepare SpeechSynthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Reset any active speech

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterRef.current = utterance;

      // Select voice: Prefer high-quality US English
      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Natural')) || 
                      voices.find(v => v.lang.startsWith('en-US')) ||
                      voices.find(v => v.lang.startsWith('en'));
      if (usVoice) utterance.voice = usVoice;

      utterance.rate = 1.02; // natural pace
      utterance.pitch = 1.05;
      utterance.volume = isMuted ? 0 : 1.0;

      // Word boundary callback for closed caption text typing and waveform amplitude scaling
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const wordLength = event.charLength;
          
          // Compute dynamic caption excerpt (show current word and surrounding phrase)
          const wordList = fullText.split(' ');
          const sliceText = fullText.substr(0, charIndex + wordLength);
          const currentWordCount = sliceText.split(' ').length - 1;
          const phraseStart = Math.max(0, currentWordCount - 3);
          const phraseEnd = Math.min(wordList.length, currentWordCount + 8);
          const phrase = wordList.slice(phraseStart, phraseEnd).join(' ');

          setCaption(phrase + "...");

          // Procedural amplitude bounce on word start
          setWaveHeight(12 + Math.random() * 15);
          
          // Settle amplitude back down slightly after 180ms
          if (timerRef.current) clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => {
            setWaveHeight(5 + Math.random() * 4);
          }, 180);
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setWaveHeight(2);
        setCaption("Tour complete. Thanks for listening!");
        setTimeout(() => onClose(), 2500);
      };

      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        setIsPlaying(false);
        setWaveHeight(2);
      };

      // Speak!
      window.speechSynthesis.speak(utterance);
    } else {
      // Offline fallback: simulated captions typing
      let wIdx = 0;
      const wordList = fullText.split(' ');
      const textInterval = setInterval(() => {
        if (wIdx < wordList.length) {
          const phraseStart = Math.max(0, wIdx - 3);
          const phraseEnd = Math.min(wordList.length, wIdx + 8);
          setCaption(wordList.slice(phraseStart, phraseEnd).join(' ') + "...");
          setWaveHeight(10 + Math.random() * 15);
          wIdx++;
        } else {
          clearInterval(textInterval);
          setIsPlaying(false);
          setWaveHeight(2);
          setCaption("Tour complete. Thanks for listening!");
          setTimeout(() => onClose(), 2500);
        }
      }, 350);

      return () => clearInterval(textInterval);
    }

    return () => {
      window.speechSynthesis.cancel();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onClose]);

  // Adjust volume / mute dynamically
  useEffect(() => {
    if (utterRef.current) {
      utterRef.current.volume = isMuted ? 0 : 1.0;
    }
  }, [isMuted]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    onClose();
  };

  return (
    <div className="fixed bottom-24 right-6 sm:right-8 z-50 max-w-sm w-[340px] bg-card/92 backdrop-blur-md border border-line rounded-2xl p-4 shadow-2xl animate-chat-open flex flex-col gap-3 font-sans text-ink">
      <div className="flex justify-between items-center border-b border-line/10 pb-2">
        <span className="font-mono text-[9px] font-bold text-terracotta-deep uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles size={11} className="animate-spin text-terracotta" /> AI VOICE COMPANION
        </span>
        <span className="text-[10px] text-ink-soft/75 font-mono">Status: {isPlaying ? 'SPEAKING' : 'IDLE'}</span>
      </div>

      {/* Visualizer wave rendering */}
      <div className="bg-cream/40 rounded-xl overflow-hidden border border-line/20 py-2.5 px-3 flex flex-col items-center">
        <VoiceVisualizerCanvas isSpeaking={isPlaying} targetHeight={waveHeight} />
      </div>

      {/* Captions Display Box */}
      <div className="bg-cream2/60 border border-line/35 rounded-xl px-3.5 py-3 min-h-[58px] flex items-center justify-center text-center">
        <p className="text-[11.5px] italic font-semibold text-ink-soft leading-relaxed transition-all duration-300">
          {caption || "Connecting voice stream..."}
        </p>
      </div>

      {/* Controller Buttons */}
      <div className="flex justify-between items-center pt-1">
        <div className="flex gap-2">
          <button
            onClick={handleMuteToggle}
            className="w-9 h-9 rounded-xl bg-cream2 hover:bg-line flex items-center justify-center cursor-pointer transition-colors border-none"
            title={isMuted ? "Unmute Voice" : "Mute Voice"}
          >
            {isMuted ? <VolumeX size={15} className="text-red-500" /> : <Volume2 size={15} className="text-ink" />}
          </button>
          <button
            onClick={handleStop}
            className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center cursor-pointer transition-colors border-none"
            title="Stop Tour"
          >
            <Square size={14} className="text-red-500 fill-red-500" />
          </button>
        </div>

        <button
          onClick={handleStop}
          className="bg-ink hover:bg-terracotta text-cream hover:text-white transition-colors px-4 py-1.8 rounded-xl text-xs font-bold border-none cursor-pointer active:scale-95 shadow-sm"
        >
          Dismiss Tour
        </button>
      </div>
    </div>
  );
}
