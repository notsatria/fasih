import { useEffect, useState } from 'react';

/**
 * Organic ScoreCircle — asymmetric shape with animated count-up.
 *
 * Props:
 *  value: 0–100
 *  label: string
 *  size: 'sm' | 'md' | 'lg'
 *  className
 */
export default function ScoreCircle({ value = 0, label = '', size = 'md', className = '' }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 900;
    let raf;

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  // Color based on score range
  const color =
    value >= 80 ? '#0F6E56'
    : value >= 60 ? '#854F0B'
    : '#ff4d4d';

  const sizes = {
    sm: { outer: 'w-20 h-20', score: 'text-2xl', lbl: 'text-xs', mt: 'mt-1' },
    md: { outer: 'w-32 h-32', score: 'text-4xl', lbl: 'text-sm', mt: 'mt-2' },
    lg: { outer: 'w-44 h-44', score: 'text-5xl', lbl: 'text-base', mt: 'mt-2' },
  };

  const s = sizes[size] ?? sizes.md;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`${s.outer} flex items-center justify-center border-[3px] border-pencil bg-white`}
        style={{
          borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
          boxShadow: `6px 6px 0px 0px ${color}`,
        }}
      >
        <span
          className={`font-heading font-bold ${s.score}`}
          style={{ color }}
        >
          {displayed}
        </span>
      </div>
      {label && (
        <span className={`font-body ${s.lbl} text-pencil/70 ${s.mt}`}>
          {label}
        </span>
      )}
    </div>
  );
}
