import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Hand-drawn Modal dialog.
 *
 * Props:
 *  open: boolean
 *  onClose: () => void
 *  title: string
 *  children
 *  className
 */
export default function Modal({ open, onClose, title, children, className = '' }) {
  const dialogRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && open) onClose?.();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Trap focus
  useEffect(() => {
    if (open) dialogRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(253,251,247,0.85)' }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative bg-white border-[3px] border-pencil wobbly-md p-8 w-full max-w-lg outline-none ${className}`}
        style={{ boxShadow: '8px 8px 0px 0px #2d2d2d' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Tack close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[-10px] right-4 w-7 h-7 rounded-full bg-marker border-2 border-pencil flex items-center justify-center text-white font-bold text-sm hover:scale-110 transition-transform"
        >
          ×
        </button>

        {title && (
          <h2 id="modal-title" className="font-heading text-2xl mb-4 text-pencil">
            {title}
          </h2>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}
