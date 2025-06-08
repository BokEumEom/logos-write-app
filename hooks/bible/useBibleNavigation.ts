import { BibleBook } from '@/constants/bible/books';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

export const useBibleNavigation = () => {
  const [currentBook, setCurrentBook] = useState<BibleBook | null>(null);
  const [currentChapter, setCurrentChapter] = useState(1);

  const navigateToChapter = useCallback((book: BibleBook, chapter: number) => {
    router.push(`/bible/${book.code}/${chapter}`);
    setCurrentBook(book);
    setCurrentChapter(chapter);
  }, []);

  const navigateToNextChapter = useCallback(() => {
    if (!currentBook) return;
    if (currentChapter < currentBook.chapter_count) {
      navigateToChapter(currentBook, currentChapter + 1);
    }
  }, [currentBook, currentChapter, navigateToChapter]);

  const navigateToPreviousChapter = useCallback(() => {
    if (!currentBook || currentChapter <= 1) return;
    navigateToChapter(currentBook, currentChapter - 1);
  }, [currentBook, currentChapter, navigateToChapter]);

  return {
    currentBook,
    currentChapter,
    navigateToChapter,
    navigateToNextChapter,
    navigateToPreviousChapter,
  };
};
