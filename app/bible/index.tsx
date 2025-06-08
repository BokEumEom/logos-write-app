import { BibleReader } from '@/components/bible/BibleReader';
import { Stack } from 'expo-router';

export default function BibleScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: '성경 읽기',
          headerShown: true,
        }}
      />
      <BibleReader />
    </>
  );
}
