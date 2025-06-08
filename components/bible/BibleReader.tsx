import { bibleBooks } from '@/constants/bible/books';
import { Colors } from '@/constants/Colors';
import { BibleVerse, useBibleVerses } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useBibleStore } from '@/store/useBibleStore';
import React, { useCallback, useEffect, useRef } from 'react';
import { Clipboard, Share, StyleSheet, View } from 'react-native';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { BibleBookSelector } from './BibleBookSelector';
import { BibleChapterSelector } from './BibleChapterSelector';
import { BibleHeader } from './BibleHeader';
import { BibleVerseList } from './BibleVerseList';
import { BibleVerseMenu } from './BibleVerseMenu';

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

  // Zustand store hooks
  const {
    selectedBook,
    currentChapter,
    preferences,
    setSelectedBook,
    setCurrentChapter,
    toggleHighlight,
    toggleBookmark,
    addToRecentlyRead
  } = useBibleStore();
  
  // 초기값 설정
  useEffect(() => {
    if (initialBook) {
      const book = bibleBooks.find(b => b.code === initialBook);
      if (book) {
        setSelectedBook(book);
      }
    }
    if (initialChapter) {
      setCurrentChapter(initialChapter);
    }
  }, [initialBook, initialChapter]);
  
  const [showBookModal, setShowBookModal] = React.useState(false);
  const [showChapterModal, setShowChapterModal] = React.useState(false);
  const [selectedVerse, setSelectedVerse] = React.useState<BibleVerse>();
  const [showVerseMenu, setShowVerseMenu] = React.useState(false);
  const scrollPositionRef = useRef(0);

  const { verses, isLoading, error, reload } = useBibleVerses(selectedBook.title_ko, currentChapter);

  // 읽은 기록 추가
  useEffect(() => {
    addToRecentlyRead();
  }, [selectedBook.code, currentChapter]);

  const handleVersePress = useCallback((verse: BibleVerse) => {
    setSelectedVerse(verse);
    setShowVerseMenu(true);
  }, []);

  const handleShare = useCallback(async () => {
    if (!selectedVerse) return;
    
    const text = `${selectedVerse.book} ${selectedVerse.chapter}:${selectedVerse.verse}\n${selectedVerse.text}`;
    try {
      await Share.share({
        message: text,
      });
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
    setShowVerseMenu(false);
  }, [selectedVerse]);

  const handleCopy = useCallback(() => {
    if (!selectedVerse) return;
    
    const text = `${selectedVerse.book} ${selectedVerse.chapter}:${selectedVerse.verse}\n${selectedVerse.text}`;
    Clipboard.setString(text);
    setShowVerseMenu(false);
  }, [selectedVerse]);

  const handleHighlight = useCallback((color: string) => {
    if (!selectedVerse) return;
    
    const verseKey = `${selectedBook.code}-${currentChapter}-${selectedVerse.verse}`;
    toggleHighlight(verseKey, color);
    setShowVerseMenu(false);
  }, [selectedVerse, selectedBook.code, currentChapter, toggleHighlight]);

  const handleBookmark = useCallback(() => {
    if (!selectedVerse) return;
    
    const verseKey = `${selectedBook.code}-${currentChapter}-${selectedVerse.verse}`;
    toggleBookmark(verseKey);
    setShowVerseMenu(false);
  }, [selectedVerse, selectedBook.code, currentChapter, toggleBookmark]);

  const handleGestureEvent = useCallback((event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const { velocityX } = event.nativeEvent;
      if (velocityX > 0 && currentChapter > 1) {
        setCurrentChapter(currentChapter - 1);
      } else if (velocityX < 0 && currentChapter < selectedBook.chapter_count) {
        setCurrentChapter(currentChapter + 1);
      }
    }
  }, [currentChapter, selectedBook.chapter_count]);

  if (isLoading) {
    return null; // 또는 로딩 인디케이터
  }

  const getVerseKey = (verse: BibleVerse) => `${selectedBook.code}-${currentChapter}-${verse.verse}`;

  return (
    <FlingGestureHandler
      direction={Directions.RIGHT | Directions.LEFT}
      onHandlerStateChange={handleGestureEvent}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <BibleHeader
          book={selectedBook}
          chapter={currentChapter}
          onBookPress={() => setShowBookModal(true)}
          onChapterPress={() => setShowChapterModal(true)}
          onPreviousChapter={() => currentChapter > 1 && setCurrentChapter(currentChapter - 1)}
          onNextChapter={() => currentChapter < selectedBook.chapter_count && setCurrentChapter(currentChapter + 1)}
        />

        <BibleVerseList
          book={selectedBook}
          chapter={currentChapter}
          verses={verses}
          isLoading={isLoading}
          error={error}
          onRefresh={reload}
          onVersePress={handleVersePress}
          preferences={preferences}
          bookmarks={preferences.bookmarks}
          highlightedVerses={preferences.highlightedVerses}
        />

        <BibleVerseMenu
          verse={selectedVerse}
          isVisible={showVerseMenu}
          onClose={() => setShowVerseMenu(false)}
          onHighlight={handleHighlight}
          onBookmark={handleBookmark}
          onShare={handleShare}
          onCopy={handleCopy}
          isHighlighted={selectedVerse ? !!preferences.highlightedVerses[getVerseKey(selectedVerse)] : false}
          isBookmarked={selectedVerse ? !!preferences.bookmarks[getVerseKey(selectedVerse)] : false}
          highlightColor={selectedVerse ? preferences.highlightedVerses[getVerseKey(selectedVerse)]?.color : undefined}
        />

        <BibleBookSelector
          visible={showBookModal}
          onClose={() => setShowBookModal(false)}
          onSelect={(book) => {
            setSelectedBook(book);
            setCurrentChapter(1);
            setShowBookModal(false);
          }}
          books={bibleBooks}
        />

        <BibleChapterSelector
          visible={showChapterModal}
          onClose={() => setShowChapterModal(false)}
          onSelect={(newChapter) => {
            setCurrentChapter(newChapter);
            setShowChapterModal(false);
          }}
          book={selectedBook}
          currentChapter={currentChapter}
        />
      </View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
