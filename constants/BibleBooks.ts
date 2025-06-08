export type BibleBook = {
  id: string;
  name: string;
  chapters: number;
  testament: 'old' | 'new';
  category: 'law' | 'history' | 'wisdom' | 'prophecy' | 'gospel' | 'epistle' | 'apocalypse';
};

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament - Law (5)
  { id: 'gen', name: '창세기', chapters: 50, testament: 'old', category: 'law' },
  { id: 'exo', name: '출애굽기', chapters: 40, testament: 'old', category: 'law' },
  { id: 'lev', name: '레위기', chapters: 27, testament: 'old', category: 'law' },
  { id: 'num', name: '민수기', chapters: 36, testament: 'old', category: 'law' },
  { id: 'deu', name: '신명기', chapters: 34, testament: 'old', category: 'law' },
  
  // Old Testament - History (12)
  { id: 'jos', name: '여호수아', chapters: 24, testament: 'old', category: 'history' },
  { id: 'jdg', name: '사사기', chapters: 21, testament: 'old', category: 'history' },
  { id: 'rut', name: '룻기', chapters: 4, testament: 'old', category: 'history' },
  { id: '1sa', name: '사무엘상', chapters: 31, testament: 'old', category: 'history' },
  { id: '2sa', name: '사무엘하', chapters: 24, testament: 'old', category: 'history' },
  { id: '1ki', name: '열왕기상', chapters: 22, testament: 'old', category: 'history' },
  { id: '2ki', name: '열왕기하', chapters: 25, testament: 'old', category: 'history' },
  { id: '1ch', name: '역대상', chapters: 29, testament: 'old', category: 'history' },
  { id: '2ch', name: '역대하', chapters: 36, testament: 'old', category: 'history' },
  { id: 'ezr', name: '에스라', chapters: 10, testament: 'old', category: 'history' },
  { id: 'neh', name: '느헤미야', chapters: 13, testament: 'old', category: 'history' },
  { id: 'est', name: '에스더', chapters: 10, testament: 'old', category: 'history' },
  
  // Old Testament - Poetry/Wisdom (5)
  { id: 'job', name: '욥기', chapters: 42, testament: 'old', category: 'wisdom' },
  { id: 'psa', name: '시편', chapters: 150, testament: 'old', category: 'wisdom' },
  { id: 'pro', name: '잠언', chapters: 31, testament: 'old', category: 'wisdom' },
  { id: 'ecc', name: '전도서', chapters: 12, testament: 'old', category: 'wisdom' },
  { id: 'sng', name: '아가', chapters: 8, testament: 'old', category: 'wisdom' },
  
  // Old Testament - Major Prophets (5)
  { id: 'isa', name: '이사야', chapters: 66, testament: 'old', category: 'prophecy' },
  { id: 'jer', name: '예레미야', chapters: 52, testament: 'old', category: 'prophecy' },
  { id: 'lam', name: '예레미야애가', chapters: 5, testament: 'old', category: 'prophecy' },
  { id: 'ezk', name: '에스겔', chapters: 48, testament: 'old', category: 'prophecy' },
  { id: 'dan', name: '다니엘', chapters: 12, testament: 'old', category: 'prophecy' },
  
  // Old Testament - Minor Prophets (12)
  { id: 'hos', name: '호세아', chapters: 14, testament: 'old', category: 'prophecy' },
  { id: 'jol', name: '요엘', chapters: 3, testament: 'old', category: 'prophecy' },
  { id: 'amo', name: '아모스', chapters: 9, testament: 'old', category: 'prophecy' },
  { id: 'oba', name: '오바댜', chapters: 1, testament: 'old', category: 'prophecy' },
  { id: 'jon', name: '요나', chapters: 4, testament: 'old', category: 'prophecy' },
  { id: 'mic', name: '미가', chapters: 7, testament: 'old', category: 'prophecy' },
  { id: 'nam', name: '나훔', chapters: 3, testament: 'old', category: 'prophecy' },
  { id: 'hab', name: '하박국', chapters: 3, testament: 'old', category: 'prophecy' },
  { id: 'zep', name: '스바냐', chapters: 3, testament: 'old', category: 'prophecy' },
  { id: 'hag', name: '학개', chapters: 2, testament: 'old', category: 'prophecy' },
  { id: 'zec', name: '스가랴', chapters: 14, testament: 'old', category: 'prophecy' },
  { id: 'mal', name: '말라기', chapters: 4, testament: 'old', category: 'prophecy' },
  
  // New Testament - Gospels (4)
  { id: 'mat', name: '마태복음', chapters: 28, testament: 'new', category: 'gospel' },
  { id: 'mrk', name: '마가복음', chapters: 16, testament: 'new', category: 'gospel' },
  { id: 'luk', name: '누가복음', chapters: 24, testament: 'new', category: 'gospel' },
  { id: 'jhn', name: '요한복음', chapters: 21, testament: 'new', category: 'gospel' },
  
  // New Testament - History (1)
  { id: 'act', name: '사도행전', chapters: 28, testament: 'new', category: 'history' },
  
  // New Testament - Pauline Epistles (13)
  { id: 'rom', name: '로마서', chapters: 16, testament: 'new', category: 'epistle' },
  { id: '1co', name: '고린도전서', chapters: 16, testament: 'new', category: 'epistle' },
  { id: '2co', name: '고린도후서', chapters: 13, testament: 'new', category: 'epistle' },
  { id: 'gal', name: '갈라디아서', chapters: 6, testament: 'new', category: 'epistle' },
  { id: 'eph', name: '에베소서', chapters: 6, testament: 'new', category: 'epistle' },
  { id: 'php', name: '빌립보서', chapters: 4, testament: 'new', category: 'epistle' },
  { id: 'col', name: '골로새서', chapters: 4, testament: 'new', category: 'epistle' },
  { id: '1th', name: '데살로니가전서', chapters: 5, testament: 'new', category: 'epistle' },
  { id: '2th', name: '데살로니가후서', chapters: 3, testament: 'new', category: 'epistle' },
  { id: '1ti', name: '디모데전서', chapters: 6, testament: 'new', category: 'epistle' },
  { id: '2ti', name: '디모데후서', chapters: 4, testament: 'new', category: 'epistle' },
  { id: 'tit', name: '디도서', chapters: 3, testament: 'new', category: 'epistle' },
  { id: 'phm', name: '빌레몬서', chapters: 1, testament: 'new', category: 'epistle' },
  
  // New Testament - General Epistles (8)
  { id: 'heb', name: '히브리서', chapters: 13, testament: 'new', category: 'epistle' },
  { id: 'jas', name: '야고보서', chapters: 5, testament: 'new', category: 'epistle' },
  { id: '1pe', name: '베드로전서', chapters: 5, testament: 'new', category: 'epistle' },
  { id: '2pe', name: '베드로후서', chapters: 3, testament: 'new', category: 'epistle' },
  { id: '1jn', name: '요한일서', chapters: 5, testament: 'new', category: 'epistle' },
  { id: '2jn', name: '요한이서', chapters: 1, testament: 'new', category: 'epistle' },
  { id: '3jn', name: '요한삼서', chapters: 1, testament: 'new', category: 'epistle' },
  { id: 'jud', name: '유다서', chapters: 1, testament: 'new', category: 'epistle' },
  
  // New Testament - Prophecy (1)
  { id: 'rev', name: '요한계시록', chapters: 22, testament: 'new', category: 'apocalypse' },
];

// Helper functions
export const getBookById = (id: string) => {
  return BIBLE_BOOKS.find(book => book.id === id);
};

export const getBookByName = (name: string) => {
  return BIBLE_BOOKS.find(book => book.name === name);
};

export const getBooksByTestament = (testament: 'old' | 'new') => {
  return BIBLE_BOOKS.filter(book => book.testament === testament);
};

export const getBooksByCategory = (category: string) => {
  return BIBLE_BOOKS.filter(book => book.category === category);
};
