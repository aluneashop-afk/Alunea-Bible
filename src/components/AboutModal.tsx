import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Sparkles,
  Bookmark,
  Search,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[var(--border-color)] bg-[var(--bg-sidebar)]/80 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#CD0000] rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md">
                  A
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[var(--text-primary)] leading-tight">
                    Tentang Alkitab Alunea
                  </h2>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">
                    Informasi & Fitur Unggulan
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-secondary)] transition-colors"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto no-scrollbar text-[var(--text-primary)]">
              {/* Ringkasan Aplikasi */}
              <div className="p-5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-2">
                <div className="flex items-center gap-2 text-[#CD0000] font-extrabold text-sm">
                  <Sparkles size={18} />
                  <span>Mengenal Alkitab Alunea</span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)] font-medium">
                  <strong>Alkitab Alunea</strong> adalah aplikasi Alkitab digital modern yang dirancang untuk memberikan pengalaman membaca Firman Tuhan yang bersih, cepat, dan fokus. Dilengkapi renungan harian dan alat bantu membaca agar saat teduh Anda terasa lebih dekat dan bermakna.
                </p>
              </div>

              {/* Terjemahan yang Tersedia */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={16} className="text-[#CD0000]" />
                  Versi Terjemahan Alkitab
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-1">
                    <p className="font-extrabold text-[var(--text-primary)]">Terjemahan Baru (TB)</p>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                      Standar Bahasa Indonesia utama oleh LAI.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-1">
                    <p className="font-extrabold text-[var(--text-primary)]">Terjemahan Lama (TL)</p>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                      Klasik Bahasa Indonesia untuk penjelajahan ayat.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-1">
                    <p className="font-extrabold text-[var(--text-primary)]">King James Version (KJV)</p>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                      Teks Bahasa Inggris klasik yang dikenal presisi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fitur Fitur Unggulan */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
                  <Zap size={16} className="text-[#CD0000]" />
                  Fitur Unggulan Aplikasi
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3 items-start">
                    <CheckCircle2 size={18} className="text-[#CD0000] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">Pengalaman Membaca Fleksibel</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        Mode warna (Gelap, Terang, Sepia), kustomisasi jenis huruf (Sans, Serif, Mono), serta pilihan tata letak ayat per ayat atau paragraf.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3 items-start">
                    <Sparkles size={18} className="text-[#CD0000] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">Renungan Harian & Ayat Hari Ini</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        Inspirasi rohani setiap hari untuk membimbing doa dan meditasi pribadi Anda.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3 items-start">
                    <Bookmark size={18} className="text-[#CD0000] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">Penanda (Bookmark) & Sorotan Warna</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        Tandai ayat favorit dan berikan warna sorotan (stabilo) untuk mempermudah saat membaca kembali.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3 items-start">
                    <Search size={18} className="text-[#CD0000] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">Pencarian Kata Kunci Cepat</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        Temukan ayat Alkitab spesifik berdasarkan kata kunci atau frasa secara instan.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3 items-start">
                    <Share2 size={18} className="text-[#CD0000] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">Bagikan Ayat dengan Gambar Visual</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        Buat kartu ayat indah untuk dibagikan ke WhatsApp, Instagram, atau media sosial lainnya.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3 items-start">
                    <ShieldCheck size={18} className="text-[#CD0000] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--text-primary)]">Ringan & Penyimpanan Lokal Aman</p>
                      <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                        Semua data penanda dan sorotan disimpan langsung di perangkat browser Anda tanpa perlu mendaftar akun.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-color)] bg-[var(--bg-sidebar)]/80 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#CD0000] hover:bg-[#A60000] text-white text-xs font-extrabold transition-all duration-200"
              >
                Mengerti & Tutup
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
