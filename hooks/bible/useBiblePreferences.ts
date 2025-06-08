import { BiblePreferences, defaultPreferences } from '@/constants/bible/preferences';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = '@bible_preferences';

export const useBiblePreferences = () => {
  const [preferences, setPreferences] = useState<BiblePreferences>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const savePreferences = useCallback(async (newPreferences: BiblePreferences) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      setPreferences(newPreferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }, []);

  const updateFontSize = useCallback(async (fontSize: number) => {
    const newPreferences = { ...preferences, fontSize };
    await savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  const updateLineHeight = useCallback(async (lineHeight: number) => {
    const newPreferences = { ...preferences, lineHeight };
    await savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  const toggleHighlight = useCallback(async (verseKey: string, color?: string) => {
    const newHighlightedVerses = { ...preferences.highlightedVerses };
    
    if (color && !newHighlightedVerses[verseKey]) {
      newHighlightedVerses[verseKey] = {
        color,
        timestamp: Date.now(),
      };
    } else {
      delete newHighlightedVerses[verseKey];
    }

    const newPreferences = {
      ...preferences,
      highlightedVerses: newHighlightedVerses,
    };
    await savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  const toggleBookmark = useCallback(async (verseKey: string, note?: string) => {
    const newBookmarks = { ...preferences.bookmarks };
    
    if (!newBookmarks[verseKey]) {
      newBookmarks[verseKey] = {
        note,
        timestamp: Date.now(),
      };
    } else {
      delete newBookmarks[verseKey];
    }

    const newPreferences = {
      ...preferences,
      bookmarks: newBookmarks,
    };
    await savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  const updateReadingProgress = useCallback(async (
    bookCode: string,
    chapter: number,
    scrollPosition?: number
  ) => {
    const progressKey = `${bookCode}-${chapter}`;
    const newProgress = {
      ...preferences.readingProgress,
      [progressKey]: {
        lastRead: Date.now(),
        scrollPosition,
      },
    };

    const newPreferences = {
      ...preferences,
      readingProgress: newProgress,
    };
    await savePreferences(newPreferences);
  }, [preferences, savePreferences]);

  return {
    preferences,
    isLoading,
    updateFontSize,
    updateLineHeight,
    toggleHighlight,
    toggleBookmark,
    updateReadingProgress,
  };
};
