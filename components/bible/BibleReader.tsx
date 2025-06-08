import { Colors } from '@/constants/Colors';
import { BibleBook, bibleBooks } from '@/constants/bible/books';
import { useBibleVerses } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BibleVerseList } from './BibleVerseList';

interface Props {
  initialBook?: string;
  initialChapter?: number;
}

const { width } = Dimensions.get('window');

export const BibleReader: React.FC<Props> = ({ 
  initialBook,
  initialChapter
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedTestament, setSelectedTestament] = useState<'old' | 'new'>('old');
  const [selectedBook, setSelectedBook] = useState(() => {
    if (initialBook) {
      const book = bibleBooks.find(b => b.code === initialBook);
      return book ?? bibleBooks[0];
    }
    return bibleBooks[0];
  });

  const [chapter, setChapter] = useState(initialChapter ?? 1);
  const [showChapters, setShowChapters] = useState(false);
  const [showVerses, setShowVerses] = useState(!!initialChapter);

  const { verses, isLoading } = useBibleVerses(selectedBook.title_ko, chapter);

  const handleTestamentChange = (testament: 'old' | 'new') => {
    setSelectedTestament(testament);
  };

  const handleBookPress = (book: BibleBook) => {
    setSelectedBook(book);
    setChapter(1);
    setShowChapters(true);
    setShowVerses(false);
  };

  const handleChapterPress = (selectedChapter: number) => {
    setChapter(selectedChapter);
    setShowChapters(false);
    setShowVerses(true);
  };

  const handleBackPress = () => {
    if (showVerses) {
      setShowVerses(false);
      setShowChapters(true);
    } else if (showChapters) {
      setShowChapters(false);
    }
  };

  const renderBookItem = useCallback(({ item }: { item: BibleBook }) => (
    <TouchableOpacity
      style={[
        styles.bookItem,
        selectedBook.code === item.code && styles.selectedBookItem,
        { 
          backgroundColor: colors.background,
          borderColor: colors.border
        }
      ]}
      onPress={() => handleBookPress(item)}
    >
      <Text style={[
        styles.bookTitle,
        { color: selectedBook.code === item.code ? colors.tint : colors.text }
      ]}>
        {item.title_ko}
      </Text>
      <Text style={[styles.bookInfo, { color: colors.text + '80' }]}>
        {item.chapter_count}장
      </Text>
    </TouchableOpacity>
  ), [selectedBook, colors]);

  const renderChapterItem = useCallback(({ item }: { item: number }) => (
    <TouchableOpacity
      style={[
        styles.chapterItem,
        chapter === item && styles.selectedChapterItem,
        { 
          backgroundColor: chapter === item ? colors.tint : colors.background,
          borderColor: colors.border + '20'
        }
      ]}
      onPress={() => handleChapterPress(item)}
    >
      <Text style={[
        styles.chapterNumber,
        { 
          color: chapter === item ? '#FFFFFF' : colors.text,
        }
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  ), [chapter, colors]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showVerses ? (
        <View style={styles.container}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Feather name="chevron-left" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {selectedBook.title_ko} {chapter}장
            </Text>
          </View>
          <BibleVerseList
            book={selectedBook}
            chapter={chapter}
            verses={verses}
            isLoading={isLoading}
          />
        </View>
      ) : showChapters ? (
        <View style={styles.chaptersContainer}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Feather name="chevron-left" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {selectedBook.title_ko}
            </Text>
          </View>
          <FlatList
            key="chapters"
            data={Array.from({ length: selectedBook.chapter_count }, (_, i) => i + 1)}
            renderItem={renderChapterItem}
            numColumns={4}
            keyExtractor={item => item.toString()}
            contentContainerStyle={styles.chapterGrid}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            columnWrapperStyle={styles.chapterRow}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>성경 선택</Text>
          </View>
          <View style={styles.bibleTypeContainer}>
            <TouchableOpacity 
              style={[
                styles.bibleTypeTab, 
                selectedTestament === 'old' && styles.activeTab,
                { borderColor: colors.border }
              ]}
              onPress={() => handleTestamentChange('old')}
            >
              <Text style={[
                styles.bibleTypeText,
                { color: selectedTestament === 'old' ? colors.tint : colors.text }
              ]}>구약</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.bibleTypeTab, 
                selectedTestament === 'new' && styles.activeTab,
                { borderColor: colors.border }
              ]}
              onPress={() => handleTestamentChange('new')}
            >
              <Text style={[
                styles.bibleTypeText,
                { color: selectedTestament === 'new' ? colors.tint : colors.text }
              ]}>신약</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            key="books"
            data={bibleBooks.filter(book => book.testament === selectedTestament)}
            renderItem={renderBookItem}
            keyExtractor={item => item.code}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.bookList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'NanumMyeongjo',
  },
  bibleTypeContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
    gap: 8,
  },
  bibleTypeTab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderWidth: 2,
  },
  bibleTypeText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'NanumMyeongjo',
  },
  bookList: {
    padding: 16,
  },
  bookItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedBookItem: {
    borderWidth: 2,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'NanumMyeongjo',
  },
  bookInfo: {
    fontSize: 14,
    opacity: 0.8,
  },
  chaptersContainer: {
    flex: 1,
  },
  chapterGrid: {
    padding: 16,
  },
  chapterRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  chapterItem: {
    width: '22%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedChapterItem: {
    borderWidth: 0,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  chapterNumber: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'NanumMyeongjo',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
  },
});
