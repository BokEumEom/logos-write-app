import { bibleText } from '@/constants/bibleText';
import { useCallback, useEffect, useState } from 'react';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

// 캐시를 위한 Map 객체
const versesCache = new Map<string, BibleVerse[]>();

export const useBibleVerses = (bookName: string, chapter: number) => {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cacheKey = `${bookName}-${chapter}`;

  const loadVerses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 캐시된 데이터가 있으면 사용
      if (versesCache.has(cacheKey)) {
        setVerses(versesCache.get(cacheKey)!);
        setIsLoading(false);
        return;
      }

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

      // 절 번호로 정렬
      versesList.sort((a, b) => a.verse - b.verse);
      
      // 캐시에 저장
      versesCache.set(cacheKey, versesList);
      setVerses(versesList);
    } catch (error) {
      console.error('Error loading verses:', error);
      setError('성경 구절을 불러오는 중 오류가 발생했습니다.');
      setVerses([]);
    } finally {
      setIsLoading(false);
    }
  }, [bookName, chapter, cacheKey]);

  // 책이나 장이 변경될 때 자동으로 로드
  useEffect(() => {
    loadVerses();
  }, [loadVerses]);

  return {
    verses,
    isLoading,
    error,
    reload: loadVerses,
  };
};
