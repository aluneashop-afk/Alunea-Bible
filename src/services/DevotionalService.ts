import { Devotional } from '../types/devotional';

const DEVOTIONAL_API_URL = '/api/renungan';
const DEVOTIONAL_FALLBACK_URL = 'https://alunea.id/renungan-harian/renungan.json';
const DEVOTIONAL_CORS_PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(DEVOTIONAL_FALLBACK_URL)}`;
const CACHE_KEY = 'alunea_renungan_cache_v1';
const CACHE_TIME_KEY = 'alunea_renungan_cache_time';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

let inMemoryCache: Devotional[] | null = null;

export const DevotionalService = {
  /**
   * Fetch devotionals from API or cache
   */
  async getDevotionals(): Promise<Devotional[]> {
    if (inMemoryCache && inMemoryCache.length > 0) {
      return inMemoryCache;
    }

    // Try reading local storage cache first for instant load
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const cacheTime = localStorage.getItem(CACHE_TIME_KEY);
      if (cached && cacheTime) {
        const timeDiff = Date.now() - parseInt(cacheTime, 10);
        if (timeDiff < CACHE_TTL) {
          const parsed: Devotional[] = JSON.parse(cached);
          inMemoryCache = this.sortDevotionals(parsed);
          // Fetch fresh in background
          this.refreshInBackground();
          return inMemoryCache;
        }
      }
    } catch (e) {
      console.warn('Failed to read devotional cache from localStorage', e);
    }

    return await this.fetchFresh();
  },

  async fetchFresh(): Promise<Devotional[]> {
    const urlsToTry = [
      DEVOTIONAL_API_URL,
      DEVOTIONAL_FALLBACK_URL,
      DEVOTIONAL_CORS_PROXY_URL,
    ];

    let data: Devotional[] | null = null;

    for (const url of urlsToTry) {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const json = await response.json();
          if (Array.isArray(json) && json.length > 0) {
            data = json;
            break; // Successfully got data!
          }
        }
      } catch (err) {
        // Continue to next URL
      }
    }

    if (!data) {
      console.warn('All fetch attempts for renungan harian failed.');
      // Fallback to expired cache if available
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: Devotional[] = JSON.parse(cached);
          inMemoryCache = this.sortDevotionals(parsed);
          return inMemoryCache;
        }
      } catch (e) {
        // ignore
      }
      return [];
    }

    const sorted = this.sortDevotionals(data);
    inMemoryCache = sorted;

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(sorted));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.warn('Failed to cache devotionals to localStorage', e);
    }

    return sorted;
  },

  async refreshInBackground() {
    try {
      await this.fetchFresh();
    } catch (e) {
      // background refresh fail silent
    }
  },

  sortDevotionals(items: Devotional[]): Devotional[] {
    return [...items].sort((a, b) => {
      // Compare dates YYYY-MM-DD descending
      const dateA = a.date || '';
      const dateB = b.date || '';
      return dateB.localeCompare(dateA);
    });
  },

  getCoverUrl(cover?: string): string {
    if (!cover) return '';
    if (cover.startsWith('http://') || cover.startsWith('https://')) {
      return cover;
    }
    const cleanPath = cover.replace(/^\//, '');
    return `https://alunea.id/renungan-harian/${cleanPath}`;
  },

  formatIndonesianDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      
      const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
      return dateObj.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }
};
