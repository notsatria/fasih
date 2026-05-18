/**
 * PageHeader — consistent page title section.
 *
 * Props:
 *  title: string
 *  subtitle: string
 *  decoration: React node (optional SVG / emoji decorative element)
 *  align: 'left' | 'center'
 *  className
 */
export default function PageHeader({
  title,
  subtitle,
  decoration,
  align = 'center',
  className = '',
}) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <div className={`relative pt-10 pb-6 ${alignClass} ${className}`}>
      {/* Optional decorative element */}
      {decoration && (
        <div className="hidden md:block absolute right-8 top-8 animate-bounce-gentle">
          {decoration}
        </div>
      )}

      <h1 className="font-heading text-4xl md:text-5xl text-pencil leading-tight">
        {title}
      </h1>

      {subtitle && (
        <p className="font-body text-lg md:text-xl text-pencil/70 mt-3 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}

      {/* Marker underline accent */}
      <div
        className="mx-auto mt-4 h-[3px] bg-marker"
        style={{
          width: align === 'center' ? '80px' : '60px',
          marginLeft: align === 'left' ? '0' : 'auto',
          borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
        }}
      />
    </div>
  );
}
