import { useEffect, useRef, useState } from 'react';

/**
 * Hand-drawn animated ProgressBar for score display.
 *
 * Props:
 *  value: 0–100
 *  label: string (dimension name)
 *  color: 'marker' | 'pen' | 'success' | 'warning'
 *  showValue: boolean (default true)
 *  className
 */
export default function ProgressBar({
  value = 0,
  label = '',
  color = 'pen',
  showValue = true,
  className = '',
}) {
  const [displayed, setDisplayed] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    // Animate fill from 0 to value on mount
    const start = performance.now();
    const duration = 800;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    }

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [value]);

  const colors = {
    marker:  'bg-marker',
    pen:     'bg-pen',
    success: 'bg-[#0F6E56]',
    warning: 'bg-[#854F0B]',
  };

  const scoreColors = {
    marker:  'text-marker',
    pen:     'text-pen',
    success: 'text-[#0F6E56]',
    warning: 'text-[#854F0B]',
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-pencil">{label}</span>
        {showValue && (
          <span className={`font-heading text-lg font-bold ${scoreColors[color] ?? scoreColors.pen}`}>
            {displayed}
          </span>
        )}
      </div>
      {/* Track */}
      <div
        className="relative h-4 border-[2px] border-pencil overflow-hidden"
        style={{ borderRadius: '225px 15px 255px 15px / 15px 255px 15px 225px' }}
      >
        {/* Fill */}
        <div
          className={`h-full ${colors[color] ?? colors.pen} transition-none`}
          style={{ width: `${displayed}%` }}
        />
        {/* Dashed overlay for sketchy feel */}
        <div
          className="absolute inset-0 border-dashed border-[1px] border-white opacity-30 pointer-events-none"
          style={{ borderRadius: 'inherit' }}
        />
      </div>
    </div>
  );
}
