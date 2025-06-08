import { Colors } from '@/constants/Colors';
import { BibleBook } from '@/constants/bible/books';
import { BibleVerse } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    FlatList,
    ListRenderItemInfo,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  const handleVersePress = (verse: BibleVerse) => {
    setSelectedVerse(selectedVerse === verse.verse ? null : verse.verse);
  };

  const handleVerseShare = async (verse: BibleVerse) => {
    try {
      await Share.share({
        message: `${verse.book} ${verse.chapter}:${verse.verse}\n${verse.text}`,
      });
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
  };

  const renderItem = useCallback(({ item: verse }: ListRenderItemInfo<BibleVerse>) => (
    <TouchableOpacity
      style={[
        styles.verseContainer,
        selectedVerse === verse.verse && styles.selectedVerseContainer,
        { backgroundColor: colors.background }
      ]}
      onPress={() => handleVersePress(verse)}
      activeOpacity={0.7}
    >
      <View style={styles.verseContent}>
        <View style={styles.verseNumberContainer}>
          <Text style={[
            styles.verseNumber, 
            { color: selectedVerse === verse.verse ? colors.tint : colors.text + '80' }
          ]}>
            {verse.verse}
          </Text>
        </View>
        <Text style={[
          styles.verseText, 
          { color: colors.text },
          selectedVerse === verse.verse && styles.selectedVerseText
        ]}>
          {verse.text}
        </Text>
      </View>

      {selectedVerse === verse.verse && (
        <Animated.View style={styles.verseActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.tint + '10' }]}
            onPress={() => handleVerseShare(verse)}
          >
            <Feather name="share-2" size={18} color={colors.tint} />
            <Text style={[styles.actionText, { color: colors.tint }]}>공유</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.tint + '10' }]}
          >
            <Feather name="bookmark" size={18} color={colors.tint} />
            <Text style={[styles.actionText, { color: colors.tint }]}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.tint + '10' }]}
          >
            <Feather name="edit-3" size={18} color={colors.tint} />
            <Text style={[styles.actionText, { color: colors.tint }]}>필사</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </TouchableOpacity>
  ), [selectedVerse, colors, handleVersePress, handleVerseShare]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {isLoading ? (
        <ActivityIndicator style={styles.loading} size="large" color={colors.tint} />
      ) : (
        <FlatList
          data={verses}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.chapter}-${item.verse}`}
          contentContainerStyle={styles.verseList}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
  verseList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  verseContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedVerseContainer: {
    backgroundColor: '#F8F9FA',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  verseContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  verseNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  verseNumber: {
    fontSize: 14,
    fontFamily: 'NanumMyeongjo',
  },
  verseText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 28,
    fontFamily: 'NanumMyeongjo',
  },
  selectedVerseText: {
    fontWeight: '600',
  },
  verseActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
