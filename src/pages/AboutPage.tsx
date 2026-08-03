import React from 'react';
import {
  BookOpen,
  Sparkles,
  Bookmark,
  Search,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-8">
      <SEOHead
        title="Tentang Aplikasi"
        description="Informasi lengkap mengenai Alkitab Alunea, versi terjemahan yang tersedia, serta fitur-fitur unggulan untuk bersaat teduh."
      />

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#CD0000] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
          A
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Tentang Alkitab Alunea
          </h1>
          <p className="text-xs text-[var(--text-secondary)] font-medium">
            Firman Tuhan Dalam Genggaman • Informasi & Fitur Unggulan
          </p>
        </div>
      </div>

      {/* Ringkasan Aplikasi */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-3">
        <div className="flex items-center gap-2 text-[#CD0000] font-extrabold text-sm">
          <Sparkles size={20} />
          <h2 className="text-sm font-extrabold text-[var(--text-primary)]">
            Mengenal Alkitab Alunea
          </h2>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] font-medium">
          <strong>Alkitab Alunea</strong> adalah aplikasi Alkitab digital modern yang dirancang untuk memberikan pengalaman membaca Firman Tuhan yang bersih, tenang, dan cepat. Aplikasi ini dibuat khusus untuk memfasilitasi kebutuhan bersaat teduh, studi Alkitab harian, dan pencarian ayat dengan tampilan yang nyaman bagi penggunanya.
        </p>
      </section>

      {/* Terjemahan Alkitab */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <BookOpen size={18} className="text-[#CD0000]" />
          Versi Terjemahan yang Tersedia
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CD0000]/10 text-[#CD0000] font-extrabold text-[10px]">
              TB
            </span>
            <p className="font-extrabold text-[var(--text-primary)] text-sm">
              Terjemahan Baru
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Versi standar Alkitab Bahasa Indonesia utama yang diterbitkan oleh Lembaga Alkitab Indonesia (LAI).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CD0000]/10 text-[#CD0000] font-extrabold text-[10px]">
              TL
            </span>
            <p className="font-extrabold text-[var(--text-primary)] text-sm">
              Terjemahan Lama
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Versi klasik Bahasa Indonesia dengan gaya bahasa arkais khas untuk pembanding studi ayat.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] space-y-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#CD0000]/10 text-[#CD0000] font-extrabold text-[10px]">
              KJV
            </span>
            <p className="font-extrabold text-[var(--text-primary)] text-sm">
              King James Version
            </p>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Versi Bahasa Inggris klasik yang dikenal presisi, otentik, dan dipercaya secara global.
            </p>
          </div>
        </div>
      </section>

      {/* Fitur Utama & Keunggulan */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <Zap size={18} className="text-[#CD0000]" />
          Fitur Utama & Keunggulan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3.5 items-start">
            <CheckCircle2 size={20} className="text-[#CD0000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-sm">Pengalaman Membaca Fleksibel</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Pilihan tema Gelap (Dark), Terang (Light), dan Sepia yang ramah mata. Serta kustomisasi ukuran dan jenis huruf (Sans, Serif, Monospace).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3.5 items-start">
            <Sparkles size={20} className="text-[#CD0000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-sm">Renungan Harian & Ayat Hari Ini</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Artikel renungan rohani harian yang dilengkapi ayat referensi dan doa untuk mengawali hari Anda.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3.5 items-start">
            <Bookmark size={20} className="text-[#CD0000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-sm">Penanda (Bookmark) & Sorotan Warna</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Tandai ayat favorit Anda dan berikan warna sorotan (stabilo) untuk mempermudah pemetaan saat membaca kembali.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3.5 items-start">
            <Search size={20} className="text-[#CD0000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-sm">Pencarian Kata Kunci Cepat</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Cari ayat atau topik tertentu di seluruh kitab Alkitab secara cepat dan efisien.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3.5 items-start">
            <Share2 size={20} className="text-[#CD0000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-sm">Bagikan Ayat Visual</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Bagikan ayat Alkitab ke WhatsApp atau media sosial dengan pembuat kartu gambar ayat visual yang estetis.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex gap-3.5 items-start">
            <ShieldCheck size={20} className="text-[#CD0000] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)] text-sm">Data Lokal Aman & Tanpa Iklan</p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                Data penanda dan sorotan tersimpan langsung di browser perangkat Anda, menjaga privasi tanpa perlu login.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <footer className="text-center py-4 text-xs text-[var(--text-secondary)] font-medium">
        Alkitab Alunea • © 2026. All Rights Reserved.
      </footer>
    </div>
  );
};
