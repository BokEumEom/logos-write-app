import { BibleSearchBar } from '@/components/bible/BibleSearchBar';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function BibleSearchScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <Stack.Screen
        options={{
          title: '성경 검색',
          headerShown: true,
        }}
      />
      <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
        <BibleSearchBar autoFocus />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
