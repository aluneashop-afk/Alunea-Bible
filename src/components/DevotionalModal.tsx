import React, { useState, useEffect } from 'react';
import {
  Heart,
  Calendar,
  BookOpen,
  X,
  Quote,
  Sparkles,
  Share2,
  User,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Devotional } from '../types/devotional';
import { DevotionalService } from '../services/DevotionalService';
import { trackDevotionalRead } from '../utils/analytics';

interface DevotionalModalProps {
  devotional: Devotional | null;
  onClose: () => void;
}

export const DevotionalModal: React.FC<DevotionalModalProps> = ({
  devotional,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (devotional) {
      trackDevotionalRead(devotional.title, devotional.date);
    }
  }, [devotional]);

  if (!devotional) return null;

  const handleShare = () => {
    const textToShare = `${devotional.title}\n\n"${devotional.verses}"\n\nBaca selengkapnya di Alkitab Alunea`;
    if (navigator.share) {
      navigator.share({
        title: devotional.title,
        text: textToShare,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const coverUrl = DevotionalService.getCoverUrl(devotional.cover);
  const formattedDate = DevotionalService.formatIndonesianDate(devotional.date);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl my-8 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] overflow-hidden shadow-2xl text-[var(--text-primary)] flex flex-col max-h-[90vh]"
        >
          {/* Modal Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-5 bg-[var(--bg-card)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#CD0000]">
              <Heart size={16} />
              <span>Renungan Harian Alunea</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                title="Bagikan Renungan"
              >
                {copied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-[var(--bg-card-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Tutup Modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-6">
            {/* Cover Image */}
            {coverUrl && (
              <div className="rounded-2xl overflow-hidden max-h-64 w-full bg-[var(--bg-card-secondary)]">
                <img
                  src={coverUrl}
                  alt={devotional.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Title & Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#CD0000]" />
                  <span>{formattedDate}</span>
                </div>

                {devotional.author && (
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>Oleh: {devotional.author}</span>
                  </div>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-snug">
                {devotional.title}
              </h2>

              {devotional.tags && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {devotional.tags.split(',').map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-bold text-[#CD0000] bg-[var(--bg-card-secondary)] border border-[var(--border-color)] px-3 py-1 rounded-full"
                    >
                      #{t.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Main Verses Highlight Box */}
            {devotional.verses && (
              <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border-l-4 border-[#CD0000] space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#CD0000] flex items-center gap-1">
                  <BookOpen size={13} />
                  Ayat Utama
                </span>
                <p className="text-sm md:text-base font-serif font-medium italic text-[var(--text-primary)] leading-relaxed">
                  {devotional.verses}
                </p>
              </div>
            )}

            {/* Quote Box (If available) */}
            {devotional.quote && (
              <div className="p-5 rounded-2xl bg-[#000000] border border-[#2F2F2F] text-white space-y-2 relative overflow-hidden">
                <Quote size={28} className="text-[#CD0000] opacity-40 absolute right-3 bottom-3" />
                <p className="text-sm font-serif italic text-white leading-relaxed">
                  &quot;{devotional.quote}&quot;
                </p>
                {devotional.quote_source && (
                  <p className="text-xs text-[#A5A5A5] font-semibold">
                    — {devotional.quote_source}
                  </p>
                )}
              </div>
            )}

            {/* Opening */}
            {devotional.opening && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)]">
                  Pengantar
                </h3>
                <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed whitespace-pre-line font-normal">
                  {devotional.opening}
                </p>
              </div>
            )}

            {/* Core Message */}
            {devotional.core && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#CD0000]">
                  Isi Renungan
                </h3>
                <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed whitespace-pre-line font-normal">
                  {devotional.core}
                </p>
              </div>
            )}

            {/* Application */}
            {devotional.application && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--text-secondary)]">
                  Penerapan Praktis
                </h3>
                <p className="text-sm md:text-base text-[var(--text-primary)] leading-relaxed whitespace-pre-line font-normal">
                  {devotional.application}
                </p>
              </div>
            )}

            {/* Prayer Box */}
            {devotional.prayer && (
              <div className="p-6 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#CD0000]">
                  <Sparkles size={16} />
                  <span>Doa Hari Ini</span>
                </div>
                <p className="text-sm md:text-base font-serif italic text-[var(--text-primary)] leading-relaxed">
                  &quot;{devotional.prayer}&quot;
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-5 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#CD0000] hover:bg-[#A60000] text-white font-bold text-xs rounded-2xl transition-colors"
            >
              Tutup Renungan
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
