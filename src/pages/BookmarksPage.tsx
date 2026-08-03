import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Highlighter,
  Trash2,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { useBible } from '../contexts/BibleContext';
import { formatBookName } from '../utils/bibleUtils';
import { motion } from 'motion/react';
import { SEOHead } from '../components/SEOHead';

export const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    bookmarks,
    removeBookmark,
    highlights,
    removeHighlight,
    navigateTo,
    books,
  } = useBible();

  const [activeTab, setActiveTab] = useState<'bookmarks' | 'highlights'>('bookmarks');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedBookmarks = [...bookmarks].sort((a, b) =>
    sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
  );

  const sortedHighlights = [...highlights].sort((a, b) =>
    sortOrder === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt
  );

  const handleJumpToVerse = (
    translation: string,
    bookId: string,
    chapter: number,
    verse: number
  ) => {
    navigateTo(translation, bookId, chapter, verse);
    navigate('/reader');
  };

  const getHighlightColorBadge = (color: string) => {
    let colorName = 'Kuning';
    if (color === 'green') colorName = 'Hijau';
    if (color === 'blue') colorName = 'Biru';
    if (color === 'purple') colorName = 'Ungu';
    if (color === 'red') colorName = 'Merah';

    switch (color) {
      case 'yellow':
        return { style: 'bg-amber-500/20 text-amber-300 border-amber-500/40', name: colorName };
      case 'green':
        return { style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40', name: colorName };
      case 'blue':
        return { style: 'bg-blue-500/20 text-blue-300 border-blue-500/40', name: colorName };
      case 'purple':
        return { style: 'bg-purple-500/20 text-purple-300 border-purple-500/40', name: colorName };
      case 'red':
        return { style: 'bg-rose-500/20 text-rose-300 border-rose-500/40', name: colorName };
      default:
        return { style: 'bg-[var(--bg-card-secondary)] text-[var(--text-primary)]', name: colorName };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
      <SEOHead
        title="Penanda & Sorotan Ayat"
        description="Kelola dan baca kembali koleksi ayat-ayat Alkitab favorit yang telah Anda tandai dan beri sorotan warna di Alkitab Alunea."
      />
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Penanda & Sorotan
          </h1>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Akses ayat yang ditandai dan perikop yang disorot
          </p>
        </div>

        {/* Sort Order Toggle */}
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
          }
          className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000] px-4 py-2.5 rounded-2xl text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 self-start sm:self-auto transition-all duration-200"
        >
          <ArrowUpDown size={15} />
          <span>Urutkan: {sortOrder === 'newest' ? 'Terbaru' : 'Terlama'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] p-1.5 rounded-2xl flex items-center gap-2">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
            activeTab === 'bookmarks'
              ? 'bg-[#CD0000] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Bookmark size={16} />
          <span>Penanda ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('highlights')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-200 ${
            activeTab === 'highlights'
              ? 'bg-[#CD0000] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Highlighter size={16} />
          <span>Sorotan ({highlights.length})</span>
        </button>
      </div>

      {/* Bookmarks Tab Content */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          {sortedBookmarks.length === 0 ? (
            <div className="py-16 text-center space-y-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6">
              <Bookmark size={36} className="mx-auto text-[var(--text-secondary)]" />
              <p className="text-sm font-extrabold text-[var(--text-primary)]">
                Belum ada penanda tersimpan
              </p>
              <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto font-medium">
                Saat membaca pasal Alkitab, ketuk pada ayat untuk menandainya agar mudah diakses di sini.
              </p>
            </div>
          ) : (
            sortedBookmarks.map((bm) => (
              <motion.div
                key={bm.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#CD0000] space-y-3 group transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-extrabold text-[#CD0000]">
                      {formatBookName(bm.bookName || bm.bookId, books)} {bm.chapter}:{bm.verse}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-lg bg-[var(--bg-card-secondary)] text-[var(--text-secondary)]">
                      {bm.translation}
                    </span>
                  </div>

                  <button
                    onClick={() => removeBookmark(bm.id)}
                    className="p-2 rounded-xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-rose-500 transition-colors"
                    title="Hapus penanda"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <p className="text-sm text-[var(--text-primary)] font-normal leading-relaxed">
                  "{bm.text}"
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() =>
                      handleJumpToVerse(bm.translation, bm.bookId, bm.chapter, bm.verse)
                    }
                    className="text-xs font-bold text-[#CD0000] hover:underline flex items-center gap-1"
                  >
                    <span>Baca di Alkitab</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Highlights Tab Content */}
      {activeTab === 'highlights' && (
        <div className="space-y-4">
          {sortedHighlights.length === 0 ? (
            <div className="py-16 text-center space-y-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6">
              <Highlighter size={36} className="mx-auto text-[var(--text-secondary)]" />
              <p className="text-sm font-extrabold text-[var(--text-primary)]">
                Belum ada sorotan ayat
              </p>
              <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto font-medium">
                Pilih ayat di pembaca Alkitab dan tentukan warna sorotan untuk menandai ayat penting.
              </p>
            </div>
          ) : (
            sortedHighlights.map((hl) => {
              const badge = getHighlightColorBadge(hl.color);
              return (
                <motion.div
                  key={hl.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#CD0000] space-y-3 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-extrabold text-[#CD0000]">
                        {formatBookName(hl.bookName || hl.bookId, books)} {hl.chapter}:{hl.verse}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${badge.style}`}
                      >
                        {badge.name}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        removeHighlight(hl.bookId, hl.chapter, hl.verse)
                      }
                      className="p-2 rounded-xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-rose-500 transition-colors"
                      title="Hapus sorotan"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-sm text-[var(--text-primary)] font-normal leading-relaxed">
                    "{hl.text}"
                  </p>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() =>
                        handleJumpToVerse(hl.translation, hl.bookId, hl.chapter, hl.verse)
                      }
                      className="text-xs font-bold text-[#CD0000] hover:underline flex items-center gap-1"
                    >
                      <span>Baca di Alkitab</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
