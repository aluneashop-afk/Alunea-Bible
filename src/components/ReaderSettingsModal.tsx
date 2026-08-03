import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Type, Moon, Sun, Coffee, Monitor } from 'lucide-react';
import { useBible } from '../contexts/BibleContext';
import { FontFamily, LayoutMode, ThemeMode } from '../types/bible';

interface ReaderSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderSettingsModal: React.FC<ReaderSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { settings, updateSettings, theme, setTheme } = useBible();

  if (!isOpen) return null;

  const handleFontSizeChange = (delta: number) => {
    const newSize = Math.max(14, Math.min(28, settings.fontSize + delta));
    updateSettings({ fontSize: newSize });
  };

  const handleLineHeightChange = (val: number) => {
    updateSettings({ lineHeight: val });
  };

  const handleFontFamilyChange = (font: FontFamily) => {
    updateSettings({ fontFamily: font });
  };

  const handleLayoutModeChange = (mode: LayoutMode) => {
    updateSettings({ layoutMode: mode });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          className="relative w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] p-6 shadow-2xl z-10 text-[var(--text-primary)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <Type size={18} className="text-[#CD0000]" />
              Tampilan Membaca
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-5">
            {/* Theme Selector */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5 block">
                Tema Warna
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 text-xs font-bold transition-all duration-200 ${
                    theme === 'light'
                      ? 'bg-[#CD0000] text-white'
                      : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Sun size={16} />
                  Terang
                </button>

                <button
                  onClick={() => setTheme('sepia')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 text-xs font-bold transition-all duration-200 ${
                    theme === 'sepia'
                      ? 'bg-[#CD0000] text-white'
                      : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Coffee size={16} />
                  Sepia
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 text-xs font-bold transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-[#CD0000] text-white'
                      : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Moon size={16} />
                  Gelap
                </button>

                <button
                  onClick={() => setTheme('system')}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1.5 text-xs font-bold transition-all duration-200 ${
                    theme === 'system'
                      ? 'bg-[#CD0000] text-white'
                      : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Monitor size={16} />
                  Sistem
                </button>
              </div>
            </div>

            {/* Font Size Adjuster */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)]">
                  Ukuran Huruf
                </label>
                <span className="text-xs font-extrabold text-[var(--text-primary)]">
                  {settings.fontSize}px
                </span>
              </div>
              <div className="flex items-center gap-3 bg-[var(--bg-card-secondary)] border border-[var(--border-color)] p-2 rounded-2xl">
                <button
                  onClick={() => handleFontSizeChange(-1)}
                  className="p-2 rounded-xl bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[#CD0000]"
                  aria-label="Kecilkan ukuran huruf"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 text-center font-serif text-sm font-medium text-[var(--text-primary)]">
                  Aa (Contoh Teks)
                </div>
                <button
                  onClick={() => handleFontSizeChange(1)}
                  className="p-2 rounded-xl bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[#CD0000]"
                  aria-label="Besarkan ukuran huruf"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Font Family Selector */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 block">
                Jenis Huruf
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleFontFamilyChange('sans')}
                  className={`p-2.5 rounded-xl border text-xs font-sans font-bold transition-all duration-200 ${
                    settings.fontFamily === 'sans'
                      ? 'bg-[#CD0000] text-white border-transparent'
                      : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Sans-Serif
                </button>
                <button
                  onClick={() => handleFontFamilyChange('serif')}
                  className={`p-2.5 rounded-xl border text-xs font-serif font-bold transition-all duration-200 ${
                    settings.fontFamily === 'serif'
                      ? 'bg-[#CD0000] text-white border-transparent'
                      : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Serif
                </button>
                <button
                  onClick={() => handleFontFamilyChange('mono')}
                  className={`p-2.5 rounded-xl border text-xs font-mono font-bold transition-all duration-200 ${
                    settings.fontFamily === 'mono'
                      ? 'bg-[#CD0000] text-white border-transparent'
                      : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Monospace
                </button>
              </div>
            </div>

            {/* Layout Mode */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 block">
                Tata Letak Bacaan
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleLayoutModeChange('verse-by-verse')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                    settings.layoutMode === 'verse-by-verse'
                      ? 'bg-[#CD0000] text-white border-transparent'
                      : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Ayat per baris
                </button>
                <button
                  onClick={() => handleLayoutModeChange('paragraph')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                    settings.layoutMode === 'paragraph'
                      ? 'bg-[#CD0000] text-white border-transparent'
                      : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  Tampilan Paragraf
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
