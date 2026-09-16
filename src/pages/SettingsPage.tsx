import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Coffee,
  Monitor,
  Type,
  Trash2,
  BookOpen,
  Check,
  Languages,
  Info,
  ChevronRight,
  User,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBible } from '../contexts/BibleContext';
import { FontFamily, LayoutMode, Gender } from '../types/bible';
import { SEOHead } from '../components/SEOHead';
import { AboutModal } from '../components/AboutModal';

export const SettingsPage: React.FC = () => {
  const {
    settings,
    updateSettings,
    theme,
    setTheme,
    translations,
    currentTranslation,
    setTranslation,
    clearHistory,
    clearAllUserData,
    userProfile,
    updateUserProfile,
    openCover,
  } = useBible();

  const [confirmClear, setConfirmClear] = useState<string | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleFontFamilyChange = (font: FontFamily) => {
    updateSettings({ fontFamily: font });
  };

  const handleLayoutModeChange = (mode: LayoutMode) => {
    updateSettings({ layoutMode: mode });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-8">
      <SEOHead
        title="Pengaturan Aplikasi"
        description="Atur tema tampilan (Sepia, Terang, Gelap), ukuran dan jenis huruf, serta preferensi terjemahan Alkitab Alunea."
      />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Pengaturan & Preferensi
        </h1>
        <p className="text-xs text-[var(--text-secondary)] font-medium">
          Atur tampilan membaca, tema, nama sapaan, dan kelola data lokal
        </p>
      </div>

      {/* Section 0: User Profile & Personalization */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
            <User size={18} className="text-[#CD0000]" />
            Profil & Sapaan Pengguna
          </h2>
          <button
            onClick={openCover}
            className="text-xs font-bold text-[#CD0000] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Sparkles size={14} />
            Buka Cover Aplikasi
          </button>
        </div>

        <p className="text-xs text-[var(--text-secondary)] font-medium">
          Nama Anda digunakan untuk sapaan hangat yang personal (Selamat Pagi, Siang, Sore, Malam) di halaman Beranda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-primary)]">
              Nama Anda
            </label>
            <div className="relative">
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => updateUserProfile({ name: e.target.value })}
                placeholder="Tuliskan nama Anda (contoh: David, Maria...)"
                className="w-full px-4 py-2.5 pl-10 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-[#CD0000]"
              />
              <User
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--text-primary)]">
              Panggilan / Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  updateUserProfile({ gender: userProfile.gender === 'male' ? '' : 'male' })
                }
                className={`py-2 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  userProfile.gender === 'male'
                    ? 'bg-[#CD0000] text-white border-[#CD0000]'
                    : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>👨 Pria</span>
                {userProfile.gender === 'male' && <Check size={14} />}
              </button>

              <button
                type="button"
                onClick={() =>
                  updateUserProfile({ gender: userProfile.gender === 'female' ? '' : 'female' })
                }
                className={`py-2 px-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  userProfile.gender === 'female'
                    ? 'bg-[#CD0000] text-white border-[#CD0000]'
                    : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>👩 Wanita</span>
                {userProfile.gender === 'female' && <Check size={14} />}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Appearance Theme */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <Sun size={18} className="text-[#CD0000]" />
          Tema Warna
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 text-xs font-bold transition-all duration-200 ${
              theme === 'light'
                ? 'bg-[#CD0000] text-white'
                : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Sun size={20} />
            Terang
          </button>

          <button
            onClick={() => setTheme('sepia')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 text-xs font-bold transition-all duration-200 ${
              theme === 'sepia'
                ? 'bg-[#CD0000] text-white'
                : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Coffee size={20} />
            Sepia
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 text-xs font-bold transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-[#CD0000] text-white'
                : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Moon size={20} />
            Gelap (Utama)
          </button>

          <button
            onClick={() => setTheme('system')}
            className={`p-4 rounded-2xl flex flex-col items-center gap-2 text-xs font-bold transition-all duration-200 ${
              theme === 'system'
                ? 'bg-[#CD0000] text-white'
                : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Monitor size={20} />
            Ikuti Sistem
          </button>
        </div>
      </section>

      {/* Section 2: Default Bible Translation */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <Languages size={18} className="text-[#CD0000]" />
          Versi Terjemahan Utama
        </h2>

        <div className="space-y-3">
          {translations.map((tr) => {
            const isSelected = tr.id.toLowerCase() === currentTranslation.toLowerCase();
            return (
              <button
                key={tr.id}
                onClick={() => setTranslation(tr.id)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? 'bg-[var(--bg-card-secondary)] border border-[#CD0000] text-[#CD0000] font-extrabold'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#CD0000]/50'
                }`}
              >
                <div className="text-left">
                  <span className="text-sm font-bold block">{tr.name}</span>
                  <span className="text-xs text-[var(--text-secondary)] font-medium">
                    {tr.language} ({tr.shortName})
                  </span>
                </div>
                {isSelected && <Check size={18} className="text-[#CD0000]" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Section 3: Typography Options */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <Type size={18} className="text-[#CD0000]" />
          Tipografi Bacaan
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-wider mb-3 block">
              Jenis Huruf
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleFontFamilyChange('sans')}
                className={`p-3.5 rounded-2xl text-xs font-sans font-bold transition-all duration-200 ${
                  settings.fontFamily === 'sans'
                    ? 'bg-[#CD0000] text-white'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Sans-Serif
              </button>
              <button
                onClick={() => handleFontFamilyChange('serif')}
                className={`p-3.5 rounded-2xl text-xs font-serif font-bold transition-all duration-200 ${
                  settings.fontFamily === 'serif'
                    ? 'bg-[#CD0000] text-white'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => handleFontFamilyChange('mono')}
                className={`p-3.5 rounded-2xl text-xs font-mono font-bold transition-all duration-200 ${
                  settings.fontFamily === 'mono'
                    ? 'bg-[#CD0000] text-white'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Monospace
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-extrabold text-[var(--text-secondary)] uppercase tracking-wider mb-3 block">
              Tampilan Tata Letak Ayat
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleLayoutModeChange('verse-by-verse')}
                className={`p-3.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  settings.layoutMode === 'verse-by-verse'
                    ? 'bg-[#CD0000] text-white'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Baris per Ayat
              </button>
              <button
                onClick={() => handleLayoutModeChange('paragraph')}
                className={`p-3.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  settings.layoutMode === 'paragraph'
                    ? 'bg-[#CD0000] text-white'
                    : 'bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Paragraf
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Local Storage Data Management */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-5">
        <h2 className="text-xs font-extrabold text-rose-500 uppercase tracking-wider flex items-center gap-2">
          <Trash2 size={18} />
          Kelola Data & Penyimpanan
        </h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[var(--bg-card-secondary)] border border-[var(--border-color)] rounded-2xl">
            <div>
              <p className="text-xs font-extrabold text-[var(--text-primary)]">
                Hapus Riwayat Bacaan
              </p>
              <p className="text-[11px] font-medium text-[var(--text-secondary)]">
                Menghapus daftar pasal yang baru saja Anda baca.
              </p>
            </div>
            <button
              onClick={() => {
                clearHistory();
                setConfirmClear('history');
                setTimeout(() => setConfirmClear(null), 2000);
              }}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-rose-500 px-4 py-2 rounded-xl text-xs font-bold text-rose-500 transition-all duration-200"
            >
              {confirmClear === 'history' ? 'Dihapus!' : 'Hapus'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--bg-card-secondary)] border border-[var(--border-color)] rounded-2xl">
            <div>
              <p className="text-xs font-extrabold text-[var(--text-primary)]">
                Reset Seluruh Data Aplikasi
              </p>
              <p className="text-[11px] font-medium text-[var(--text-secondary)]">
                Menghapus seluruh penanda, sorotan, dan riwayat secara permanen.
              </p>
            </div>
            <button
              onClick={() => {
                clearAllUserData();
                setConfirmClear('all');
                setTimeout(() => setConfirmClear(null), 2000);
              }}
              className="bg-[#CD0000] hover:bg-[#A60000] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
            >
              {confirmClear === 'all' ? 'Direset!' : 'Reset'}
            </button>
          </div>
        </div>
      </section>

      {/* Section 5: About App */}
      <section className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 sm:p-7 space-y-4">
        <h2 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-2">
          <Info size={18} className="text-[#CD0000]" />
          Informasi Aplikasi
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="flex-1 p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000] flex items-center justify-between text-xs font-bold text-[var(--text-primary)] transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#CD0000]/10 text-[#CD0000] flex items-center justify-center font-extrabold">
                A
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Tentang Alkitab Alunea</p>
                <p className="text-[11px] text-[var(--text-secondary)] font-medium">
                  Informasi terjemahan, fitur unggulan & versi aplikasi
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[var(--text-secondary)]" />
          </button>

          <Link
            to="/about"
            className="p-4 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 shrink-0"
          >
            Halaman Penuh
          </Link>
        </div>
      </section>

      {/* Footer Info */}
      <section className="text-center py-4 space-y-2 text-[var(--text-secondary)] text-xs">
        <div className="flex items-center justify-center gap-2 text-[var(--text-primary)] font-extrabold">
          <BookOpen size={16} className="text-[#CD0000]" />
          <span>Alkitab Alunea • © 2026</span>
        </div>
        <p className="font-medium max-w-md mx-auto text-[11px]">
          Dirancang untuk pengalaman membaca Alkitab yang cepat, fokus, dan nyaman. Data Anda tersimpan aman secara lokal di browser perangkat Anda.
        </p>
      </section>

      {/* Modal Popup */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
};
