import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation.jsx';

export default function Navbar() {
  const { t, lang, toggleLang } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/speaking',   label: t('nav.speaking') },
    { to: '/interview',  label: t('nav.interview') },
    { to: '/vocabulary', label: t('nav.vocabulary') },
    { to: '/daily',      label: t('nav.daily') },
  ];

  const linkClass = ({ isActive }) =>
    `font-body text-lg transition-colors duration-100 relative pb-0.5
    ${isActive
      ? 'text-marker wavy-underline font-bold'
      : 'text-pencil hover:text-marker'
    }`;

  return (
    <header
      className="sticky top-0 z-40 bg-paper"
      style={{ borderBottom: '2px dashed #2d2d2d' }}
    >
      <nav className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          className="font-heading text-3xl text-pencil hover:text-marker transition-colors duration-100"
          style={{ lineHeight: 1 }}
        >
          Fasih
          <span
            className="block h-[3px] bg-marker mt-[-2px]"
            style={{
              borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
              width: '70%',
            }}
          />
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right side: lang toggle + mobile menu */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="
              font-body font-bold text-sm px-3 py-1
              border-[2px] border-pencil
              bg-white text-pencil wobbly-sm
              shadow-[2px_2px_0px_0px_#2d2d2d]
              hover:bg-pen hover:text-white
              hover:shadow-[1px_1px_0px_0px_#2d2d2d]
              hover:translate-x-[1px] hover:translate-y-[1px]
              active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
              transition-all duration-100
            "
          >
            {lang === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 text-pencil"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <X size={24} strokeWidth={2.5} />
              : <Menu size={24} strokeWidth={2.5} />
            }
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden bg-paper border-t-2 border-dashed border-pencil px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
