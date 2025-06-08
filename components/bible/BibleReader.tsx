import { Colors } from '@/constants/Colors';
import { bibleBooks } from '@/constants/bible/books';
import { useBibleVerses } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BibleBookSelector } from './BibleBookSelector';
import { BibleChapterSelector } from './BibleChapterSelector';
import { BibleHeader } from './BibleHeader';
import { BibleVerseList } from './BibleVerseList';

interface Props {
  initialBook?: string;
  initialChapter?: number;
}

export const BibleReader: React.FC<Props> = ({ 
  initialBook,
  initialChapter
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedBook, setSelectedBook] = useState(() => {
    if (initialBook) {
      const book = bibleBooks.find(b => b.code === initialBook);
      return book ?? bibleBooks[0];
    }
    return bibleBooks[0];
  });
  
  const [chapter, setChapter] = useState(initialChapter ?? 1);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);

  const { verses, isLoading } = useBibleVerses(selectedBook.title_ko, chapter);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BibleHeader
        book={selectedBook}
        chapter={chapter}
        onBookPress={() => setShowBookModal(true)}
        onChapterPress={() => setShowChapterModal(true)}
        onPreviousChapter={() => chapter > 1 && setChapter(chapter - 1)}
        onNextChapter={() => chapter < selectedBook.chapter_count && setChapter(chapter + 1)}
      />

      <BibleVerseList
        book={selectedBook}
        chapter={chapter}
        verses={verses}
        isLoading={isLoading}
      />

      <BibleBookSelector
        visible={showBookModal}
        onClose={() => setShowBookModal(false)}
        onSelect={(book) => {
          setSelectedBook(book);
          setChapter(1);
          setShowBookModal(false);
        }}
        books={bibleBooks}
      />

      <BibleChapterSelector
        visible={showChapterModal}
        onClose={() => setShowChapterModal(false)}
        onSelect={(newChapter) => {
          setChapter(newChapter);
          setShowChapterModal(false);
        }}
        book={selectedBook}
        currentChapter={chapter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
