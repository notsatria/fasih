import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation.jsx';
import Button from './Button.jsx';

export default function ApiKeyModal() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('fasih-gemini-key');
    if (!stored) setOpen(true);
  }, []);

  function handleSave() {
    if (!key.trim()) {
      setError('Please enter a valid API key.');
      return;
    }
    localStorage.setItem('fasih-gemini-key', key.trim());
    setOpen(false);
    setError('');
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(253,251,247,0.92)' }}
    >
      <div
        className="relative bg-white border-[3px] border-pencil wobbly-md p-8 w-full max-w-md"
        style={{ boxShadow: '8px 8px 0px 0px #2d2d2d' }}
      >
        {/* Tack decoration */}
        <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-marker border-[2px] border-pencil z-10" />

        {/* Icon */}
        <div className="text-center mb-4">
          <span className="text-5xl">🔑</span>
        </div>

        <h2 className="font-heading text-2xl text-pencil text-center mb-2">
          {t('common.api_key_title')}
        </h2>
        <p className="font-body text-pencil/70 text-center text-sm mb-6">
          {t('common.api_key_desc')}
        </p>

        <input
          type="password"
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          placeholder={t('common.api_key_placeholder')}
          className="
            w-full px-4 py-3 mb-1
            font-body text-base text-pencil
            bg-paper border-[2px] border-pencil
            outline-none
            placeholder:text-pencil/40
            focus:border-pen focus:ring-2 focus:ring-pen/20
          "
          style={{ borderRadius: '225px 15px 255px 15px / 15px 255px 15px 225px' }}
        />

        {error && (
          <p className="font-body text-marker text-sm mb-3">{error}</p>
        )}

        <Button
          variant="primary"
          size="lg"
          onClick={handleSave}
          className="w-full mt-4"
        >
          {t('common.api_key_save')}
        </Button>

        <p className="font-body text-xs text-pencil/50 text-center mt-4">
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="text-pen hover:underline inline-flex items-center gap-1"
          >
            {t('common.api_key_link')}
            <ExternalLink size={12} strokeWidth={2.5} />
          </a>
        </p>
      </div>
    </div>
  );
}
