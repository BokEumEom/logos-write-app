import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BIBLE_BOOKS, type BibleBook } from '@/constants/BibleBooks';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

type TabType = 'calendar' | 'list';
type BibleBookWithProgress = BibleBook & {
  completed: number[];
};

// Initialize empty data
const bibleBooks: BibleBookWithProgress[] = BIBLE_BOOKS.map(book => ({
  ...book,
  completed: []
}));

// Initialize empty marked dates
const markedDates: { [key: string]: any } = {};

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<TabType>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateProgress = (completed: number[], total: number) => {
    return Math.round((completed.length / total) * 100) || 0;
  };

  const renderCalendarTab = () => (
    <View style={styles.calendarContainer}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...(markedDates[selectedDate] || {}),
            selected: true,
            selectedColor: colors.tint,
          },
        }}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.background,
          textSectionTitleColor: colors.text,
          selectedDayBackgroundColor: colors.tint,
          selectedDayTextColor: colors.buttonText,
          todayTextColor: colors.tint,
          dayTextColor: colors.text,
          textDisabledColor: colors.border,
          dotColor: colors.tint,
          selectedDotColor: colors.buttonText,
          arrowColor: colors.tint,
          monthTextColor: colors.text,
          textDayFontWeight: '400',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
      />
      
      <ThemedView style={[styles.dailySummary, { backgroundColor: colors.card }]}>
        <ThemedText style={styles.summaryTitle}>
          {new Date(selectedDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </ThemedText>
        <ThemedText style={styles.summaryText}>
          이 날 필사 기록이 없습니다.
        </ThemedText>
      </ThemedView>
    </View>
  );

  const renderListTab = () => (
    <ScrollView style={styles.listContainer}>
      <ThemedText style={styles.sectionTitle}>성경 전체 진도율</ThemedText>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: '0%',
                backgroundColor: colors.tint,
              }
            ]} 
          />
        </View>
        <ThemedText style={styles.progressText}>0% 완료</ThemedText>
      </View>

      <ThemedText style={styles.sectionTitle}>책별 진도</ThemedText>
      {bibleBooks.map((book) => {
        const progress = calculateProgress(book.completed, book.chapters);
        return (
          <ThemedView 
            key={book.id} 
            style={[styles.bookItem, { backgroundColor: colors.card }]}
          >
            <View style={styles.bookHeader}>
              <ThemedText style={styles.bookName}>{book.name}</ThemedText>
              <ThemedText style={styles.bookProgress}>{progress}%</ThemedText>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progress}%`,
                    backgroundColor: colors.tint,
                  }
                ]} 
              />
            </View>
            <ThemedText style={styles.bookChapters}>
              {book.completed.length}/{book.chapters}장 완료
            </ThemedText>
          </ThemedView>
        );
      })}
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'calendar' && [styles.activeTab, { borderBottomColor: colors.tint }],
          ]}
          onPress={() => setActiveTab('calendar')}
        >
          <Feather 
            name="calendar" 
            size={20} 
            color={activeTab === 'calendar' ? colors.tint : colors.textSecondary} 
            style={styles.tabIcon} 
          />
          <ThemedText 
            style={[
              styles.tabText,
              { color: activeTab === 'calendar' ? colors.tint : colors.textSecondary },
            ]}
          >
            캘린더
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'list' && [styles.activeTab, { borderBottomColor: colors.tint }],
          ]}
          onPress={() => setActiveTab('list')}
        >
          <Feather 
            name="list" 
            size={20} 
            color={activeTab === 'list' ? colors.tint : colors.textSecondary} 
            style={styles.tabIcon} 
          />
          <ThemedText 
            style={[
              styles.tabText,
              { color: activeTab === 'list' ? colors.tint : colors.textSecondary },
            ]}
          >
            목록
          </ThemedText>
        </TouchableOpacity>
      </View>

      {activeTab === 'calendar' ? renderCalendarTab() : renderListTab()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  calendarContainer: {
    flex: 1,
    padding: 16,
  },
  dailySummary: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  bookItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookName: {
    fontSize: 16,
    fontWeight: '600',
  },
  bookProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  bookChapters: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
});
