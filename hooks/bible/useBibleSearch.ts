import { BibleBook, bibleBooks } from '@/constants/bible/books';
import { bibleText } from '@/constants/bibleText';
import { useCallback, useEffect, useState } from 'react';

export interface BibleSearchResult {
  book: BibleBook;
  chapter: number;
  verse: number;
  text: string;
  matches: { start: number; end: number }[];
}

export const useBibleSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BibleSearchResult[]>([]);
  const [bookResults, setBookResults] = useState<BibleBook[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchVerses = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setBookResults([]);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // 성경책 제목 검색
        const filteredBooks = bibleBooks.filter(
          book =>
            book.title_ko.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.abbr_ko.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setBookResults(filteredBooks);

        // 성경 구절 검색
        const searchResults: BibleSearchResult[] = [];
        const searchTerms = searchQuery.toLowerCase().split(' ');

        Object.entries(bibleText).forEach(([key, text]) => {
          const match = key.match(/^(.+) (\d+):(\d+)$/);
          if (!match) return;

          const [_, bookName, chapterStr, verseStr] = match;
          const book = bibleBooks.find(b => b.title_ko === bookName);
          if (!book) return;

          const lowerText = (text as string).toLowerCase();
          const allTermsMatch = searchTerms.every(term => lowerText.includes(term));

          if (allTermsMatch) {
            const matches: { start: number; end: number }[] = [];
            searchTerms.forEach(term => {
              let startIndex = 0;
              while ((startIndex = lowerText.indexOf(term, startIndex)) !== -1) {
                matches.push({
                  start: startIndex,
                  end: startIndex + term.length,
                });
                startIndex += term.length;
              }
            });

            searchResults.push({
              book,
              chapter: parseInt(chapterStr, 10),
              verse: parseInt(verseStr, 10),
              text: text as string,
              matches,
            });
          }
        });

        // 결과 정렬 (책 순서 -> 장 -> 절)
        searchResults.sort((a, b) => {
          if (a.book.id !== b.book.id) return a.book.id - b.book.id;
          if (a.chapter !== b.chapter) return a.chapter - b.chapter;
          return a.verse - b.verse;
        });

        setResults(searchResults);
      } catch (err) {
        console.error('Search error:', err);
        setError('검색 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      searchVerses(query);
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query, searchVerses]);

  return {
    query,
    setQuery,
    results,
    bookResults,
    isLoading,
    error,
  };
};