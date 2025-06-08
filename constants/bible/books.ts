import { Testament } from './testament';

export interface BibleBook {
  id: number;
  code: string;
  abbr_ko: string;
  title_ko: string;
  abbr_en: string;
  title_en: string;
  chapter_count: number;
  testament: Testament;
}

export const bibleBooks: BibleBook[] = [
  // Old Testament
  { id: 1, code: 'GEN', title_ko: '창세기', title_en: 'Genesis', abbr_ko: '창', abbr_en: 'Gen', chapter_count: 50, testament: 'old' },
  { id: 2, code: 'EXO', title_ko: '출애굽기', title_en: 'Exodus', abbr_ko: '출', abbr_en: 'Exo', chapter_count: 40, testament: 'old' },
  { id: 3, code: 'LEV', title_ko: '레위기', title_en: 'Leviticus', abbr_ko: '레', abbr_en: 'Lev', chapter_count: 27, testament: 'old' },
  { id: 4, code: 'NUM', title_ko: '민수기', title_en: 'Numbers', abbr_ko: '민', abbr_en: 'Num', chapter_count: 36, testament: 'old' },
  { id: 5, code: 'DEU', title_ko: '신명기', title_en: 'Deuteronomy', abbr_ko: '신', abbr_en: 'Deu', chapter_count: 34, testament: 'old' },
  { id: 6, code: 'JOS', title_ko: '여호수아', title_en: 'Joshua', abbr_ko: '수', abbr_en: 'Jos', chapter_count: 24, testament: 'old' },
  { id: 7, code: 'JDG', title_ko: '사사기', title_en: 'Judges', abbr_ko: '삿', abbr_en: 'Jdg', chapter_count: 21, testament: 'old' },
  { id: 8, code: 'RUT', title_ko: '룻기', title_en: 'Ruth', abbr_ko: '룻', abbr_en: 'Rut', chapter_count: 4, testament: 'old' },
  { id: 9, code: '1SA', title_ko: '사무엘상', title_en: '1 Samuel', abbr_ko: '삼상', abbr_en: '1Sa', chapter_count: 31, testament: 'old' },
  { id: 10, code: '2SA', title_ko: '사무엘하', title_en: '2 Samuel', abbr_ko: '삼하', abbr_en: '2Sa', chapter_count: 24, testament: 'old' },
  { id: 11, code: '1KI', title_ko: '열왕기상', title_en: '1 Kings', abbr_ko: '왕상', abbr_en: '1Ki', chapter_count: 22, testament: 'old' },
  { id: 12, code: '2KI', title_ko: '열왕기하', title_en: '2 Kings', abbr_ko: '왕하', abbr_en: '2Ki', chapter_count: 25, testament: 'old' },
  { id: 13, code: '1CH', title_ko: '역대상', title_en: '1 Chronicles', abbr_ko: '대상', abbr_en: '1Ch', chapter_count: 29, testament: 'old' },
  { id: 14, code: '2CH', title_ko: '역대하', title_en: '2 Chronicles', abbr_ko: '대하', abbr_en: '2Ch', chapter_count: 36, testament: 'old' },
  { id: 15, code: 'EZR', title_ko: '에스라', title_en: 'Ezra', abbr_ko: '스', abbr_en: 'Ezr', chapter_count: 10, testament: 'old' },
  { id: 16, code: 'NEH', title_ko: '느헤미야', title_en: 'Nehemiah', abbr_ko: '느', abbr_en: 'Neh', chapter_count: 13, testament: 'old' },
  { id: 17, code: 'EST', title_ko: '에스더', title_en: 'Esther', abbr_ko: '에', abbr_en: 'Est', chapter_count: 10, testament: 'old' },
  { id: 18, code: 'JOB', title_ko: '욥기', title_en: 'Job', abbr_ko: '욥', abbr_en: 'Job', chapter_count: 42, testament: 'old' },
  { id: 19, code: 'PSA', title_ko: '시편', title_en: 'Psalms', abbr_ko: '시', abbr_en: 'Psa', chapter_count: 150, testament: 'old' },
  { id: 20, code: 'PRO', title_ko: '잠언', title_en: 'Proverbs', abbr_ko: '잠', abbr_en: 'Pro', chapter_count: 31, testament: 'old' },
  { id: 21, code: 'ECC', title_ko: '전도서', title_en: 'Ecclesiastes', abbr_ko: '전', abbr_en: 'Ecc', chapter_count: 12, testament: 'old' },
  { id: 22, code: 'SNG', title_ko: '아가', title_en: 'Song of Solomon', abbr_ko: '아', abbr_en: 'Sng', chapter_count: 8, testament: 'old' },
  { id: 23, code: 'ISA', title_ko: '이사야', title_en: 'Isaiah', abbr_ko: '사', abbr_en: 'Isa', chapter_count: 66, testament: 'old' },
  { id: 24, code: 'JER', title_ko: '예레미야', title_en: 'Jeremiah', abbr_ko: '렘', abbr_en: 'Jer', chapter_count: 52, testament: 'old' },
  { id: 25, code: 'LAM', title_ko: '예레미야애가', title_en: 'Lamentations', abbr_ko: '애', abbr_en: 'Lam', chapter_count: 5, testament: 'old' },
  { id: 26, code: 'EZK', title_ko: '에스겔', title_en: 'Ezekiel', abbr_ko: '겔', abbr_en: 'Eze', chapter_count: 48, testament: 'old' },
  { id: 27, code: 'DAN', title_ko: '다니엘', title_en: 'Daniel', abbr_ko: '단', abbr_en: 'Dan', chapter_count: 12, testament: 'old' },
  { id: 28, code: 'HOS', title_ko: '호세아', title_en: 'Hosea', abbr_ko: '호', abbr_en: 'Hos', chapter_count: 14, testament: 'old' },
  { id: 29, code: 'JOL', title_ko: '요엘', title_en: 'Joel', abbr_ko: '욜', abbr_en: 'Joe', chapter_count: 3, testament: 'old' },
  { id: 30, code: 'AMO', title_ko: '아모스', title_en: 'Amos', abbr_ko: '암', abbr_en: 'Amo', chapter_count: 9, testament: 'old' },
  { id: 31, code: 'OBA', title_ko: '오바댜', title_en: 'Obadiah', abbr_ko: '옵', abbr_en: 'Oba', chapter_count: 1, testament: 'old' },
  { id: 32, code: 'JON', title_ko: '요나', title_en: 'Jonah', abbr_ko: '욘', abbr_en: 'Jon', chapter_count: 4, testament: 'old' },
  { id: 33, code: 'MIC', title_ko: '미가', title_en: 'Micah', abbr_ko: '미', abbr_en: 'Mic', chapter_count: 7, testament: 'old' },
  { id: 34, code: 'NAM', title_ko: '나훔', title_en: 'Nahum', abbr_ko: '나', abbr_en: 'Nah', chapter_count: 3, testament: 'old' },
  { id: 35, code: 'HAB', title_ko: '하박국', title_en: 'Habakkuk', abbr_ko: '합', abbr_en: 'Hab', chapter_count: 3, testament: 'old' },
  { id: 36, code: 'ZEP', title_ko: '스바냐', title_en: 'Zephaniah', abbr_ko: '습', abbr_en: 'Zep', chapter_count: 3, testament: 'old' },
  { id: 37, code: 'HAG', title_ko: '학개', title_en: 'Haggai', abbr_ko: '학', abbr_en: 'Hag', chapter_count: 2, testament: 'old' },
  { id: 38, code: 'ZEC', title_ko: '스가랴', title_en: 'Zechariah', abbr_ko: '슥', abbr_en: 'Zec', chapter_count: 14, testament: 'old' },
  { id: 39, code: 'MAL', title_ko: '말라기', title_en: 'Malachi', abbr_ko: '말', abbr_en: 'Mal', chapter_count: 4, testament: 'old' },
  
  // New Testament
  { id: 40, code: 'MAT', title_ko: '마태복음', title_en: 'Matthew', abbr_ko: '마', abbr_en: 'Mat', chapter_count: 28, testament: 'new' },
  { id: 41, code: 'MRK', title_ko: '마가복음', title_en: 'Mark', abbr_ko: '막', abbr_en: 'Mar', chapter_count: 16, testament: 'new' },
  { id: 42, code: 'LUK', title_ko: '누가복음', title_en: 'Luke', abbr_ko: '눅', abbr_en: 'Luk', chapter_count: 24, testament: 'new' },
  { id: 43, code: 'JHN', title_ko: '요한복음', title_en: 'John', abbr_ko: '요', abbr_en: 'Jhn', chapter_count: 21, testament: 'new' },
  { id: 44, code: 'ACT', title_ko: '사도행전', title_en: 'Acts', abbr_ko: '행', abbr_en: 'Act', chapter_count: 28, testament: 'new' },
  { id: 45, code: 'ROM', title_ko: '로마서', title_en: 'Romans', abbr_ko: '롬', abbr_en: 'Rom', chapter_count: 16, testament: 'new' },
  { id: 46, code: '1CO', title_ko: '고린도전서', title_en: '1 Corinthians', abbr_ko: '고전', abbr_en: '1Co', chapter_count: 16, testament: 'new' },
  { id: 47, code: '2CO', title_ko: '고린도후서', title_en: '2 Corinthians', abbr_ko: '고후', abbr_en: '2Co', chapter_count: 13, testament: 'new' },
  { id: 48, code: 'GAL', title_ko: '갈라디아서', title_en: 'Galatians', abbr_ko: '갈', abbr_en: 'Gal', chapter_count: 6, testament: 'new' },
  { id: 49, code: 'EPH', title_ko: '에베소서', title_en: 'Ephesians', abbr_ko: '엡', abbr_en: 'Eph', chapter_count: 6, testament: 'new' },
  { id: 50, code: 'PHP', title_ko: '빌립보서', title_en: 'Philippians', abbr_ko: '빌', abbr_en: 'Php', chapter_count: 4, testament: 'new' },
  { id: 51, code: 'COL', title_ko: '골로새서', title_en: 'Colossians', abbr_ko: '골', abbr_en: 'Col', chapter_count: 4, testament: 'new' },
  { id: 52, code: '1TH', title_ko: '데살로니가전서', title_en: '1 Thessalonians', abbr_ko: '살전', abbr_en: '1Th', chapter_count: 5, testament: 'new' },
  { id: 53, code: '2TH', title_ko: '데살로니가후서', title_en: '2 Thessalonians', abbr_ko: '살후', abbr_en: '2Th', chapter_count: 3, testament: 'new' },
  { id: 54, code: '1TI', title_ko: '디모데전서', title_en: '1 Timothy', abbr_ko: '딤전', abbr_en: '1Ti', chapter_count: 6, testament: 'new' },
  { id: 55, code: '2TI', title_ko: '디모데후서', title_en: '2 Timothy', abbr_ko: '딤후', abbr_en: '2Ti', chapter_count: 4, testament: 'new' },
  { id: 56, code: 'TIT', title_ko: '디도서', title_en: 'Titus', abbr_ko: '딛', abbr_en: 'Tit', chapter_count: 3, testament: 'new' },
  { id: 57, code: 'PHM', title_ko: '빌레몬서', title_en: 'Philemon', abbr_ko: '몬', abbr_en: 'Phm', chapter_count: 1, testament: 'new' },
  { id: 58, code: 'HEB', title_ko: '히브리서', title_en: 'Hebrews', abbr_ko: '히', abbr_en: 'Heb', chapter_count: 13, testament: 'new' },
  { id: 59, code: 'JAS', title_ko: '야고보서', title_en: 'James', abbr_ko: '약', abbr_en: 'Jas', chapter_count: 5, testament: 'new' },
  { id: 60, code: '1PE', title_ko: '베드로전서', title_en: '1 Peter', abbr_ko: '벧전', abbr_en: '1Pe', chapter_count: 5, testament: 'new' },
  { id: 61, code: '2PE', title_ko: '베드로후서', title_en: '2 Peter', abbr_ko: '벧후', abbr_en: '2Pe', chapter_count: 3, testament: 'new' },
  { id: 62, code: '1JN', title_ko: '요한1서', title_en: '1 John', abbr_ko: '요일', abbr_en: '1Jo', chapter_count: 5, testament: 'new' },
  { id: 63, code: '2JN', title_ko: '요한2서', title_en: '2 John', abbr_ko: '요이', abbr_en: '2Jo', chapter_count: 1, testament: 'new' },
  { id: 64, code: '3JN', title_ko: '요한3서', title_en: '3 John', abbr_ko: '요삼', abbr_en: '3Jo', chapter_count: 1, testament: 'new' },
  { id: 65, code: 'JUD', title_ko: '유다서', title_en: 'Jude', abbr_ko: '유', abbr_en: 'Jud', chapter_count: 1, testament: 'new' },
  { id: 66, code: 'REV', title_ko: '요한계시록', title_en: 'Revelation', abbr_ko: '계', abbr_en: 'Rev', chapter_count: 22, testament: 'new' }
];

export const getBookByCode = (code: string): BibleBook | undefined => 
  bibleBooks.find(book => book.code === code.toUpperCase());

export const getBookById = (id: number): BibleBook | undefined =>
  bibleBooks.find(book => book.id === id);

export const getBooksByTestament = (testament: Testament): BibleBook[] =>
  bibleBooks.filter(book => book.testament === testament);

export const getBookByTitle = (title: string, lang: 'ko' | 'en' = 'ko'): BibleBook | undefined =>
  bibleBooks.find(book => book[`title_${lang}`].toLowerCase() === title.toLowerCase());

export const getBookByAbbr = (abbr: string, lang: 'ko' | 'en' = 'ko'): BibleBook | undefined =>
  bibleBooks.find(book => book[`abbr_${lang}`].toLowerCase() === abbr.toLowerCase());

export const searchBooks = (query: string, lang: 'ko' | 'en' = 'ko'): BibleBook[] => {
  const lowerQuery = query.toLowerCase();
  return bibleBooks.filter(book => 
    book[`title_${lang}`].toLowerCase().includes(lowerQuery) ||
    book[`abbr_${lang}`].toLowerCase().includes(lowerQuery)
  );
};

export const getNextBook = (currentBook: BibleBook): BibleBook | undefined => {
  const index = bibleBooks.findIndex(book => book.id === currentBook.id);
  return index < bibleBooks.length - 1 ? bibleBooks[index + 1] : undefined;
};

export const getPreviousBook = (currentBook: BibleBook): BibleBook | undefined => {
  const index = bibleBooks.findIndex(book => book.id === currentBook.id);
  return index > 0 ? bibleBooks[index - 1] : undefined;
};
