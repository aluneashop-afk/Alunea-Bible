import React, { useEffect, useState, useMemo } from 'react';
import {
  Heart,
  Calendar,
  Search,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Devotional } from '../types/devotional';
import { DevotionalService } from '../services/DevotionalService';
import { DevotionalModal } from '../components/DevotionalModal';
import { SEOHead } from '../components/SEOHead';

const ITEMS_PER_PAGE = 9;

export const DevotionalsPage: React.FC = () => {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    DevotionalService.getDevotionals()
      .then((data) => {
        if (isMounted) {
          setDevotionals(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    devotionals.forEach((item) => {
      if (item.tags) {
        item.tags.split(',').forEach((t) => {
          const clean = t.trim();
          if (clean) tagSet.add(clean);
        });
      }
    });
    return Array.from(tagSet);
  }, [devotionals]);

  // Filter items
  const filteredDevotionals = useMemo(() => {
    return devotionals.filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.core.toLowerCase().includes(query) ||
        item.verses.toLowerCase().includes(query) ||
        item.opening.toLowerCase().includes(query);

      const matchesTag =
        selectedTag === 'ALL' ||
        (item.tags && item.tags.toLowerCase().includes(selectedTag.toLowerCase()));

      return matchesSearch && matchesTag;
    });
  }, [devotionals, searchQuery, selectedTag]);

  // Reset page when search or tag changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredDevotionals.length / ITEMS_PER_PAGE) || 1;
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDevotionals.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredDevotionals, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShare = (item: Devotional) => {
    const textToShare = `${item.title}\n\n"${item.verses}"\n\nBaca selengkapnya di Alkitab Alunea`;
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: textToShare,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8">
      <SEOHead
        title="Renungan Harian & Saat Teduh"
        description="Kumpulan renungan harian firman Tuhan, saat teduh, dan inspirasi rohani Kristen harian untuk menguatkan iman dan membimbing langkah kehidupan Anda."
        keywords="Renungan harian, Saat teduh, Firman Tuhan, Renungan Kristen, Ayat Alkitab harian, Alunea"
      />
      {/* Header Banner */}
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-[#CD0000] text-xs font-bold uppercase tracking-wider">
          <Heart size={16} />
          <span>Renungan Harian</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Saat Teduh & Inspirasi Jiwa
        </h1>
        <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-2xl">
          Kumpulan renungan harian firman Tuhan untuk menguatkan iman, memberi pengharapan, dan membimbing langkah kehidupan Anda.
        </p>
      </header>

      {/* Controls Bar: Search & Tag Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul renungan, ayat, atau topik..."
              className="w-full bg-[var(--bg-card-secondary)] border border-[var(--border-color)] pl-11 pr-10 py-3.5 rounded-full text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[#CD0000] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Results Counter */}
          <div className="text-xs font-semibold text-[var(--text-secondary)] self-end sm:self-auto">
            Menampilkan <span className="text-[var(--text-primary)] font-bold">{filteredDevotionals.length}</span> renungan
          </div>
        </div>

        {/* Tags Filter Row */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedTag('ALL')}
              className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-200 ${
                selectedTag === 'ALL'
                  ? 'bg-[#CD0000] text-white'
                  : 'bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
              }`}
            >
              Semua Topik
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-[#CD0000] text-white'
                    : 'bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid / Loading / Empty state */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 h-80 animate-pulse flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-4 bg-[var(--bg-card-secondary)] rounded w-1/3" />
                <div className="h-6 bg-[var(--bg-card-secondary)] rounded w-3/4" />
                <div className="h-20 bg-[var(--bg-card-secondary)] rounded w-full" />
              </div>
              <div className="h-10 bg-[var(--bg-card-secondary)] rounded-2xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredDevotionals.length === 0 ? (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-12 text-center space-y-4">
          <BookOpen size={48} className="mx-auto text-[var(--text-secondary)] opacity-50" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Renungan Tidak Ditemukan
          </h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto">
            Tidak ada renungan yang cocok dengan pencarian &quot;{searchQuery}&quot;. Coba gunakan kata kunci atau topik lain.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('ALL');
            }}
            className="px-6 py-2.5 bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-xs rounded-2xl hover:border-[#CD0000] transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item, index) => {
            const coverUrl = DevotionalService.getCoverUrl(item.cover);
            const formattedDate = DevotionalService.formatIndonesianDate(item.date);

            return (
              <motion.div
                key={item.slug || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] overflow-hidden flex flex-col justify-between hover:border-[#CD0000] transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div>
                  {/* Image Cover header if present */}
                  {coverUrl && (
                    <div className="relative h-44 w-full overflow-hidden bg-[var(--bg-card-secondary)]">
                      <img
                        src={coverUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          // Hide broken image safely
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 bg-[#111111]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 border border-white/10">
                        <Calendar size={12} className="text-[#CD0000]" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-3.5">
                    {!coverUrl && (
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-secondary)]">
                        <Calendar size={13} className="text-[#CD0000]" />
                        <span>{formattedDate}</span>
                      </div>
                    )}

                    {item.tags && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.tags.split(',').slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold text-[#CD0000] bg-[var(--bg-card-secondary)] border border-[var(--border-color)] px-2.5 py-0.5 rounded-full"
                          >
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-[var(--text-primary)] leading-snug group-hover:text-[#CD0000] transition-colors line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-xs font-normal text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {item.opening || item.core}
                    </p>

                    {item.verses && (
                      <div className="p-3 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[11px] font-serif text-[var(--text-primary)] italic line-clamp-2">
                        {item.verses}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedDevotional(item)}
                    className="w-full py-3 px-4 bg-[var(--bg-card-secondary)] hover:bg-[#CD0000] hover:text-white border border-[var(--border-color)] hover:border-transparent text-[var(--text-primary)] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    <span>Baca Renungan</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#CD0000] transition-all"
            aria-label="Halaman Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === currentPage;
              // Show limited range if totalPages > 7
              if (
                totalPages > 7 &&
                Math.abs(pageNum - currentPage) > 2 &&
                pageNum !== 1 &&
                pageNum !== totalPages
              ) {
                if (pageNum === 2 || pageNum === totalPages - 1) {
                  return <span key={pageNum} className="text-xs text-[var(--text-secondary)] px-1">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`min-w-[36px] h-[36px] px-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#CD0000] text-white shadow-md'
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#CD0000] transition-all"
            aria-label="Halaman Selanjutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Full Devotional Reader Modal */}
      <DevotionalModal
        devotional={selectedDevotional}
        onClose={() => setSelectedDevotional(null)}
      />
    </div>
  );
};
