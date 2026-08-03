import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { VerseReference } from '../types/bible';
import { useBible } from '../contexts/BibleContext';
import { formatBookName } from '../utils/bibleUtils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  verseRef: VerseReference | null;
}

const STYLES = [
  { id: 'classic', name: 'Klasik', bg: 'bg-zinc-900 text-white', border: 'border-zinc-800' },
  { id: 'serene', name: 'Biru', bg: 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white', border: 'border-blue-800' },
  { id: 'warm', name: 'Krim', bg: 'bg-amber-50 text-amber-950', border: 'border-amber-200' },
  { id: 'sunset', name: 'Fajar', bg: 'bg-gradient-to-br from-rose-900 via-purple-900 to-zinc-900 text-white', border: 'border-rose-800' },
];

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, verseRef }) => {
  const { books } = useBible();
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);
  const [copied, setCopied] = useState(false);

  if (!verseRef) return null;

  const cleanBookName = formatBookName(verseRef.bookName || verseRef.bookId, books);

  const shareText = `"${verseRef.text}"\n\n— ${cleanBookName} ${verseRef.chapter}:${verseRef.verse} (${verseRef.translation.toUpperCase()})\nVia Alunea Alkitab`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cleanBookName} ${verseRef.chapter}:${verseRef.verse}`,
          text: shareText,
        });
      } catch {
        // User cancelled or failed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] p-6 shadow-2xl z-10 text-[var(--text-primary)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles size={18} className="text-[#CD0000]" />
                Bagikan Ayat
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Verse Card Preview */}
            <div
              className={`p-6 rounded-2xl ${selectedStyle.bg} ${selectedStyle.border} border shadow-lg flex flex-col justify-between min-h-[220px] transition-all mb-5`}
            >
              <p className="font-serif text-lg leading-relaxed mb-4">
                "{verseRef.text}"
              </p>
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs tracking-wide">
                <span className="font-bold">
                  {cleanBookName} {verseRef.chapter}:{verseRef.verse}
                </span>
                <span className="opacity-75 uppercase font-medium">
                  {verseRef.translation.toUpperCase()} • Alunea Alkitab
                </span>
              </div>
            </div>

            {/* Style Choices */}
            <div className="mb-6">
              <label className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-wider mb-2.5 block">
                Tema Kartu
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {STYLES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyle(st)}
                    className={`h-11 rounded-2xl text-xs font-bold flex items-center justify-center transition-all duration-200 ${
                      selectedStyle.id === st.id
                        ? 'bg-[#CD0000] text-white'
                        : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000] text-[var(--text-primary)] font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#CD0000] hover:bg-[#A60000] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200"
              >
                <Share2 size={18} />
                <span>Bagikan</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
