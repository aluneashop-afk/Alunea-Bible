import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bookmark,
  BookmarkCheck,
  Copy,
  Share2,
  X,
  Check,
  Info,
} from 'lucide-react';
import { HighlightColor, VerseReference } from '../types/bible';
import { useBible } from '../contexts/BibleContext';
import { formatBookName } from '../utils/bibleUtils';

interface VerseBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  verseRef: VerseReference | null;
  onOpenShare: (verseRef: VerseReference) => void;
}

const HIGHLIGHT_COLORS: { id: HighlightColor; bgClass: string; label: string }[] = [
  { id: 'yellow', bgClass: 'bg-yellow-400', label: 'Kuning' },
  { id: 'green', bgClass: 'bg-emerald-400', label: 'Hijau' },
  { id: 'blue', bgClass: 'bg-sky-400', label: 'Biru' },
  { id: 'purple', bgClass: 'bg-purple-400', label: 'Ungu' },
  { id: 'red', bgClass: 'bg-rose-500', label: 'Merah' },
];

export const VerseBottomSheet: React.FC<VerseBottomSheetProps> = ({
  isOpen,
  onClose,
  verseRef,
  onOpenShare,
}) => {
  const {
    addBookmark,
    removeBookmark,
    isBookmarked,
    setHighlight,
    removeHighlight,
    getHighlightForVerse,
    bookmarks,
    books,
  } = useBible();

  const [copied, setCopied] = React.useState(false);

  if (!verseRef) return null;

  const cleanBookName = formatBookName(verseRef.bookName || verseRef.bookId, books);
  const hebrewVerseMatch = verseRef.text ? verseRef.text.match(/\((\d+[-\:]\d+)\)/) : null;
  const hebrewVerseCode = hebrewVerseMatch ? hebrewVerseMatch[0] : null;

  const bookmarked = isBookmarked(
    verseRef.bookId,
    verseRef.chapter,
    verseRef.verse
  );

  const activeHighlight = getHighlightForVerse(
    verseRef.bookId,
    verseRef.chapter,
    verseRef.verse
  );

  const handleToggleBookmark = () => {
    if (bookmarked) {
      const found = bookmarks.find(
        (b) =>
          b.bookId === verseRef.bookId &&
          b.chapter === verseRef.chapter &&
          b.verse === verseRef.verse
      );
      if (found) removeBookmark(found.id);
    } else {
      addBookmark(
        verseRef.bookId,
        verseRef.bookName,
        verseRef.chapter,
        verseRef.verse,
        verseRef.text
      );
    }
  };

  const handleSelectHighlight = (color: HighlightColor) => {
    if (activeHighlight === color) {
      removeHighlight(verseRef.bookId, verseRef.chapter, verseRef.verse);
    } else {
      setHighlight(
        verseRef.bookId,
        verseRef.bookName,
        verseRef.chapter,
        verseRef.verse,
        verseRef.text,
        color
      );
    }
  };

  const handleCopy = async () => {
    const formatted = `"${verseRef.text}"\n— ${cleanBookName} ${verseRef.chapter}:${verseRef.verse} (${verseRef.translation.toUpperCase()})`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
          />

          {/* Bottom Sheet Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-card)] border-t border-[var(--border-color)] rounded-t-[32px] p-6 safe-pb max-w-xl mx-auto shadow-2xl"
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1.5 bg-[var(--border-color)] rounded-full mx-auto mb-5" />

            {/* Verse Reference Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-extrabold tracking-wider uppercase text-[#CD0000]">
                  {verseRef.translation.toUpperCase()}
                </span>
                <h3 className="text-xl font-extrabold text-[var(--text-primary)]">
                  {cleanBookName} {verseRef.chapter}:{verseRef.verse}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Verse Snippet */}
            <div className={`p-4 bg-[var(--bg-card-secondary)] border border-[var(--border-color)] rounded-2xl text-sm leading-relaxed text-[var(--text-primary)] italic font-normal max-h-32 overflow-y-auto ${hebrewVerseCode ? 'mb-2.5' : 'mb-6'}`}>
              "{verseRef.text}"
            </div>

            {/* Note for Hebrew/Alternate Verse Numbering */}
            {hebrewVerseCode && (
              <div className="mb-6 flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-[var(--bg-card-secondary)]/80 border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                <Info size={14} className="text-[#CD0000] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-bold text-[var(--text-primary)]">Catatan:</span> Penomoran <span className="font-semibold text-[#CD0000]">{hebrewVerseCode}</span> mengacu pada pembagian ayat dalam teks Ibrani atau versi lain.
                </p>
              </div>
            )}

            {/* Highlights Color Bar */}
            <div className="mb-6">
              <label className="text-xs font-extrabold uppercase text-[var(--text-secondary)] tracking-wider mb-3 block">
                Warna Sorotan
              </label>
              <div className="flex items-center gap-3">
                {HIGHLIGHT_COLORS.map((c) => {
                  const isSelected = activeHighlight === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => handleSelectHighlight(c.id)}
                      className={`relative w-10 h-10 rounded-2xl ${c.bgClass} flex items-center justify-center transition-transform active:scale-95 shadow-md`}
                      title={c.label}
                    >
                      {isSelected && (
                        <Check size={18} className="text-black font-bold" />
                      )}
                    </button>
                  );
                })}
                {activeHighlight && (
                  <button
                    onClick={() =>
                      removeHighlight(
                        verseRef.bookId,
                        verseRef.chapter,
                        verseRef.verse
                      )
                    }
                    className="text-xs text-[#CD0000] font-bold hover:underline ml-auto"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-3 gap-3.5">
              {/* Bookmark Toggle */}
              <button
                onClick={handleToggleBookmark}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl transition-all duration-200 ${
                  bookmarked
                    ? 'bg-[#CD0000] text-white font-extrabold'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]'
                }`}
              >
                {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                <span className="text-xs font-bold">
                  {bookmarked ? 'Tersimpan' : 'Tandai'}
                </span>
              </button>

              {/* Copy Verse */}
              <button
                onClick={handleCopy}
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#CD0000] font-bold transition-all duration-200"
              >
                {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                <span className="text-xs font-bold">{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>

              {/* Share Verse */}
              <button
                onClick={() => {
                  onClose();
                  onOpenShare(verseRef);
                }}
                className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#CD0000] hover:bg-[#A60000] text-white font-bold transition-all duration-200"
              >
                <Share2 size={20} />
                <span className="text-xs font-bold">Bagikan</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
