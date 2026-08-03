import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ChevronRight } from 'lucide-react';
import { useBible } from '../contexts/BibleContext';
import { bibleDataService } from '../services/BibleDataService';
import { SearchResult } from '../types/bible';
import { formatBookName } from '../utils/bibleUtils';
import { motion } from 'motion/react';
import { SEOHead } from '../components/SEOHead';

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentTranslation, navigateTo, books } = useBible();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await bibleDataService.search(query, currentTranslation);
      setResults(res);
      setIsSearching(false);
    }, 250); // 250ms debounced instant search

    return () => clearTimeout(timer);
  }, [query, currentTranslation]);

  const handleSelectResult = (item: SearchResult) => {
    navigateTo(item.translation, item.bookId, item.chapter, item.verse);
    navigate('/reader');
  };

  // Helper to highlight matching text in snippet
  const highlightMatch = (text: string, term: string) => {
    if (!term.trim()) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-[#CD0000]/20 text-[#CD0000] px-1 rounded-sm font-bold"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
      <SEOHead
        title={query.trim() ? `Cari "${query}"` : "Pencarian Alkitab"}
        description="Cari perikop, kata kunci, dan ayat-ayat Alkitab secara cepat dalam Terjemahan Baru (TB), Bahasa Indonesia Masa Kini (BIMK/TM), dan King James Version (KJV)."
        keywords="Pencarian Alkitab, Cari ayat Alkitab, Terjemahan Baru, KJV, BIMK, Alunea"
      />
      {/* Search Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-1">
          Pencarian Alkitab
        </h1>
        <p className="text-xs text-[var(--text-secondary)] font-medium">
          Cari kitab, ayat (mis. Yohanes 3:16), atau kata kunci dalam versi {currentTranslation.toUpperCase()}
        </p>
      </div>

      {/* Search Input Field */}
      <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] focus-within:border-[#CD0000] rounded-full flex items-center px-5 py-2 transition-all duration-200">
        <Search
          size={20}
          className="text-[var(--text-secondary)] mr-3 shrink-0"
        />
        <input
          type="text"
          autoFocus
          placeholder="Ketik kata kunci, nama kitab, atau perikop..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent py-2.5 text-sm font-medium text-[var(--text-primary)] focus:outline-none placeholder-[var(--text-secondary)]"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1.5 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] ml-2"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick Suggestion Chips */}
      {!query && (
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold uppercase text-[var(--text-secondary)] tracking-wider">
            Pencarian Populer
          </span>
          <div className="flex flex-wrap gap-3">
            {['Kejadian 1', 'Yohanes 3:16', 'Mazmur 23', 'Kasih', 'Terang', 'Damai'].map(
              (chip) => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip)}
                  className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000] px-4 py-2.5 rounded-full text-xs font-bold text-[var(--text-primary)] hover:text-[#CD0000] transition-all duration-200"
                >
                  {chip}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Results List */}
      {isSearching ? (
        <div className="py-12 text-center text-xs text-[var(--text-secondary)] flex items-center justify-center gap-2 font-semibold">
          <div className="w-4 h-4 border-2 border-[#CD0000] border-t-transparent rounded-full animate-spin" />
          <span>Mencari ayat Alkitab...</span>
        </div>
      ) : query && results.length === 0 ? (
        <div className="py-12 text-center space-y-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6">
          <p className="text-sm font-bold text-[var(--text-primary)]">
            Tidak ditemukan hasil untuk "{query}".
          </p>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Coba cari nama kitab seperti "Yohanes", "Mazmur", atau kata seperti "Kasih", "Terang".
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((res, idx) => (
            <motion.div
              key={`${res.bookId}_${res.chapter}_${res.verse}_${idx}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => handleSelectResult(res)}
              className="p-6 rounded-[28px] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#CD0000] cursor-pointer flex items-start justify-between gap-4 group transition-all duration-200"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-extrabold text-[#CD0000]">
                    {formatBookName(res.bookName || res.bookId, books)} {res.chapter}:{res.verse}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg bg-[var(--bg-card-secondary)] text-[var(--text-secondary)]">
                    {res.translation}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed font-normal">
                  "{highlightMatch(res.text, query)}"
                </p>
              </div>

              <div className="w-8 h-8 bg-[var(--bg-card-secondary)] rounded-xl flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#CD0000] shrink-0 mt-1">
                <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
