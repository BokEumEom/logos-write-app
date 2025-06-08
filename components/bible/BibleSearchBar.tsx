import { Colors } from '@/constants/Colors';
import { useBibleSearch } from '@/hooks/bible/useBibleSearch';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface BibleSearchBarProps {
  onClose?: () => void;
  autoFocus?: boolean;
}

export const BibleSearchBar: React.FC<BibleSearchBarProps> = ({
  onClose,
  autoFocus = false,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isFocused, setIsFocused] = useState(false);

  const {
    query,
    setQuery,
    results,
    bookResults,
    isLoading,
    error,
  } = useBibleSearch();

  const handleResultPress = (bookCode: string, chapter: number, verse: number) => {
    router.push(`/bible/${bookCode}/${chapter}?verse=${verse}`);
    Keyboard.dismiss();
    onClose?.();
  };

  const handleBookPress = (bookCode: string) => {
    router.push(`/bible/${bookCode}/1`);
    Keyboard.dismiss();
    onClose?.();
  };

  useEffect(() => {
    if (!isFocused) {
      setQuery('');
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.searchContainer,
          { backgroundColor: colors.card },
          isFocused && styles.searchContainerFocused,
        ]}
      >
        <Feather 
          name="search" 
          size={20} 
          color={colors.text + '80'} 
          style={styles.searchIcon} 
        />
        
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="성경 검색..."
          placeholderTextColor={colors.text + '80'}
          value={query}
          onChangeText={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoFocus={autoFocus}
          returnKeyType="search"
        />

        {query.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setQuery('')}
          >
            <Feather name="x" size={20} color={colors.text + '80'} />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={colors.tint} />
      ) : (
        <ScrollView style={styles.resultsContainer}>
          {bookResults.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>성경책</Text>
              {bookResults.map((book) => (
                <TouchableOpacity
                  key={book.code}
                  style={[styles.resultItem, { backgroundColor: colors.card }]}
                  onPress={() => handleBookPress(book.code)}
                >
                  <Text style={[styles.bookTitle, { color: colors.text }]}>
                    {book.title_ko}
                  </Text>
                  <Text style={[styles.bookInfo, { color: colors.text + '80' }]}>
                    {book.testament === 'old' ? '구약' : '신약'} · {book.chapter_count}장
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {results.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>검색 결과</Text>
              {results.map((result, index) => (
                <TouchableOpacity
                  key={`${result.book.code}-${result.chapter}-${result.verse}-${index}`}
                  style={[styles.resultItem, { backgroundColor: colors.card }]}
                  onPress={() => handleResultPress(result.book.code, result.chapter, result.verse)}
                >
                  <Text style={[styles.reference, { color: colors.tint }]}>
                    {result.book.title_ko} {result.chapter}:{result.verse}
                  </Text>
                  <Text 
                    style={[styles.verseText, { color: colors.text }]}
                    numberOfLines={2}
                  >
                    {result.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {query && !isLoading && results.length === 0 && bookResults.length === 0 && (
            <View style={styles.emptyContainer}>
              <Feather name="search" size={48} color={colors.text + '50'} />
              <Text style={[styles.emptyText, { color: colors.text + '80' }]}>
                검색 결과가 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    height: 48,
  },
  searchContainerFocused: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    fontFamily: 'NanumMyeongjo',
  },
  clearButton: {
    padding: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  resultItem: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'NanumMyeongjo',
  },
  bookInfo: {
    fontSize: 14,
    fontFamily: 'NanumMyeongjo',
  },
  reference: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'NanumMyeongjo',
  },
  verseText: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NanumMyeongjo',
  },
  errorText: {
    margin: 16,
    textAlign: 'center',
    fontFamily: 'NanumMyeongjo',
  },
  loader: {
    margin: 16,
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
    fontFamily: 'NanumMyeongjo',
  },
});
