import {
  Book,
  BookContent,
  BookGroup,
  Chapter,
  DailyVerse,
  SearchResult,
  Translation,
  Verse,
} from '../types/bible';

export const TRANSLATIONS: Translation[] = [
  { id: 'tb', name: 'Terjemahan Baru', language: 'Indonesian', shortName: 'TB' },
];

export const DIRECT_API_KEY = 'aip_live_SWX40QLFVWS9aJAg2c4bR35Cpu21ZYa4';

// Standard 66 books mapping to apiindonesia.id abbreviation
const BOOK_ID_TO_API_ABBR: Record<string, string> = {
  kejadian: 'Kej',
  keluaran: 'Kel',
  imamat: 'Ima',
  bilangan: 'Bil',
  ulangan: 'Ula',
  yosua: 'Yos',
  'hakim-hakim': 'Hak',
  rut: 'Rut',
  '1-samuel': '1Sam',
  '2-samuel': '2Sam',
  '1-raja-raja': '1Raj',
  '2-raja-raja': '2Raj',
  '1-tawarikh': '1Taw',
  '2-tawarikh': '2Taw',
  ezra: 'Ezr',
  nehemia: 'Neh',
  ester: 'Est',
  ayub: 'Ayb',
  mazmur: 'Maz',
  amsal: 'Ams',
  pengkhotbah: 'Pkh',
  'kidung-agung': 'Kid',
  yesaya: 'Yes',
  yeremia: 'Yer',
  ratapan: 'Rat',
  yehezkiel: 'Yeh',
  daniel: 'Dan',
  hosea: 'Hos',
  yoel: 'Yoe',
  amos: 'Amo',
  obaja: 'Oba',
  yunus: 'Yun',
  mikha: 'Mik',
  nahum: 'Nah',
  habakuk: 'Hab',
  zefanya: 'Zef',
  hagai: 'Hag',
  zakharia: 'Zak',
  maleakhi: 'Mal',
  matius: 'Mat',
  markus: 'Mrk',
  lukas: 'Luk',
  yohanes: 'Yoh',
  'kisah-para-rasul': 'Kis',
  roma: 'Rom',
  '1-korintus': '1Kor',
  '2-korintus': '2Kor',
  galatia: 'Gal',
  efesus: 'Efe',
  filipi: 'Fli',
  kolose: 'Kol',
  '1-tesalonika': '1Tes',
  '2-tesalonika': '2Tes',
  '1-timotius': '1Tim',
  '2-timotius': '2Tim',
  titus: 'Tit',
  filemon: 'Flm',
  ibrani: 'Ibr',
  yakobus: 'Yak',
  '1-petrus': '1Pet',
  '2-petrus': '2Pet',
  '1-yohanes': '1Yoh',
  '2-yohanes': '2Yoh',
  '3-yohanes': '3Yoh',
  yudas: 'Yud',
  wahyu: 'Wah',
};

const API_ABBR_TO_BOOK_SLUG: Record<string, string> = {
  Kej: 'kejadian',
  Kel: 'keluaran',
  Ima: 'imamat',
  Bil: 'bilangan',
  Ula: 'ulangan',
  Yos: 'yosua',
  Hak: 'hakim-hakim',
  Rut: 'rut',
  '1Sam': '1-samuel',
  '2Sam': '2-samuel',
  '1Raj': '1-raja-raja',
  '2Raj': '2-raja-raja',
  '1Taw': '1-tawarikh',
  '2Taw': '2-tawarikh',
  Ezr: 'ezra',
  Neh: 'nehemia',
  Est: 'ester',
  Ayb: 'ayub',
  Maz: 'mazmur',
  Ams: 'amsal',
  Pkh: 'pengkhotbah',
  Kid: 'kidung-agung',
  Yes: 'yesaya',
  Yer: 'yeremia',
  Rat: 'ratapan',
  Yeh: 'yehezkiel',
  Dan: 'daniel',
  Hos: 'hosea',
  Yoe: 'yoel',
  Amo: 'amos',
  Oba: 'obaja',
  Yun: 'yunus',
  Mik: 'mikha',
  Nah: 'nahum',
  Hab: 'habakuk',
  Zef: 'zefanya',
  Hag: 'hagai',
  Zak: 'zakharia',
  Mal: 'maleakhi',
  Mat: 'matius',
  Mrk: 'markus',
  Luk: 'lukas',
  Yoh: 'yohanes',
  Kis: 'kisah-para-rasul',
  Rom: 'roma',
  '1Kor': '1-korintus',
  '2Kor': '2-korintus',
  Gal: 'galatia',
  Efe: 'efesus',
  Fli: 'filipi',
  Kol: 'kolose',
  '1Tes': '1-tesalonika',
  '2Tes': '2-tesalonika',
  '1Tim': '1-timotius',
  '2Tim': '2-timotius',
  Tit: 'titus',
  Flm: 'filemon',
  Ibr: 'ibrani',
  Yak: 'yakobus',
  '1Pet': '1-petrus',
  '2Pet': '2-petrus',
  '1Yoh': '1-yohanes',
  '2Yoh': '2-yohanes',
  '3Yoh': '3-yohanes',
  Yud: 'yudas',
  Wah: 'wahyu',
};

const LEGACY_CODE_TO_INDEX: Record<string, number> = {
  GEN: 1, EXO: 2, LEV: 3, NUM: 4, DEU: 5,
  JOS: 6, JOSH: 6, JDG: 7, JUDG: 7, RUT: 8, RUTH: 8,
  '1SAM': 9, '2SAM': 10, '1KGS': 11, '2KGS': 12, '1CHR': 13, '2CHR': 14,
  EZR: 15, EZRA: 15, NEH: 16, EST: 17, AYB: 18, JOB: 18,
  MZM: 19, PSA: 19, PS: 19, AMS: 20, PROV: 20, PKH: 21, ECC: 21,
  KID: 22, SNG: 22, SONG: 22, YES: 23, ISA: 23, YER: 24, JER: 24,
  RAT: 25, LAM: 25, YEH: 26, EZEK: 26, DAN: 27, HOS: 28,
  YL: 29, JOEL: 29, AM: 30, AMOS: 30, OB: 31, OBAD: 31,
  YUN: 32, JON: 32, MI: 33, MIC: 33, NAH: 34, HAB: 35,
  ZEF: 36, ZEPH: 36, HAG: 37, ZA: 38, ZECH: 38, MAL: 39,
  MAT: 40, MATT: 40, MRK: 41, MARK: 41, LUK: 42, LUKE: 42,
  YOH: 43, JOHN: 43, KIS: 44, ACTS: 44, RM: 45, ROM: 45,
  '1KOR': 46, '1COR': 46, '2KOR': 47, '2COR': 47, GAL: 48, EF: 49, EPH: 49,
  FLP: 50, PHIL: 50, KOL: 51, COL: 51, '1TES': 52, '1THESS': 52,
  '2TES': 53, '2THESS': 53, '1TIM': 54, '2TIM': 55, TIT: 56, TITUS: 56,
  FLM: 57, PHILEM: 57, IBR: 58, HEB: 58, YAK: 59, JAS: 59,
  '1PTR': 60, '1PET': 60, '2PTR': 61, '2PET': 61, '1YOH': 62, '1JOHN': 62,
  '2YOH': 63, '2JOHN': 63, '3YOH': 64, '3JOHN': 64, YUD: 65, JUDE: 65,
  WHY: 66, REV: 66,
};

function getBookGroup(id: number, testament: string): BookGroup {
  if (testament === 'OT' || id <= 39) {
    if (id <= 5) return 'Pentateuch';
    if (id <= 17) return 'History';
    if (id <= 22) return 'Poetry';
    return 'Prophets';
  } else {
    if (id <= 43) return 'Gospels';
    if (id === 44) return 'History';
    if (id <= 65) return 'Epistles';
    return 'Revelation';
  }
}

class BibleDataService {
  private booksCache: Book[] | null = null;
  private chapterCache: Map<string, Chapter> = new Map();

  getTranslations(): Translation[] {
    return TRANSLATIONS;
  }

  /**
   * Helper to perform API call with server proxy first, and graceful direct fallback
   */
  private async fetchAlkitabApi(endpointPath: string): Promise<any> {
    const cleanPath = endpointPath.startsWith('/') ? endpointPath.slice(1) : endpointPath;

    // 1. Try server proxy route first (/api/alkitab/*)
    try {
      const proxyRes = await fetch(`/api/alkitab/${cleanPath}`, {
        headers: { Accept: 'application/json' },
      });
      if (proxyRes.ok) {
        const json = await proxyRes.json();
        if (json && (json.success !== false || json.data)) {
          return json;
        }
      }
    } catch {
      // Fall through to direct API call
    }

    // 2. Direct fallback to apiindonesia.id with user API token
    try {
      const directUrl = `https://use.apiindonesia.id/api/v1/alkitab/${cleanPath}`;
      const directRes = await fetch(directUrl, {
        headers: {
          'x-api-key': DIRECT_API_KEY,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AluneaBible/1.0',
          Accept: 'application/json',
        },
      });
      if (directRes.ok) {
        return await directRes.json();
      }
    } catch (e) {
      console.error(`Failed to fetch from API Alkitab (${cleanPath}):`, e);
    }

    return null;
  }

  /**
   * Loads books metadata list from books.json or API
   */
  async getBooks(): Promise<Book[]> {
    if (this.booksCache && this.booksCache.length > 0) {
      return this.booksCache;
    }

    // 1. Try local books.json
    try {
      const response = await fetch('/data/bible/books.json');
      if (response.ok) {
        const rawData = await response.json();
        const mappedBooks: Book[] = rawData.map((item: any) => ({
          id: item.slug,
          name: item.name,
          abbreviation: item.short_name || item.name,
          testament: item.testament,
          chaptersCount: item.chapters,
          group: getBookGroup(item.id, item.testament),
          slug: item.slug,
          file: item.file,
        }));
        this.booksCache = mappedBooks;
        return mappedBooks;
      }
    } catch {
      // Fall through to API
    }

    // 2. Fallback to API /api/v1/alkitab/books
    const apiData = await this.fetchAlkitabApi('books');
    if (apiData && Array.isArray(apiData.data)) {
      const mappedBooks: Book[] = apiData.data.map((item: any) => {
        const slug =
          API_ABBR_TO_BOOK_SLUG[item.abbr] ||
          item.name.toLowerCase().replace(/\s+/g, '-');
        return {
          id: slug,
          name: item.name,
          abbreviation: item.abbr,
          testament: item.testament === 'PL' ? 'OT' : 'NT',
          chaptersCount: item.chapter_count,
          group: getBookGroup(item.id, item.testament === 'PL' ? 'OT' : 'NT'),
          slug,
          file: `${slug}.json`,
        };
      });
      this.booksCache = mappedBooks;
      return mappedBooks;
    }

    return [];
  }

  /**
   * Retrieves single book metadata by ID, slug, name, or legacy code
   */
  async getBook(bookId: string): Promise<Book | undefined> {
    const books = await this.getBooks();
    if (!bookId) return books[0];

    const q = bookId.trim().toLowerCase();

    // 1. Check slug match
    let found = books.find((b) => b.slug?.toLowerCase() === q);
    if (found) return found;

    // 2. Check id match
    found = books.find((b) => b.id.toLowerCase() === q);
    if (found) return found;

    // 3. Check name or abbreviation match
    found = books.find(
      (b) => b.name.toLowerCase() === q || b.abbreviation.toLowerCase() === q
    );
    if (found) return found;

    // 4. Check legacy code mapping
    const numId = LEGACY_CODE_TO_INDEX[bookId.toUpperCase()];
    if (numId && books[numId - 1]) {
      return books[numId - 1];
    }

    // 5. Check numeric index
    const parsedNum = parseInt(bookId, 10);
    if (!isNaN(parsedNum) && parsedNum >= 1 && parsedNum <= books.length) {
      return books[parsedNum - 1];
    }

    return undefined;
  }

  /**
   * Resolves book to the abbreviation expected by apiindonesia.id
   */
  private getApiAbbr(book: Book): string {
    if (book.slug && BOOK_ID_TO_API_ABBR[book.slug]) {
      return BOOK_ID_TO_API_ABBR[book.slug];
    }
    if (BOOK_ID_TO_API_ABBR[book.id]) {
      return BOOK_ID_TO_API_ABBR[book.id];
    }
    return book.abbreviation || book.name;
  }

  /**
   * Retrieves verses for a given chapter from apiindonesia.id with caching
   */
  async getChapter(
    _translation: string,
    bookId: string,
    chapterNumber: number
  ): Promise<Chapter | null> {
    const book = await this.getBook(bookId);
    if (!book) {
      console.warn(`Kitab ${bookId} tidak ditemukan.`);
      return null;
    }

    const abbr = this.getApiAbbr(book);
    const cacheKey = `tb_${book.slug || book.id}_${chapterNumber}`;

    // 1. Memory Cache
    if (this.chapterCache.has(cacheKey)) {
      return this.chapterCache.get(cacheKey)!;
    }

    // 2. LocalStorage Cache for instant repeat access & offline support
    const storageKey = `alkitab_chap_${cacheKey}`;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.verses)) {
          this.chapterCache.set(cacheKey, parsed);
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage errors
    }

    // 3. Fetch from API (proxy or direct)
    try {
      const apiResponse = await this.fetchAlkitabApi(`passage/${encodeURIComponent(abbr)}/${chapterNumber}`);
      if (apiResponse && apiResponse.data && Array.isArray(apiResponse.data.verses)) {
        const verses: Verse[] = apiResponse.data.verses.map((v: any) => ({
          verse: v.verse_number,
          text: v.text,
          title: v.title || null,
        }));

        const chapterObj: Chapter = {
          chapter: apiResponse.data.chapter || chapterNumber,
          verses,
        };

        // Cache in memory
        this.chapterCache.set(cacheKey, chapterObj);

        // Cache in localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(chapterObj));
        } catch {
          // Ignore quota exceeded
        }

        return chapterObj;
      }
    } catch (err) {
      console.error(`Error loading chapter ${book.name} ${chapterNumber} from API:`, err);
    }

    return null;
  }

  /**
   * Retrieves full content for a given book (compat method)
   */
  async getBookContent(translation: string, bookId: string): Promise<BookContent> {
    const book = await this.getBook(bookId);
    if (!book) {
      throw new Error(`Kitab "${bookId}" tidak ditemukan.`);
    }

    // Preload chapter 1
    const ch1 = await this.getChapter(translation, book.id, 1);
    const chapters: Chapter[] = ch1 ? [ch1] : [];

    return {
      bookId: book.id,
      bookName: book.name,
      translation: 'tb',
      chapters,
    };
  }

  /**
   * Retrieves a specific verse
   */
  async getVerse(
    translation: string,
    bookId: string,
    chapterNumber: number,
    verseNumber: number
  ): Promise<Verse | null> {
    const chapter = await this.getChapter(translation, bookId, chapterNumber);
    if (!chapter) return null;
    return chapter.verses.find((v) => v.verse === verseNumber) || null;
  }

  /**
   * Real-time search across all 31,104 Bible verses using apiindonesia.id search endpoint
   */
  async search(query: string, _translation: string): Promise<SearchResult[]> {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return [];

    const results: SearchResult[] = [];
    const books = await this.getBooks();

    // 1. Check matching book names
    for (const b of books) {
      if (
        b.name.toLowerCase().includes(trimmed.toLowerCase()) ||
        b.abbreviation.toLowerCase() === trimmed.toLowerCase() ||
        (b.slug && b.slug.toLowerCase() === trimmed.toLowerCase())
      ) {
        results.push({
          bookId: b.id,
          bookName: b.name,
          chapter: 1,
          verse: 1,
          text: `${b.name} (${b.testament === 'OT' ? 'Perjanjian Lama' : 'Perjanjian Baru'} · ${b.chaptersCount} pasal)`,
          translation: 'tb',
        });
      }
    }

    // 2. Call API search endpoint (/api/v1/alkitab/search?q=...)
    try {
      const searchData = await this.fetchAlkitabApi(
        `search?q=${encodeURIComponent(trimmed)}&limit=60`
      );

      if (searchData && Array.isArray(searchData.data)) {
        for (const item of searchData.data) {
          const bookSlug =
            API_ABBR_TO_BOOK_SLUG[item.abbr] ||
            item.name.toLowerCase().replace(/\s+/g, '-');

          results.push({
            bookId: bookSlug,
            bookName: item.name,
            chapter: item.chapter,
            verse: item.verse_number,
            text: item.text,
            translation: 'tb',
          });
        }
      }
    } catch (err) {
      console.error('Error in API Alkitab search:', err);
    }

    return results;
  }

  /**
   * Helper to calculate the next chapter
   */
  async nextChapter(
    _translation: string,
    currentBookId: string,
    currentChapter: number
  ): Promise<{ bookId: string; chapter: number } | null> {
    const books = await this.getBooks();
    const currentBook = await this.getBook(currentBookId);
    if (!currentBook) return null;

    const currentIndex = books.findIndex((b) => b.slug === currentBook.slug || b.id === currentBook.id);
    if (currentIndex === -1) return null;

    if (currentChapter < currentBook.chaptersCount) {
      return { bookId: currentBook.id, chapter: currentChapter + 1 };
    } else if (currentIndex < books.length - 1) {
      const nextBook = books[currentIndex + 1];
      return { bookId: nextBook.id, chapter: 1 };
    }

    return null;
  }

  /**
   * Helper to calculate the previous chapter
   */
  async previousChapter(
    _translation: string,
    currentBookId: string,
    currentChapter: number
  ): Promise<{ bookId: string; chapter: number } | null> {
    const books = await this.getBooks();
    const currentBook = await this.getBook(currentBookId);
    if (!currentBook) return null;

    const currentIndex = books.findIndex((b) => b.slug === currentBook.slug || b.id === currentBook.id);
    if (currentIndex === -1) return null;

    if (currentChapter > 1) {
      return { bookId: currentBook.id, chapter: currentChapter - 1 };
    } else if (currentIndex > 0) {
      const prevBook = books[currentIndex - 1];
      return { bookId: prevBook.id, chapter: prevBook.chaptersCount };
    }

    return null;
  }

  /**
   * Preload a chapter into memory & local cache
   */
  async preloadBook(translation: string, bookId: string, chapter: number = 1): Promise<void> {
    try {
      await this.getChapter(translation, bookId, chapter);
    } catch {
      // Silent catch for preloading
    }
  }

  /**
   * Generates inspiring Daily Verse deterministically or from curated list, loaded via API
   */
  async getVerseOfTheDay(dateStr?: string): Promise<DailyVerse> {
    const todayStr = dateStr || new Date().toISOString().split('T')[0];

    const INSPIRING_VERSES = [
      { bookId: 'yohanes', name: 'Yohanes', abbr: 'Yoh', chapter: 3, verse: 16, defaultText: 'Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.' },
      { bookId: 'yeremia', name: 'Yeremia', abbr: 'Yer', chapter: 29, verse: 11, defaultText: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.' },
      { bookId: 'filipi', name: 'Filipi', abbr: 'Fli', chapter: 4, verse: 13, defaultText: 'Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.' },
      { bookId: 'mazmur', name: 'Mazmur', abbr: 'Maz', chapter: 23, verse: 1, defaultText: 'TUHAN adalah gembalaku, takkan kekurangan aku.' },
      { bookId: 'amsal', name: 'Amsal', abbr: 'Ams', chapter: 3, verse: 5, defaultText: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri.' },
      { bookId: 'roma', name: 'Roma', abbr: 'Rom', chapter: 8, verse: 28, defaultText: 'Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia, yaitu bagi mereka yang terpanggil sesuai dengan rencana Allah.' },
      { bookId: 'yesaya', name: 'Yesaya', abbr: 'Yes', chapter: 40, verse: 31, defaultText: 'tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.' },
      { bookId: 'matius', name: 'Matius', abbr: 'Mat', chapter: 6, verse: 33, defaultText: 'Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu.' },
      { bookId: 'yosua', name: 'Yosua', abbr: 'Yos', chapter: 1, verse: 9, defaultText: 'Bukankah telah Kuperintahkan kepadamu: kuatkan dan teguhkanlah hatimu? Janganlah kecut dan tawar hati, sebab TUHAN, Allahmu, menyertai engkau, ke mana pun engkau pergi.' },
      { bookId: 'mazmur', name: 'Mazmur', abbr: 'Maz', chapter: 119, verse: 105, defaultText: 'Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.' },
      { bookId: '1-korintus', name: '1 Korintus', abbr: '1Kor', chapter: 13, verse: 4, defaultText: 'Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong.' },
      { bookId: 'galatia', name: 'Galatia', abbr: 'Gal', chapter: 5, verse: 22, defaultText: 'Tetapi buah Roh ialah: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan,' },
      { bookId: 'yakobus', name: 'Yakobus', abbr: 'Yak', chapter: 1, verse: 17, defaultText: 'Setiap pemberian yang baik dan setiap anugerah yang sempurna, datangnya dari atas, diturunkan dari Bapa segala terang; pada-Nya tidak ada perubahan atau bayangan karena pertukaran.' },
    ];

    let hash = 0;
    for (let i = 0; i < todayStr.length; i++) {
      hash = (hash << 5) - hash + todayStr.charCodeAt(i);
      hash |= 0;
    }
    const chosen = INSPIRING_VERSES[Math.abs(hash) % INSPIRING_VERSES.length];

    try {
      const verseObj = await this.getVerse('tb', chosen.bookId, chosen.chapter, chosen.verse);
      const text = verseObj ? verseObj.text : chosen.defaultText;
      return {
        text: `"${text}"`,
        reference: `${chosen.name} ${chosen.chapter}:${chosen.verse}`,
        translation: 'tb',
        bookId: chosen.bookId,
        bookName: chosen.name,
        chapter: chosen.chapter,
        verse: chosen.verse,
      };
    } catch {
      return {
        text: `"${chosen.defaultText}"`,
        reference: `${chosen.name} ${chosen.chapter}:${chosen.verse}`,
        translation: 'tb',
        bookId: chosen.bookId,
        bookName: chosen.name,
        chapter: chosen.chapter,
        verse: chosen.verse,
      };
    }
  }

  /**
   * Clear in-memory cache
   */
  clearCache(): void {
    this.chapterCache.clear();
    this.booksCache = null;
  }
}

export const bibleDataService = new BibleDataService();
