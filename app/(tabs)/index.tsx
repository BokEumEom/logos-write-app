import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { getDailyVerse } from '@/utils/dailyVerse';

// 오늘의 말씀 가져오기
const todaysVerse = getDailyVerse();

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [verse, setVerse] = useState(todaysVerse);

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
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const handleWritePress = () => {
    // Navigate to write tab
    router.push('/(tabs)/write');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={styles.dateText}>{today}</ThemedText>
          <ThemedText style={styles.title}>오늘의 말씀</ThemedText>
        </View>

        <ThemedView style={[styles.verseContainer, { backgroundColor: colors.card }]}>
          <View style={styles.referenceContainer}>
            <ThemedText style={styles.referenceText}>{todaysVerse.reference}</ThemedText>
            <TouchableOpacity 
              style={styles.bookmarkIcon}
              onPress={handleWritePress}
            >
              <Feather name="edit-3" size={20} color={colors.tint} />
            </TouchableOpacity>
          </View>
          
          <ThemedText style={styles.verseText}>{todaysVerse.text}</ThemedText>
          <ThemedText style={styles.translationText}>{todaysVerse.translation}</ThemedText>
          
          <TouchableOpacity 
            style={[styles.writeButton, { backgroundColor: colors.buttonPrimary }]}
            onPress={handleWritePress}
          >
            <Feather name="edit-3" size={20} color={colors.buttonText} style={styles.writeIcon} />
            <ThemedText style={[styles.writeButtonText, { color: colors.buttonText }]}>
              필사하기
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <View style={styles.quickActions}>
          <ThemedText style={styles.sectionTitle}>빠른 메뉴</ThemedText>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: colors.card }]}
              onPress={() => router.push('/bible')}
            >
              <Feather name="book" size={24} color={colors.tint} />
              <ThemedText style={styles.actionButtonText}>성경 읽기</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
              <Feather name="bookmark" size={24} color={colors.tint} />
              <ThemedText style={styles.actionButtonText}>내 서재</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Extra space for tab bar
  },
  header: {
    marginBottom: 24,
  },
  dateText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  verseContainer: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  referenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  referenceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
  bookmarkIcon: {
    padding: 8,
  },
  verseText: {
    fontSize: 20,
    lineHeight: 36,
    marginBottom: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: 'NanumMyeongjo',
    width: '100%',
  },
  translationText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'left',
    fontStyle: 'italic',
  },
  writeButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 8,
  },
  writeIcon: {
    marginRight: 8,
  },
  writeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});
