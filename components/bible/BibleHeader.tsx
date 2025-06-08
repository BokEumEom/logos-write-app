import { BibleBook } from '@/constants/bible/books';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface BibleHeaderProps {
  book: BibleBook;
  chapter: number;
  onBookPress: () => void;
  onChapterPress: () => void;
  onPreviousChapter: () => void;
  onNextChapter: () => void;
}

export const BibleHeader: React.FC<BibleHeaderProps> = ({
  book,
  chapter,
  onBookPress,
  onChapterPress,
  onPreviousChapter,
  onNextChapter,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSearchPress = () => {
    router.push('/bible/search');
  };

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
      <View style={styles.leftContainer}>
        <TouchableOpacity 
          style={styles.bookSelector}
          onPress={onBookPress}
        >
          <ThemedText style={styles.bookTitle}>{book.title_ko}</ThemedText>
          <Feather name="chevron-down" size={18} color={colors.tint} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterSelector}
          onPress={onChapterPress}
        >
          <ThemedText>{chapter}장</ThemedText>
        </TouchableOpacity>
      </View>
      
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={[styles.navButton, { borderColor: colors.border }]}
          onPress={handleSearchPress}
        >
          <Feather name="search" size={20} color={colors.tint} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, { borderColor: colors.border }]}
          onPress={onPreviousChapter}
          disabled={chapter <= 1}
        >
          <Feather 
            name="chevron-left" 
            size={20} 
            color={chapter > 1 ? colors.tint : colors.text + '50'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, { borderColor: colors.border }]}
          onPress={onNextChapter}
          disabled={chapter >= book.chapter_count}
        >
          <Feather 
            name="chevron-right" 
            size={20} 
            color={chapter < book.chapter_count ? colors.tint : colors.text + '50'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginRight: 4,
    fontFamily: 'NanumMyeongjo',
  },
  chapterSelector: {
    padding: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
