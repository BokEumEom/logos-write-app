import { BibleReader } from '@/components/bible/BibleReader';
import { Stack, useLocalSearchParams } from 'expo-router';

export default function BibleChapterScreen() {
  const { book, chapter } = useLocalSearchParams();
  
  return (
    <>
      <Stack.Screen
        options={{
          title: `${book} ${chapter}장`,
          headerShown: true,
        }}
      />
      <BibleReader initialBook={book as string} initialChapter={Number(chapter)} />
    </>
  );
}
