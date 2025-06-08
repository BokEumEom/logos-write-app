import { HIGHLIGHT_COLORS } from '@/constants/bible/preferences';
import { Colors } from '@/constants/Colors';
import { BibleVerse } from '@/hooks/bible/useBibleVerses';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';

interface BibleVerseMenuProps {
  verse?: BibleVerse;
  isVisible: boolean;
  onClose: () => void;
  onHighlight: (color: string) => void;
  onBookmark: () => void;
  onShare: () => void;
  onCopy: () => void;
  isHighlighted?: boolean;
  isBookmarked?: boolean;
  highlightColor?: string;
}

export const BibleVerseMenu: React.FC<BibleVerseMenuProps> = ({
  verse,
  isVisible,
  onClose,
  onHighlight,
  onBookmark,
  onShare,
  onCopy,
  isHighlighted,
  isBookmarked,
  highlightColor,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { width } = useWindowDimensions();

  if (!verse || !isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView
          style={StyleSheet.absoluteFill}
          intensity={colorScheme === 'dark' ? 40 : 60}
          tint={colorScheme}
        />
        <View 
          style={[
            styles.menuContainer,
            { backgroundColor: colors.card },
            { maxWidth: Math.min(width - 32, 400) }
          ]}
        >
          <View style={styles.versePreview}>
            <Text style={[styles.verseReference, { color: colors.tint }]}>
              {verse.book} {verse.chapter}:{verse.verse}
            </Text>
            <Text 
              style={[styles.verseText, { color: colors.text }]}
              numberOfLines={3}
            >
              {verse.text}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onBookmark}
            >
              <Feather
                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color={isBookmarked ? colors.tint : colors.text}
              />
              <Text style={[styles.actionText, { color: colors.text }]}>
                북마크
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={onShare}
            >
              <Feather name="share-2" size={24} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                공유
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={onCopy}
            >
              <Feather name="copy" size={24} color={colors.text} />
              <Text style={[styles.actionText, { color: colors.text }]}>
                복사
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.highlightContainer}>
            <Text style={[styles.highlightTitle, { color: colors.text }]}>
              하이라이트
            </Text>
            <View style={styles.colorButtons}>
              {HIGHLIGHT_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    highlightColor === color && styles.selectedColor,
                  ]}
                  onPress={() => onHighlight(color)}
                />
              ))}
              {isHighlighted && (
                <TouchableOpacity
                  style={[styles.colorButton, styles.removeHighlight]}
                  onPress={() => onHighlight('')}
                >
                  <Feather name="x" size={16} color={colors.text} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  menuContainer: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  versePreview: {
    marginBottom: 8,
  },
  verseReference: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  verseText: {
    fontSize: 15,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
  },
  highlightContainer: {
    gap: 8,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  colorButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: 'white',
  },
  removeHighlight: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
