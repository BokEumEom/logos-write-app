import { BibleBook, bibleBooks } from '@/constants/bible/books';
import { BiblePreferences, defaultPreferences } from '@/constants/bible/preferences';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BibleState {
  // 현재 선택된 책과 장
  selectedBook: BibleBook;
  currentChapter: number;
  
  // 책갈피, 하이라이트 등의 설정
  preferences: BiblePreferences;

  // 최근 읽은 위치
  recentlyRead: Array<{
    bookCode: string;
    chapter: number;
    timestamp: number;
  }>;

  // Actions
  setSelectedBook: (book: BibleBook) => void;
  setCurrentChapter: (chapter: number) => void;
  updatePreferences: (preferences: Partial<BiblePreferences>) => void;
  toggleHighlight: (verseKey: string, color?: string) => void;
  toggleBookmark: (verseKey: string, note?: string) => void;
  addToRecentlyRead: () => void;
}

export const useBibleStore = create<BibleState>()(
  persist(
    (set, get) => ({
      selectedBook: bibleBooks[0],
      currentChapter: 1,
      preferences: defaultPreferences,
      recentlyRead: [],

      setSelectedBook: (book) => set({ selectedBook: book }),
      
      setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
      
      updatePreferences: (newPrefs) => set((state) => ({
        preferences: { ...state.preferences, ...newPrefs }
      })),
      
      toggleHighlight: (verseKey, color) => set((state) => {
        const newHighlightedVerses = { ...state.preferences.highlightedVerses };
        
        if (color && !newHighlightedVerses[verseKey]) {
          newHighlightedVerses[verseKey] = {
            color,
            timestamp: Date.now()
          };
        } else {
          delete newHighlightedVerses[verseKey];
        }

        return {
          preferences: {
            ...state.preferences,
            highlightedVerses: newHighlightedVerses
          }
        };
      }),
      
      toggleBookmark: (verseKey, note) => set((state) => {
        const newBookmarks = { ...state.preferences.bookmarks };
        
        if (!newBookmarks[verseKey]) {
          newBookmarks[verseKey] = {
            note,
            timestamp: Date.now()
          };
        } else {
          delete newBookmarks[verseKey];
        }

        return {
          preferences: {
            ...state.preferences,
            bookmarks: newBookmarks
          }
        };
      }),
      
      addToRecentlyRead: () => set((state) => {
        const newEntry = {
          bookCode: state.selectedBook.code,
          chapter: state.currentChapter,
          timestamp: Date.now()
        };

        const existingIndex = state.recentlyRead.findIndex(
          item => item.bookCode === newEntry.bookCode && item.chapter === newEntry.chapter
        );

        let newRecentlyRead = [...state.recentlyRead];
        
        if (existingIndex !== -1) {
          newRecentlyRead.splice(existingIndex, 1);
        }
        
        newRecentlyRead.unshift(newEntry);
        newRecentlyRead = newRecentlyRead.slice(0, 10); // 최근 10개만 유지

        return { recentlyRead: newRecentlyRead };
      }),
    }),
    {
      name: 'bible-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
