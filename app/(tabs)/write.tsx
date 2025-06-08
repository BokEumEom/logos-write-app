import { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Feather, MaterialIcons } from '@expo/vector-icons';

import { getDailyVerse } from '@/utils/dailyVerse';

// 오늘의 말씀 가져오기
const todaysVerse = getDailyVerse();

export default function WriteScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [verse, setVerse] = useState(todaysVerse);
  const [text, setText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  // 앱이 포그라운드로 돌아올 때마다 오늘의 말씀 확인
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastUpdated = localStorage.getItem('lastUpdated');
    
    if (lastUpdated !== today) {
      const newVerse = getDailyVerse();
      setVerse(newVerse);
      localStorage.setItem('lastUpdated', today);
    }
  }, []);

  const handleSubmit = () => {
    // Save the written text
    console.log('Saving:', text);
    // Navigate back or show success message
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>오늘의 말씀 필사</ThemedText>
          <ThemedText style={styles.reference}>{todaysVerse.reference}</ThemedText>
        </View>

        <ThemedView style={[styles.verseContainer, { backgroundColor: colors.card }]}>
          <ThemedText style={styles.verseText}>{todaysVerse.text}</ThemedText>
          <ThemedText style={styles.translationText}>{todaysVerse.translation}</ThemedText>
        </ThemedView>

        <View style={styles.writingAreaContainer}>
          <View style={styles.writingTools}>
            <TouchableOpacity style={styles.toolButton}>
              <Feather name="type" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}>
              <Feather name="edit" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.toolButton}>
              <Feather name="trash-2" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={[
              styles.textInput,
              { 
                color: colors.text,
                backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                borderColor: colors.border,
              }
            ]}
            placeholder="이곳에 말씀을 필사해보세요..."
            placeholderTextColor={colors.textSecondary + '80'}
            multiline
            value={text}
            onChangeText={setText}
            onFocus={() => setShowKeyboard(true)}
            onBlur={() => setShowKeyboard(false)}
            textAlignVertical="top"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.quickActions}>
          <ThemedText style={styles.sectionTitle}>도구</ThemedText>
          <View style={styles.quickActionButtons}>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.card }]}>
              <MaterialIcons name="format-color-text" size={24} color={colors.tint} />
              <ThemedText style={styles.quickActionButtonText}>글꼴</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.card }]}>
              <Feather name="image" size={24} color={colors.tint} />
              <ThemedText style={styles.quickActionButtonText}>이미지</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.quickActionButton, { backgroundColor: colors.card }]}>
              <Feather name="music" size={24} color={colors.tint} />
              <ThemedText style={styles.quickActionButtonText}>배경음악</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {showKeyboard && (
        <View style={[styles.keyboardToolbar, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={styles.keyboardButton}>
            <Feather name="bold" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.keyboardButton}>
            <Feather name="italic" size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.keyboardButton}>
            <Feather name="underline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <TouchableOpacity 
          style={[styles.submitButton, { backgroundColor: colors.tint }]}
          onPress={handleSubmit}
        >
          <ThemedText style={styles.submitButtonText}>저장하기</ThemedText>
          <Feather name="check" size={20} color="white" style={styles.submitIcon} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120, // Increased bottom padding to make room for the save button
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  reference: {
    fontSize: 16,
    color: '#888',
  },
  verseContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  verseText: {
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'NanumMyeongjo',
  },
  translationText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  writingAreaContainer: {
    marginBottom: 24,
  },
  writingTools: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  toolButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    minHeight: 200,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    borderWidth: 1,
    marginBottom: 8,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  toolButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '31%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionButtonText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  keyboardToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
  },
  keyboardButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  divider: {
    width: 1,
    height: 24,
    marginHorizontal: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 60, // 탭 바 위로 더 올라오도록 조정
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 20, // 하단 패딩 조정
    backgroundColor: 'transparent',
  },
  submitButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    textAlign: 'center',
  },
  submitIcon: {
    marginLeft: 8,
  },
});
