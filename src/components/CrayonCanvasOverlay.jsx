import React, { useRef, useEffect, useState } from 'react';
import { Trash2, X, Check, Paintbrush } from 'lucide-react';
import { playComicSFX } from '../utils/audioSFX';

export default function CrayonCanvasOverlay({ isActive, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FFDD00');
  const [brushSize, setBrushSize] = useState(14);
  const lastPos = useRef({ x: 0, y: 0 });

  const colors = [
    { name: 'Sunburst Yellow', hex: '#FFDD00' },
    { name: 'Crimson Red', hex: '#E52535' },
    { name: 'Electric Cyan', hex: '#00FFFF' },
    { name: 'Neon Purple', hex: '#FF00FF' },
    { name: 'Black Ink', hex: '#000000' },
    { name: 'White Chalk', hex: '#FFFFFF' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (!isActive) return null;

  const startDrawing = (e) => {
    setIsDrawing(true);
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    lastPos.current = { x, y };
    playComicSFX('ZAP');
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX);
    const currentY = e.clientY || (e.touches && e.touches[0].clientY);

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.85;

    // Simulate wax crayon texture with slight jitter offset
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    // Wax crayon grainy splatter
    for (let i = 0; i < 4; i++) {
      const offsetX = (Math.random() - 0.5) * brushSize * 0.8;
      const offsetY = (Math.random() - 0.5) * brushSize * 0.8;
      ctx.fillStyle = color;
      ctx.fillRect(currentX + offsetX, currentY + offsetY, 2, 2);
    }

    lastPos.current = { x: currentX, y: currentY };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      playComicSFX('POW');
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full cursor-crosshair"
      />

      {/* Crayon Floating Palette Box */}
      <div className="absolute top-20 right-6 bg-[#121212] text-white border-4 border-black p-4 rounded-xl shadow-[8px_8px_0_#000] flex flex-col gap-3 z-50">
        
        <div className="flex items-center justify-between border-b-2 border-white/20 pb-2">
          <span className="font-bangers text-lg text-[#FFDD00] flex items-center gap-1.5">
            <Paintbrush size={18} /> CRAYON PALETTE
          </span>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
            <X size={18} />
          </button>
        </div>

        {/* Color Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => { setColor(c.hex); playComicSFX('WHOOSH'); }}
              style={{ backgroundColor: c.hex }}
              className={`w-9 h-9 rounded-full border-2 border-black shadow-[2px_2px_0_#000] flex items-center justify-center transition-transform ${
                color === c.hex ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'
              }`}
              title={c.name}
            >
              {color === c.hex && <Check size={16} className={c.hex === '#FFFFFF' || c.hex === '#FFDD00' ? 'text-black' : 'text-white'} />}
            </button>
          ))}
        </div>

        {/* Brush Size Range */}
        <div className="flex flex-col gap-1 pt-1">
          <span className="font-marker text-xs text-white/80">BRUSH SIZE: {brushSize}px</span>
          <input 
            type="range" 
            min="6" 
            max="30" 
            value={brushSize} 
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="accent-[#FFDD00] cursor-pointer"
          />
        </div>

        {/* Clear Canvas */}
        <button
          onClick={clearCanvas}
          className="font-bangers text-sm bg-[#E52535] text-white px-3 py-1.5 border-2 border-black shadow-[3px_3px_0_#000] hover:bg-red-600 flex items-center justify-center gap-1.5 transition-all mt-1"
        >
          <Trash2 size={14} />
          <span>CLEAR SCRATCH</span>
        </button>

      </div>

    </div>
  );
}
