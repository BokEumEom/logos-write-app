import { bibleText } from '@/constants/bibleText';
import { useCallback, useState } from 'react';

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
      const pattern = new RegExp(`^${bookName} ${chapter}:(\\d+)`);

      Object.entries(bibleText).forEach(([key, text]) => {
        const match = key.match(pattern);
        if (match) {
          versesList.push({
            book: bookName,
            chapter,
            verse: parseInt(match[1], 10),
            text: text as string,
          });
        }
      });

      versesList.sort((a, b) => a.verse - b.verse);
      setVerses(versesList);
    } catch (error) {
      console.error('Error loading verses:', error);
      setVerses([]);
    } finally {
      setIsLoading(false);
    }
  }, [bookName, chapter]);

  return {
    verses,
    isLoading,
    loadVerses,
  };
};
