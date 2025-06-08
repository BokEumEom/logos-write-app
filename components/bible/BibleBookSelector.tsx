import { Colors } from '@/constants/Colors';
import { BibleBook } from '@/constants/bible/books';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface BibleBookSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (book: BibleBook) => void;
  books: BibleBook[];
}

export const BibleBookSelector: React.FC<BibleBookSelectorProps> = ({
  visible,
  onClose,
  onSelect,
  books,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => 
    book.title_ko.includes(searchQuery) || 
    book.abbr_ko.includes(searchQuery)
  );

  const renderBookItem = useCallback(({ item }: { item: BibleBook }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => {
        onSelect(item);
        setSearchQuery('');
      }}
    >
      <Text style={[styles.bookTitle, { color: colors.text }]}>{item.title_ko}</Text>
      <Text style={[styles.bookAbbr, { color: colors.text + '80' }]}>{item.abbr_ko}</Text>
    </TouchableOpacity>
  ), [colors, onSelect]);

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
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <Feather name="search" size={20} color={colors.text + '80'} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="책 이름 검색"
            placeholderTextColor={colors.text + '80'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>

        <FlatList
          data={filteredBooks}
          renderItem={renderBookItem}
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.bookList}
          initialNumToRender={20}
          maxToRenderPerBatch={10}
          windowSize={10}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  bookList: {
    paddingBottom: 16,
  },
  bookItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookAbbr: {
    fontSize: 14,
    marginTop: 4,
  },
});
