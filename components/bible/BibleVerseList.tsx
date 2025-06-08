import { Colors } from '@/constants/Colors';
import { BibleBook } from '@/constants/bible/books';
import { BibleVerse } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface BibleVerseListProps {
  book: BibleBook;
  chapter: number;
  verses: BibleVerse[];
  isLoading?: boolean;
}

export const BibleVerseList: React.FC<BibleVerseListProps> = ({
  book,
  chapter,
  verses,
  isLoading = false
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Feather name="loader" size={24} color={colors.text} />
        <Text style={[styles.loadingText, { color: colors.text }]}>성경을 불러오는 중...</Text>
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
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.chapterTitle, { color: colors.text }]}>
        {book.title_ko} {chapter}장
      </Text>
      {verses.map((verse) => (
        <View key={`${verse.chapter}:${verse.verse}`} style={styles.verseContainer}>
          <Text style={[styles.verseNumber, { color: colors.tint }]}>{verse.verse}</Text>
          <Text style={[styles.verseText, { color: colors.text }]}>{verse.text}</Text>
        </View>
      ))}
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
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  verseContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  verseNumber: {
    width: 30,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    marginRight: 12,
    lineHeight: 24,
  },
  verseText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'NanumMyeongjo',
  },
});
