import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  User,
  Heart,
  Sparkles,
  ArrowRight,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Check,
  X,
  Bookmark,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBible } from '../contexts/BibleContext';
import { Gender } from '../types/bible';

const getTimeGreeting = (name: string, _gender?: Gender) => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour + minute / 60;

  let timeGreet = 'Selamat Pagi';
  let Icon = Sunrise;
  let quote = 'Mulailah harimu dengan merenungkan kebaikan Tuhan.';

  if (timeVal >= 4 && timeVal < 11) {
    timeGreet = 'Selamat Pagi';
    Icon = Sunrise;
    quote = 'Mulailah harimu dengan merenungkan kebaikan Tuhan.';
  } else if (timeVal >= 11 && timeVal < 15) {
    timeGreet = 'Selamat Siang';
    Icon = Sun;
    quote = 'Kiranya damai sejahtera Allah menyertai seluruh aktivitasmu.';
  } else if (timeVal >= 15 && timeVal < 18.5) {
    timeGreet = 'Selamat Sore';
    Icon = Sunset;
    quote = 'Tetaplah bersyukur atas segala berkat dan penyertaan-Nya hari ini.';
  } else {
    timeGreet = 'Selamat Malam';
    Icon = Moon;
    quote = 'Beristirahatlah dengan tenang di dalam perlindungan kasih-Nya.';
  }

  const cleanName = name.trim();
  const fullGreeting = cleanName ? `${timeGreet}, ${cleanName}` : timeGreet;

  return { fullGreeting, Icon, quote };
};

export const WelcomeCoverModal: React.FC = () => {
  const { userProfile, updateUserProfile, isCoverOpen, setIsCoverOpen } = useBible();

  const [name, setName] = useState(userProfile.name || '');
  const [gender, setGender] = useState<Gender>(userProfile.gender || '');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setName(userProfile.name || '');
    setGender(userProfile.gender || '');
  }, [userProfile]);

  if (!isCoverOpen) return null;

  const { fullGreeting, Icon: TimeIcon, quote } = getTimeGreeting(name, gender);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setHasError(true);
      return;
    }

    updateUserProfile({
      name: trimmedName,
      gender,
      hasCompletedOnboarding: true,
    });
    setIsCoverOpen(false);
  };

  const handleSkip = () => {
    updateUserProfile({
      name: userProfile.name || 'Sahabat',
      gender,
      hasCompletedOnboarding: true,
    });
    setIsCoverOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[32px] shadow-2xl overflow-hidden my-auto"
        >
          {/* Subtle Top Accent Banner */}
          <div className="h-2.5 w-full bg-gradient-to-r from-[#CD0000] via-[#E60000] to-[#990000]" />

          {/* Close button if user already finished onboarding previously */}
          {userProfile.hasCompletedOnboarding && (
            <button
              onClick={() => setIsCoverOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-secondary)] transition-colors"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          )}

          <div className="p-6 sm:p-8 md:p-10 space-y-6">
            {/* Header: Brand & Title */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#CD0000]/10 border border-[#CD0000]/30 text-[#CD0000] shadow-inner mb-1">
                <BookOpen size={32} className="stroke-[2.2]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#CD0000]/10 text-[#CD0000] border border-[#CD0000]/20 mb-2">
                  <Sparkles size={12} />
                  Alkitab Alunea • Terjemahan Baru (TB)
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
                  Selamat Datang di Alkitab Alunea
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium max-w-lg mx-auto mt-1">
                  Membaca, merenungkan, dan menghidupi Firman Tuhan dalam genggaman setiap hari.
                </p>
              </div>

              {/* Bible Verse Pill */}
              <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] px-4 py-3 rounded-2xl max-w-md mx-auto text-left flex items-start gap-3">
                <span className="text-[#CD0000] text-lg font-serif select-none leading-none mt-0.5">“</span>
                <div className="flex-1">
                  <p className="text-xs italic text-[var(--text-primary)] font-serif leading-relaxed">
                    Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.
                  </p>
                  <p className="text-[11px] font-bold text-[#CD0000] mt-1 text-right">
                    — Mazmur 119:105
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)]/70 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#CD0000]/10 text-[#CD0000] flex items-center justify-center shrink-0">
                  <BookOpen size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">66 Kitab Lengkap</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">Perjanjian Lama & Baru</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)]/70 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#CD0000]/10 text-[#CD0000] flex items-center justify-center shrink-0">
                  <Heart size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">Renungan Harian</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">Inspirasi Firman setiap hari</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)]/70 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#CD0000]/10 text-[#CD0000] flex items-center justify-center shrink-0">
                  <Bookmark size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">Penanda & Catatan</p>
                  <p className="text-[10px] text-[var(--text-secondary)]">Stabilo warna & pencarian</p>
                </div>
              </div>
            </div>

            {/* Personalization Form */}
            <form onSubmit={handleSave} className="space-y-4 pt-1">
              <div className="border-t border-[var(--border-color)]/60 pt-4">
                <h3 className="text-xs font-extrabold text-[var(--text-primary)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <User size={14} className="text-[#CD0000]" />
                  Personalisasi Sapaan Anda
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4">
                  Nama Anda akan kami gunakan untuk menyapa Anda secara hangat dan personal setiap pagi, siang, sore, dan malam.
                </p>

                {/* Name Input */}
                <div className="space-y-1.5">
                  <label htmlFor="user-name-input" className="text-xs font-bold text-[var(--text-primary)] flex items-center justify-between">
                    <span>Nama Anda <span className="text-[#CD0000]">*</span></span>
                    {name.trim() && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <Check size={12} /> Siap disapa
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      id="user-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (hasError) setHasError(false);
                      }}
                      placeholder="Masukkan nama panggilan Anda (contoh: David, Maria...)"
                      className={`w-full px-4 py-3 pl-11 rounded-2xl bg-[var(--bg-card-secondary)] border text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none transition-all ${
                        hasError
                          ? 'border-red-500 ring-2 ring-red-500/20'
                          : 'border-[var(--border-color)] focus:border-[#CD0000] focus:ring-2 focus:ring-[#CD0000]/15'
                      }`}
                      autoFocus
                    />
                    <User
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                    />
                  </div>
                  {hasError && (
                    <p className="text-[11px] text-red-500 font-medium">
                      Silakan masukkan nama Anda agar sapaan dapat ditampilkan.
                    </p>
                  )}
                </div>

                {/* Gender / Salutation Selector */}
                <div className="mt-4 space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-primary)]">
                    Panggilan / Gender <span className="text-xs font-normal text-[var(--text-secondary)]">(Opsional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender(gender === 'male' ? '' : 'male')}
                      className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        gender === 'male'
                          ? 'bg-[#CD0000] text-white border-[#CD0000] shadow-sm'
                          : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#CD0000]/40'
                      }`}
                    >
                      <span>👨</span>
                      <span>Pria (Saudara)</span>
                      {gender === 'male' && <Check size={14} className="ml-auto" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setGender(gender === 'female' ? '' : 'female')}
                      className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        gender === 'female'
                          ? 'bg-[#CD0000] text-white border-[#CD0000] shadow-sm'
                          : 'bg-[var(--bg-card-secondary)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[#CD0000]/40'
                      }`}
                    >
                      <span>👩</span>
                      <span>Wanita (Saudari)</span>
                      {gender === 'female' && <Check size={14} className="ml-auto" />}
                    </button>
                  </div>
                </div>

                {/* Live Greeting Preview Card */}
                <div className="mt-4 p-4 rounded-2xl bg-[#CD0000]/5 border border-[#CD0000]/20 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#CD0000] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <TimeIcon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#CD0000]">
                        Pratinjau Sapaan Anda
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-[var(--text-primary)] tracking-tight truncate">
                      {fullGreeting}!
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)] truncate">
                      {quote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#CD0000] hover:bg-[#b00000] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#CD0000]/20 transition-all duration-200 hover:gap-3 cursor-pointer"
                >
                  <span>Mulai Membaca Alkitab</span>
                  <ArrowRight size={18} />
                </button>

                {!userProfile.hasCompletedOnboarding && (
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="w-full sm:w-auto py-3.5 px-5 rounded-2xl text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-secondary)] transition-colors"
                  >
                    Lewati Dulu
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
