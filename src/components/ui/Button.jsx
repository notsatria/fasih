import { forwardRef } from 'react';

/**
 * Hand-drawn Button component with wobbly borders and hard offset shadow.
 *
 * Props:
 *  variant: 'primary' | 'secondary' | 'danger'
 *  size: 'sm' | 'md' | 'lg'
 *  disabled, loading, onClick, children, className, type
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    children,
    className = '',
    type = 'button',
    ...rest
  },
  ref
) {
  const base = `
    relative inline-flex items-center justify-center
    font-body border-[3px] border-pencil
    wobbly cursor-pointer select-none
    transition-all duration-100
    active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `;

  const sizes = {
    sm: 'px-4 py-2 text-base min-h-[40px]',
    md: 'px-6 py-3 text-lg min-h-[48px]',
    lg: 'px-8 py-4 text-xl min-h-[56px]',
  };

  const variants = {
    primary: `
      bg-white text-pencil
      shadow-[4px_4px_0px_0px_#2d2d2d]
      hover:bg-marker hover:text-white
      hover:shadow-[2px_2px_0px_0px_#2d2d2d]
      hover:translate-x-[2px] hover:translate-y-[2px]
    `,
    secondary: `
      bg-erased text-pencil
      shadow-[4px_4px_0px_0px_#2d2d2d]
      hover:bg-pen hover:text-white
      hover:shadow-[2px_2px_0px_0px_#2d2d2d]
      hover:translate-x-[2px] hover:translate-y-[2px]
    `,
    danger: `
      bg-marker text-white
      shadow-[4px_4px_0px_0px_#2d2d2d]
      hover:shadow-[2px_2px_0px_0px_#2d2d2d]
      hover:translate-x-[2px] hover:translate-y-[2px]
    `,
    ghost: `
      bg-transparent text-pencil border-dashed
      hover:bg-erased
    `,
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
});

export default Button;
