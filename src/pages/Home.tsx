import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark as BookmarkIcon,
  Clock,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Heart,
  Quote,
  Calendar,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  User,
} from 'lucide-react';
import { useBible } from '../contexts/BibleContext';
import { Book, DailyVerse, Testament } from '../types/bible';
import { bibleDataService } from '../services/BibleDataService';
import { Devotional } from '../types/devotional';
import { DevotionalService } from '../services/DevotionalService';
import { DevotionalModal } from '../components/DevotionalModal';
import { formatBookName } from '../utils/bibleUtils';
import { motion } from 'motion/react';
import { FloralBackground } from '../components/FloralBackground';
import { SEOHead } from '../components/SEOHead';

const getGreetingInfo = (userName?: string, gender?: string) => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const timeVal = hour + minute / 60;

  const cleanName = userName?.trim();
  const titlePrefix = gender === 'female' ? 'Saudari ' : gender === 'male' ? 'Saudara ' : '';

  let greeting = cleanName ? `Selamat Pagi, ${cleanName}` : 'Selamat Pagi';
  let Icon = Sunrise;

  if (timeVal >= 4 && timeVal < 11) {
    greeting = cleanName ? `Selamat Pagi, ${cleanName}` : 'Selamat Pagi';
    Icon = Sunrise;
  } else if (timeVal >= 11 && timeVal < 15) {
    greeting = cleanName ? `Selamat Siang, ${cleanName}` : 'Selamat Siang';
    Icon = Sun;
  } else if (timeVal >= 15 && timeVal < 18.5) {
    greeting = cleanName ? `Selamat Sore, ${cleanName}` : 'Selamat Sore';
    Icon = Sunset;
  } else {
    greeting = cleanName ? `Selamat Malam, ${cleanName}` : 'Selamat Malam';
    Icon = Moon;
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = now.toLocaleDateString('id-ID', dateOptions);

  return { greeting, formattedDate, Icon, titlePrefix };
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const {
    books,
    isLoadingBooks,
    lastRead,
    history,
    bookmarks,
    highlights,
    translations,
    currentTranslation,
    setTranslation,
    navigateTo,
    userProfile,
    openCover,
  } = useBible();

  const [testamentFilter, setTestamentFilter] = useState<'ALL' | Testament>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [latestDevotional, setLatestDevotional] = useState<Devotional | null>(null);
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
  const [isLoadingDevotional, setIsLoadingDevotional] = useState<boolean>(true);

  const [verseOfTheDay, setVerseOfTheDay] = useState<DailyVerse | null>(null);
  const [isLoadingVOTD, setIsLoadingVOTD] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingVOTD(true);
    bibleDataService
      .getVerseOfTheDay()
      .then((v) => {
        if (isMounted) {
          setVerseOfTheDay(v);
        }
      })
      .catch((err) => {
        console.error('Error fetching Verse of the Day:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingVOTD(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    DevotionalService.getDevotionals()
      .then((items) => {
        if (isMounted && items && items.length > 0) {
          setLatestDevotional(items[0]);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingDevotional(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleContinueReading = () => {
    if (lastRead) {
      navigateTo(
        lastRead.translation,
        lastRead.bookId,
        lastRead.chapter,
        lastRead.verse
      );
    } else {
      navigateTo(currentTranslation, 'kejadian', 1);
    }
    navigate('/reader');
  };

  const handleBookClick = (book: Book) => {
    navigateTo(currentTranslation, book.id, 1);
    navigate('/reader');
  };

  const handleVOTDClick = () => {
    if (verseOfTheDay) {
      navigateTo(
        verseOfTheDay.translation || 'tb',
        verseOfTheDay.bookId,
        verseOfTheDay.chapter,
        verseOfTheDay.verse
      );
      navigate('/reader');
    }
  };

  const filteredBooks = books.filter((b) => {
    const matchesTestament =
      testamentFilter === 'ALL' || b.testament === testamentFilter;
    const matchesQuery =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTestament && matchesQuery;
  });

  const { greeting, formattedDate, Icon: GreetingIcon } = getGreetingInfo(
    userProfile.name,
    userProfile.gender
  );

  return (
    <div className="flex-1 flex flex-col overflow-y-auto max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8">
      <SEOHead title="Beranda" />
      {/* Top Header Bar */}
      <header className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Quick Search Input Pill */}
        <div
          onClick={() => navigate('/search')}
          className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] flex items-center px-5 py-3.5 rounded-full max-w-md w-full cursor-pointer hover:border-[#CD0000] transition-all duration-200 group"
        >
          <Search size={18} className="text-[var(--text-secondary)] mr-3 group-hover:text-[#CD0000] transition-colors" />
          <span className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium flex-1">
            Cari ayat, kitab, atau topik...
          </span>
          <kbd className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-bold text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
            ⌘K
          </kbd>
        </div>

        {/* Translation Selector Pill */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-1.5 rounded-2xl">
            <select
              value={currentTranslation}
              onChange={(e) => setTranslation(e.target.value)}
              className="bg-transparent text-xs font-bold text-[var(--text-primary)] cursor-pointer focus:outline-none"
            >
              {translations.map((tr) => (
                <option key={tr.id} value={tr.id} className="bg-[var(--bg-card)] text-[var(--text-primary)]">
                  {tr.shortName} ({tr.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Greeting & Date Sub-Header Banner */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] px-6 py-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[var(--bg-card-secondary)] flex items-center justify-center text-[#CD0000] shrink-0 border border-[var(--border-color)]">
            <GreetingIcon size={20} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {greeting}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-medium flex items-center gap-1.5 mt-0.5">
              <Calendar size={13} className="text-[#CD0000]" />
              <span>{formattedDate}</span>
              {userProfile.gender && (
                <span className="text-[11px] text-[var(--text-secondary)]">
                  • {userProfile.gender === 'female' ? '👩 Saudari' : '👨 Saudara'}
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={openCover}
          className="self-start sm:self-center px-3 py-1.5 rounded-xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000]/40 text-xs font-semibold text-[var(--text-secondary)] hover:text-[#CD0000] transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Buka kembali cover aplikasi atau ubah profil"
        >
          <User size={13} />
          <span>{userProfile.name ? 'Ubah Profil' : 'Ubah Nama'}</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hero Continue Reading (Large 8-col span) */}
        <div className="lg:col-span-8 bg-[var(--bg-card)] border border-[var(--border-color)] p-7 sm:p-9 rounded-[28px] flex flex-col justify-between relative overflow-hidden group shadow-sm">
          {/* Floral Background Pattern (Opsi 1) */}
          <FloralBackground />

          <div className="relative z-10 flex justify-between items-start mb-6">
            <span className="text-[#CD0000] text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={16} />
              Lanjut Membaca
            </span>
            <span className="text-[var(--text-secondary)] text-xs font-semibold bg-[var(--bg-card-secondary)] border border-[var(--border-color)] px-3 py-1 rounded-full">
              {lastRead ? `Aktif: ${lastRead.translation.toUpperCase()}` : 'Siap membaca'}
            </span>
          </div>

          <div className="relative z-10 space-y-3 mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {lastRead ? `${formatBookName(lastRead.bookName || lastRead.bookId, books)} Pasal ${lastRead.chapter}` : 'Kejadian Pasal 1'}
            </h2>
            <p className="text-sm sm:text-base font-normal leading-relaxed text-[var(--text-secondary)]">
              {lastRead
                ? `Melanjutkan bacaan Anda di ${formatBookName(lastRead.bookName || lastRead.bookId, books)} pasal ${lastRead.chapter}.`
                : '1 Pada mulanya Allah menciptakan langit dan bumi. 2 Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya...'}
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={handleContinueReading}
              className="bg-[#CD0000] hover:bg-[#A60000] text-white px-7 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2.5 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span>{lastRead ? 'Lanjut Membaca' : 'Mulai Membaca'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Card Ayat Hari Ini (Exact Specification) */}
        <div className="lg:col-span-4 bg-[#000000] border border-[#2F2F2F] text-white rounded-[28px] p-7 flex flex-col justify-between shadow-xl min-h-[300px] relative">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#A5A5A5] text-xs font-bold uppercase tracking-widest">
                Ayat Hari Ini
              </span>
              <Sparkles size={18} className="text-[#CD0000]" />
            </div>
            {isLoadingVOTD ? (
              <div className="space-y-3 animate-pulse py-4">
                <div className="h-4 bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-800 rounded w-3/4" />
                <div className="h-3 bg-gray-800 rounded w-1/3 mt-2" />
              </div>
            ) : verseOfTheDay ? (
              <>
                <p className="text-lg sm:text-xl font-serif font-normal leading-relaxed text-[#FFFFFF]">
                  {verseOfTheDay.text}
                </p>
                <p className="text-xs text-[#A5A5A5] font-medium tracking-wide">
                  — {verseOfTheDay.reference} (TB)
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-400">Tidak dapat memuat ayat hari ini.</p>
            )}
          </div>

          <button
            onClick={handleVOTDClick}
            disabled={!verseOfTheDay || isLoadingVOTD}
            className="w-full mt-6 bg-[#CD0000] hover:bg-[#A60000] disabled:opacity-50 text-white py-3.5 px-5 rounded-2xl text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
          >
            <span>Baca Konteks Ayat</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Renungan Harian Terbaru Section */}
        <div className="lg:col-span-12 bg-[var(--bg-card)] border border-[var(--border-color)] p-7 sm:p-8 rounded-[28px] relative overflow-hidden group shadow-sm hover:border-[#CD0000] transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--bg-card-secondary)] rounded-2xl flex items-center justify-center text-[#CD0000]">
                <Heart size={20} />
              </div>
              <div>
                <span className="text-[#CD0000] text-[10px] font-extrabold uppercase tracking-widest block">
                  Saat Teduh & Firman
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  Renungan Harian Terbaru
                </h2>
              </div>
            </div>

            <button
              onClick={() => navigate('/renungan')}
              className="text-xs font-bold text-[#CD0000] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Lihat Semua Renungan</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {isLoadingDevotional ? (
            <div className="p-6 bg-[var(--bg-card-secondary)] rounded-2xl animate-pulse h-40" />
          ) : latestDevotional ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Optional Cover image if available */}
              {DevotionalService.getCoverUrl(latestDevotional.cover) && (
                <div className="md:col-span-4 h-48 md:h-full rounded-2xl overflow-hidden bg-[var(--bg-card-secondary)]">
                  <img
                    src={DevotionalService.getCoverUrl(latestDevotional.cover)}
                    alt={latestDevotional.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className={`${DevotionalService.getCoverUrl(latestDevotional.cover) ? 'md:col-span-8' : 'md:col-span-12'} space-y-4`}>
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-[var(--text-secondary)]">
                  <div className="flex items-center gap-1.5 bg-[var(--bg-card-secondary)] px-3 py-1 rounded-full border border-[var(--border-color)] text-[11px]">
                    <Calendar size={13} className="text-[#CD0000]" />
                    <span>{DevotionalService.formatIndonesianDate(latestDevotional.date)}</span>
                  </div>

                  {latestDevotional.tags && (
                    <div className="flex items-center gap-1.5">
                      {latestDevotional.tags.split(',').slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold text-[#CD0000] bg-[var(--bg-card-secondary)] border border-[var(--border-color)] px-2.5 py-0.5 rounded-full"
                        >
                          #{t.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h3
                  onClick={() => setSelectedDevotional(latestDevotional)}
                  className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-tight group-hover:text-[#CD0000] transition-colors cursor-pointer"
                >
                  {latestDevotional.title}
                </h3>

                {latestDevotional.verses && (
                  <div className="p-3.5 rounded-2xl bg-[var(--bg-card-secondary)] border border-[var(--border-color)] text-xs font-serif italic text-[var(--text-primary)] leading-relaxed">
                    {latestDevotional.verses}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {latestDevotional.opening || latestDevotional.core}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedDevotional(latestDevotional)}
                    className="bg-[#CD0000] hover:bg-[#A60000] text-white px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all duration-200"
                  >
                    <span>Baca Renungan Hari Ini</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-[var(--text-secondary)]">
              Renungan harian belum tersedia saat ini.
            </div>
          )}
        </div>

        {/* Quick Stats Grid Row */}
        <div className="lg:col-span-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--bg-card-secondary)] rounded-2xl flex items-center justify-center text-[#CD0000]">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">Sudah Dibaca</p>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">
                {history.length || 1} <span className="text-xs font-normal text-[var(--text-secondary)]">Pasal</span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--bg-card-secondary)] rounded-2xl flex items-center justify-center text-[#CD0000]">
              <BookmarkIcon size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">Penanda</p>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">
                {bookmarks.length} <span className="text-xs font-normal text-[var(--text-secondary)]">Ayat</span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--bg-card-secondary)] rounded-2xl flex items-center justify-center text-[#CD0000]">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">Sorotan</p>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">
                {highlights.length} <span className="text-xs font-normal text-[var(--text-secondary)]">Ayat</span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-5 rounded-2xl flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--bg-card-secondary)] rounded-2xl flex items-center justify-center text-[#CD0000]">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)] font-medium">Riwayat</p>
              <p className="text-xl font-extrabold text-[var(--text-primary)]">
                {history.length} <span className="text-xs font-normal text-[var(--text-secondary)]">Item</span>
              </p>
            </div>
          </div>
        </div>

        {/* Recent Reading History */}
        <div className="lg:col-span-12 bg-[var(--bg-card)] border border-[var(--border-color)] p-7 rounded-[28px]">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[var(--text-primary)] text-base font-extrabold tracking-tight flex items-center gap-2">
              <Clock size={18} className="text-[#CD0000]" />
              Riwayat Bacaan Terakhir
            </span>
            <button
              onClick={() => navigate('/bookmarks')}
              className="text-xs font-bold text-[#CD0000] hover:underline"
            >
              Lihat Semua Penanda
            </button>
          </div>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.translation, item.bookId, item.chapter, item.verse);
                    navigate('/reader');
                  }}
                  className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] hover:border-[#CD0000] p-4 rounded-2xl flex items-center justify-between cursor-pointer group transition-all duration-200"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-10 h-10 bg-[var(--bg-card)] rounded-xl flex items-center justify-center text-[#CD0000] font-extrabold text-xs">
                      {formatBookName(item.bookName || item.bookId, books).slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[#CD0000] transition-colors">
                        {formatBookName(item.bookName || item.bookId, books)} {item.chapter}
                      </p>
                      <p className="text-[10px] text-[var(--text-secondary)] font-semibold uppercase">
                        Terjemahan: {item.translation.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#CD0000]">
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs font-medium text-[var(--text-secondary)]">
              Riwayat bacaan Anda akan otomatis muncul di sini.
            </div>
          )}
        </div>
      </div>

      {/* Books Catalog Grid Section */}
      <section className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Perpustakaan Alkitab
            </h2>
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              Jelajahi seluruh 66 kitab Perjanjian Lama dan Perjanjian Baru
            </p>
          </div>

          {/* Filter Pills */}
          <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] p-1 rounded-2xl flex items-center gap-1 self-start sm:self-auto overflow-x-auto no-scrollbar">
            {(['ALL', 'OT', 'NT'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTestamentFilter(t)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  testamentFilter === t
                    ? 'bg-[#CD0000] text-white shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/40'
                }`}
              >
                {t === 'ALL' ? 'Semua (66)' : t === 'OT' ? 'Perjanjian Lama' : 'Perjanjian Baru'}
              </button>
            ))}
          </div>
        </div>

        {/* Search input for books */}
        <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-color)] px-5 py-3.5 rounded-full flex items-center">
          <Search size={18} className="text-[var(--text-secondary)] mr-3" />
          <input
            type="text"
            placeholder="Cari kitab berdasarkan nama atau singkatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-[var(--text-primary)] focus:outline-none placeholder-[var(--text-secondary)]"
          />
        </div>

        {/* Books Grid */}
        {isLoadingBooks ? (
          <div className="py-12 text-center text-xs font-semibold text-[var(--text-secondary)]">
            Memuat daftar kitab...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredBooks.map((book) => (
              <motion.button
                key={book.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleBookClick(book)}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[#CD0000] p-4 rounded-2xl text-left flex flex-col justify-between h-28 group transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-card-secondary)] text-[10px] font-extrabold text-[#CD0000] group-hover:bg-[#CD0000] group-hover:text-white transition-colors uppercase">
                    {book.abbreviation}
                  </span>
                  <span className="text-[10px] font-medium text-[var(--text-secondary)]">
                    {book.chaptersCount} ps
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xs text-[var(--text-primary)] group-hover:text-[#CD0000] transition-colors line-clamp-1">
                    {book.name}
                  </h3>
                  <span className="text-[10px] font-medium text-[var(--text-secondary)]">
                    {book.group}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {/* Devotional Reader Modal */}
      <DevotionalModal
        devotional={selectedDevotional}
        onClose={() => setSelectedDevotional(null)}
      />
    </div>
  );
};
