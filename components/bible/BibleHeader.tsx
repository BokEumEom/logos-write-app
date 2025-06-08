import { BibleBook } from '@/constants/bible/books';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
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

  return (
    <View style={[styles.header, { borderBottomColor: colors.border }]}>
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
      
      <View style={styles.navigation}>
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
    padding: 16,
    borderBottomWidth: 1,
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
  },
  chapterSelector: {
    padding: 8,
  },
  navigation: {
    flexDirection: 'row',
    marginLeft: 'auto',
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
