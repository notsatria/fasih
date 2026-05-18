/**
 * Hand-drawn Card container.
 *
 * Props:
 *  decoration: 'tape' | 'tack' | 'none'
 *  variant: 'default' | 'postit'
 *  rotate: small rotation class e.g. 'rotate-1' | '-rotate-1' | '' (none)
 *  hover: whether to apply rotate-on-hover effect
 *  className, children
 */
export default function Card({
  decoration = 'none',
  variant = 'default',
  rotate = '',
  hover = false,
  className = '',
  children,
  ...rest
}) {
  const base = `
    relative border-[3px] border-pencil
    wobbly-md p-6
    transition-transform duration-100
    shadow-[3px_3px_0px_0px_rgba(45,45,45,0.15)]
  `;

  const variants = {
    default: 'bg-white',
    postit: 'bg-postit',
  };

  const hoverClass = hover
    ? 'hover:rotate-1 hover:shadow-[6px_6px_0px_0px_rgba(45,45,45,0.2)]'
    : '';

  return (
    <div
      className={`${base} ${variants[variant] ?? variants.default} ${rotate} ${hoverClass} ${className}`}
      {...rest}
    >
      {/* Tape decoration */}
      {decoration === 'tape' && <div className="tape" />}

      {/* Tack decoration */}
      {decoration === 'tack' && (
        <div
          className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-marker border-2 border-pencil z-10"
          aria-hidden="true"
        />
      )}

      {children}
    </div>
  );
}
