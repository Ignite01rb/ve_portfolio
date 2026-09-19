import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { getVideoUrl } from '../utils/videoUtils';

export default function VideoModal({ isOpen, project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const rawUrl = project.video || '';
  const encodedUrl = getVideoUrl(rawUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#0A0A0A] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform"
          aria-label="Close Video Modal"
        >
          <X size={20} />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video 
            key={encodedUrl}
            controls 
            autoPlay 
            poster={project.img}
            className="w-full h-full object-contain"
          >
            <source src={encodedUrl} type={rawUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
            <source src={encodedUrl} />
            {rawUrl.includes('Timeline 1') && (
              <source src={getVideoUrl('videos/Timeline 1.mov')} type="video/quicktime" />
            )}
            Your browser does not support HTML5 video playback.
          </video>
        </div>

        {/* Video Details */}
        <div className="p-6 md:p-8 flex flex-col gap-2">
          <span className="font-accent text-xs font-extrabold tracking-widest text-white/60">
            {project.client} • {project.year || '2026'}
          </span>
          <h3 className="font-heading font-extrabold text-2xl tracking-tight text-white">
            {project.title}
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">
            {project.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
