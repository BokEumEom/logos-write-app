import { Colors } from '@/constants/Colors';
import { BibleBook } from '@/constants/bible/books';
import { BiblePreferences } from '@/constants/bible/preferences';
import { BibleVerse } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useRef } from 'react';
import {
    ActivityIndicator,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

interface BibleVerseListProps {
  book: BibleBook;
  chapter: number;
  verses: BibleVerse[];
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  onVersePress?: (verse: BibleVerse) => void;
  onVerseLongPress?: (verse: BibleVerse) => void;
  preferences: BiblePreferences;
  bookmarks?: {
    [key: string]: {
      note?: string;
      timestamp: number;
    };
  };
  highlightedVerses?: {
    [key: string]: {
      color: string;
      timestamp: number;
    };
  };
  onScroll?: (position: number) => void;
}

export const BibleVerseList: React.FC<BibleVerseListProps> = ({
  book,
  chapter,
  verses,
  isLoading = false,
  error = null,
  onRefresh,
  onVersePress,
  onVerseLongPress,
  preferences,
  bookmarks = {},
  highlightedVerses = {},
  onScroll,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const scrollViewRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();

  const handleScroll = useCallback(
    (event: any) => {
      if (onScroll) {
        onScroll(event.nativeEvent.contentOffset.y);
      }
    },
    [onScroll]
  );

  const getVerseStyles = useCallback(
    (verse: BibleVerse) => {
      const verseKey = `${book.code}-${chapter}-${verse.verse}`;
      const highlight = highlightedVerses[verseKey];
      const isBookmarked = bookmarks[verseKey];

      return {
        container: [
          styles.verseContainer,
          highlight && { backgroundColor: highlight.color + '40' },
        ],
        text: [
          styles.verseText,
          {
            color: colors.text,
            fontSize: preferences.fontSize,
            lineHeight: preferences.fontSize * preferences.lineHeight,
            fontFamily: preferences.fontFamily,
          },
        ],
        number: [
          styles.verseNumber,
          { color: colors.tint },
          {
            fontSize: preferences.fontSize * 0.9,
            lineHeight: preferences.fontSize * preferences.lineHeight,
          },
        ],
        bookmark: isBookmarked && styles.bookmarkIndicator,
      };
    },
    [book, chapter, highlightedVerses, bookmarks, colors, preferences]
  );

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.loadingText, { color: colors.text }]}>성경을 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={48} color={colors.error} />
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
        {onRefresh && (
          <TouchableOpacity 
            style={[styles.retryButton, { backgroundColor: colors.tint }]}
            onPress={onRefresh}
          >
            <Text style={[styles.retryButtonText, { color: colors.background }]}>다시 시도</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  if (verses.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Feather name="book" size={48} color={colors.text + '50'} />
        <Text style={[styles.emptyText, { color: colors.text + '70' }]}>
          성경 구절을 찾을 수 없습니다.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { maxWidth: Math.min(width, 720) }
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={colors.tint}
          />
        ) : undefined
      }
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <Text style={[
        styles.chapterTitle,
        { 
          color: colors.text,
          fontSize: preferences.fontSize * 1.5,
          fontFamily: preferences.fontFamily,
        }
      ]}>
        {book.title_ko} {chapter}장
      </Text>

      {verses.map((verse) => {
        const verseStyles = getVerseStyles(verse);
        return (
          <Pressable
            key={`${verse.chapter}:${verse.verse}`}
            style={verseStyles.container}
            onPress={() => onVersePress?.(verse)}
            onLongPress={() => onVerseLongPress?.(verse)}
            delayLongPress={200}
          >
            <Text style={verseStyles.number}>{verse.verse}</Text>
            <View style={styles.verseContent}>
              <Text style={verseStyles.text}>{verse.text}</Text>
              {verseStyles.bookmark && (
                <View style={[styles.bookmarkIndicator, { backgroundColor: colors.tint }]} />
              )}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'NanumMyeongjo',
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 4,
  },
  verseContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verseNumber: {
    width: 30,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginRight: 12,
    lineHeight: 24,
    fontFamily: 'NanumMyeongjo',
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 28,
  },
  bookmarkIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginLeft: 6,
    marginTop: 8,
  },
});
