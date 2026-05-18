/**
 * Hand-drawn Skeleton loading placeholder.
 *
 * Props:
 *  variant: 'line' | 'card' | 'circle' | 'bar'
 *  className
 *  lines: number (for 'line' variant, renders multiple lines)
 */
export default function Skeleton({ variant = 'line', lines = 1, className = '' }) {
  const base = 'animate-skeleton bg-erased border-[2px] border-pencil/30';

  if (variant === 'circle') {
    return (
      <div
        className={`${base} ${className}`}
        style={{
          width: '128px', height: '128px',
          borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
        }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`${base} wobbly-md p-6 space-y-3 ${className}`}
        style={{ minHeight: '140px' }}
      >
        <div className={`${base} h-5 rounded-full`} style={{ width: '60%' }} />
        <div className={`${base} h-4 rounded-full`} style={{ width: '100%' }} />
        <div className={`${base} h-4 rounded-full`} style={{ width: '80%' }} />
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex justify-between">
          <div className={`${base} h-4 rounded-full`} style={{ width: '30%' }} />
          <div className={`${base} h-4 rounded-full`} style={{ width: '10%' }} />
        </div>
        <div
          className={`${base} h-4`}
          style={{
            width: '100%',
            borderRadius: '225px 15px 255px 15px / 15px 255px 15px 225px',
          }}
        />
      </div>
    );
  }

  // Default: lines
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${base} h-4 rounded-full`}
          style={{ width: i === lines - 1 ? '70%' : '100%' }}
        />
      ))}
    </div>
  );
}
