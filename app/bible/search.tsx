import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function BibleSearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Stack.Screen
        options={{
          title: '성경 검색',
          headerShown: true,
        }}
      />
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          style={[styles.searchInput, { 
            backgroundColor: colors.card,
            color: colors.text
          }]}
          placeholder="검색어를 입력하세요..."
          placeholderTextColor={colors.text}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* 검색 결과 표시 영역은 추후 구현 */}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
});
