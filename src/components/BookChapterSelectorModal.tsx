import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ChevronRight, BookOpen, ArrowLeft } from 'lucide-react';
import { useBible } from '../contexts/BibleContext';
import { Book, Testament } from '../types/bible';

interface BookChapterSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (bookId: string, chapter: number) => void;
}

export const BookChapterSelectorModal: React.FC<BookChapterSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const { books, currentBookId, currentChapter } = useBible();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [testamentFilter, setTestamentFilter] = useState<'ALL' | Testament>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredBooks = books.filter((b) => {
    const matchesTestament =
      testamentFilter === 'ALL' || b.testament === testamentFilter;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTestament && matchesSearch;
  });

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleChapterClick = (chapNumber: number) => {
    if (selectedBook) {
      onSelect(selectedBook.id, chapNumber);
      setSelectedBook(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] p-6 z-10 max-h-[85vh] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            {selectedBook ? (
              <button
                onClick={() => setSelectedBook(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#CD0000] hover:underline"
              >
                <ArrowLeft size={18} />
                Kembali ke Daftar Kitab
              </button>
            ) : (
              <h3 className="text-lg font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                <BookOpen size={20} className="text-[#CD0000]" />
                Pilih Kitab & Pasal
              </h3>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {!selectedBook ? (
            /* STEP 1: Book Selection List */
            <div className="flex-1 flex flex-col min-h-0 pt-4">
              {/* Search Bar */}
              <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] focus-within:border-[#CD0000] rounded-2xl flex items-center px-3.5 py-1 mb-4 transition-all duration-200">
                <Search
                  size={18}
                  className="text-[var(--text-secondary)] mr-2.5 shrink-0"
                />
                <input
                  type="text"
                  placeholder="Cari nama kitab..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent py-2 text-sm font-medium text-[var(--text-primary)] focus:outline-none placeholder-[var(--text-secondary)]"
                />
              </div>

              {/* Testament Tabs */}
              <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] p-1 rounded-2xl flex items-center gap-1 mb-4 overflow-x-auto no-scrollbar shrink-0">
                {(['ALL', 'OT', 'NT'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTestamentFilter(t)}
                    className={`flex-1 sm:flex-none shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap text-center ${
                      testamentFilter === t
                        ? 'bg-[#CD0000] text-white shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/40'
                    }`}
                  >
                    {t === 'ALL'
                      ? 'Semua Kitab (66)'
                      : t === 'OT'
                      ? 'Perjanjian Lama'
                      : 'Perjanjian Baru'}
                  </button>
                ))}
              </div>

              {/* Books Grid / List */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
                {filteredBooks.map((book) => {
                  const isCurrent =
                    book.id.toString().toLowerCase() === currentBookId.toLowerCase() ||
                    book.slug.toLowerCase() === currentBookId.toLowerCase() ||
                    book.abbreviation.toLowerCase() === currentBookId.toLowerCase();
                  return (
                    <button
                      key={book.id}
                      onClick={() => handleBookClick(book)}
                      className={`w-full p-3.5 rounded-2xl flex items-center justify-between border transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[var(--bg-card-secondary)] border-[#CD0000] text-[#CD0000] font-extrabold'
                          : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] hover:border-[#CD0000] text-[var(--text-primary)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-extrabold flex items-center justify-center text-[#CD0000] uppercase">
                          {book.abbreviation}
                        </span>
                        <div className="text-left">
                          <span className="text-sm font-bold block">
                            {book.name}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] font-medium">
                            {book.chaptersCount} pasal • {book.group}
                          </span>
                        </div>
                      </div>

                      <ChevronRight size={18} className="text-[var(--text-secondary)]" />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* STEP 2: Chapter Selection Grid */
            <div className="flex-1 flex flex-col min-h-0 pt-4">
              <div className="mb-4">
                <span className="text-xs uppercase font-extrabold text-[#CD0000] tracking-wider">
                  {selectedBook.testament === 'OT' ? 'Perjanjian Lama' : 'Perjanjian Baru'} • {selectedBook.group}
                </span>
                <h4 className="text-2xl font-extrabold text-[var(--text-primary)] mt-0.5">
                  {selectedBook.name}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Pilih pasal untuk mulai membaca
                </p>
              </div>

              {/* Chapters Grid */}
              <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-5 sm:grid-cols-6 gap-3 pb-2">
                {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map(
                  (chapNum) => {
                    const isCurrent =
                      selectedBook.id.toUpperCase() === currentBookId.toUpperCase() &&
                      chapNum === currentChapter;

                    return (
                      <button
                        key={chapNum}
                        onClick={() => handleChapterClick(chapNum)}
                        className={`h-12 rounded-2xl font-extrabold text-sm flex items-center justify-center border transition-all duration-200 ${
                          isCurrent
                            ? 'bg-[#CD0000] hover:bg-[#A60000] text-white border-transparent'
                            : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] hover:border-[#CD0000] text-[var(--text-primary)]'
                        }`}
                      >
                        {chapNum}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
