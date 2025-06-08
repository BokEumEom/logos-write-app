import { bibleBooks } from '@/constants/bible/books';
import { bibleText } from '@/constants/bibleText';
import { useCallback, useEffect, useState } from 'react';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export const useBibleVerses = (bookName: string, chapter: number) => {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadVerses = useCallback(async () => {
    try {
      setIsLoading(true);
      const versesList: BibleVerse[] = [];

      // 전체 이름(예: "창세기")에서 약자(예: "창") 찾기
      const book = bibleBooks.find(b => b.title_ko === bookName);
      if (!book) {
        console.error(`책 "${bookName}"을(를) 찾을 수 없습니다.`);
        throw new Error(`책 "${bookName}"을(를) 찾을 수 없습니다.`);
      }

      const abbr = book.abbr_ko; // 'GEN' 대신 '창'과 같은 한글 약자 사용
      console.log(`Searching for verses with pattern: ${abbr}${chapter}:`);

      Object.entries(bibleText).forEach(([key, text]) => {
        if (key.startsWith(`${abbr}${chapter}:`)) {
          const verse = parseInt(key.split(':')[1], 10);
          if (!isNaN(verse)) {
            versesList.push({
              book: bookName,
              chapter,
              verse,
              text: text as string,
            });
          }
        }
      });

      versesList.sort((a, b) => a.verse - b.verse);
      console.log(`Found ${versesList.length} verses for ${bookName}(${abbr}) ${chapter}`);
      
      if (versesList.length === 0) {
        console.log('Available keys (first 10):', Object.keys(bibleText).slice(0, 10));
      }
      
      setVerses(versesList);
    } catch (error) {
      console.error('Error loading verses:', error);
      setVerses([]);
    } finally {
      setIsLoading(false);
    }
  }, [bookName, chapter]);

  useEffect(() => {
    loadVerses();
  }, [loadVerses]);

  return {
    verses,
    isLoading,
    loadVerses,
  };
};
