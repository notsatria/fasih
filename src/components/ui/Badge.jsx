/**
 * Hand-drawn Badge / pill component.
 *
 * Props:
 *  variant: 'filler' | 'category' | 'success' | 'warning' | 'neutral' | 'star-detected' | 'star-partial' | 'star-missing'
 *  size: 'sm' | 'md'
 *  className, children
 */
export default function Badge({
  variant = 'neutral',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const base = `
    inline-flex items-center justify-center
    border-[2px] border-pencil font-body font-bold
    wobbly-sm select-none
  `;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const variants = {
    filler:        'bg-marker text-white border-pencil',
    category:      'bg-pen text-white border-pencil',
    success:       'bg-[#0F6E56] text-white border-pencil',
    warning:       'bg-[#854F0B] text-white border-pencil',
    neutral:       'bg-erased text-pencil border-pencil',
    postit:        'bg-postit text-pencil border-pencil',
    // STAR variants
    'star-detected': 'bg-[#0F6E56] text-white border-pencil',
    'star-partial':  'bg-[#854F0B] text-white border-pencil',
    'star-missing':  'bg-erased text-pencil border-pencil',
  };

  return (
    <span
      className={`${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.neutral} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
