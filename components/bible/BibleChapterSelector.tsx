import { Colors } from '@/constants/Colors';
import { BibleBook } from '@/constants/bible/books';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 4;

interface BibleChapterSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (chapter: number) => void;
  book: BibleBook;
  currentChapter: number;
}

export const BibleChapterSelector: React.FC<BibleChapterSelectorProps> = ({
  visible,
  onClose,
  onSelect,
  book,
  currentChapter,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const chapterNumbers = Array.from(
    { length: book.chapter_count }, 
    (_, i) => i + 1
  );

  const renderChapterItem = useCallback(({ item }: { item: number }) => (
    <TouchableOpacity
      style={[
        styles.chapterItem,
        item === currentChapter && { backgroundColor: colors.tint + '20' }
      ]}
      onPress={() => onSelect(item)}
    >
      <Text 
        style={[
          styles.chapterItemText, 
          { color: item === currentChapter ? colors.tint : colors.text }
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ), [currentChapter, colors, onSelect]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      
      <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          {book.title_ko} 장 선택
        </Text>

        <FlatList
          data={chapterNumbers}
          renderItem={renderChapterItem}
          keyExtractor={item => item.toString()}
          numColumns={5}
          contentContainerStyle={styles.chapterGrid}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '70%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  chapterGrid: {
    padding: 8,
  },
  chapterItem: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 4,
  },
  chapterItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
