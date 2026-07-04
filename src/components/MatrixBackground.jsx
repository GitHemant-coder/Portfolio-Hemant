import React, { useEffect, useRef, useState } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    // Listen for dark class changes on the html tag
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isDark) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dynamic set of binary and coding characters
    const matrixChars = "01010101010101010101010101010101010101010101010101010101010101010101".split("");
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    
    // Initialize drops out of view to avoid all dropping at same time
    const rainDrops = Array.from({ length: columns }).map(() => Math.floor(Math.random() * -100));

    const draw = () => {
      // Semi-transparent black background to produce trail effect
      ctx.fillStyle = 'rgba(12, 10, 9, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(34, 197, 94, 0.16)'; // Hacky emerald green rain
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop back to top after it goes past the bottom
        if (y > canvas.height && Math.random() > 0.98) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 transition-opacity duration-1000"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
