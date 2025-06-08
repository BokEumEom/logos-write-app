export interface BiblePreferences {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  highlightedVerses: {
    [key: string]: {
      color: string;
      timestamp: number;
    };
  };
  bookmarks: {
    [key: string]: {
      note?: string;
      timestamp: number;
    };
  };
  readingProgress: {
    [key: string]: {
      lastRead: number;
      scrollPosition?: number;
    };
  };
}

export const defaultPreferences: BiblePreferences = {
  fontSize: 16,
  lineHeight: 1.75,
  fontFamily: 'NanumMyeongjo',
  highlightedVerses: {},
  bookmarks: {},
  readingProgress: {},
};

export const FONT_SIZE_MIN = 12;
export const FONT_SIZE_MAX = 24;
export const FONT_SIZE_STEP = 1;

export const LINE_HEIGHT_MIN = 1.2;
export const LINE_HEIGHT_MAX = 2.5;
export const LINE_HEIGHT_STEP = 0.1;

export const HIGHLIGHT_COLORS = [
  '#FFE08C', // 노랑
  '#FFB7B7', // 빨강
  '#B7E5FF', // 파랑
  '#B7FFB7', // 초록
  '#FFB7FF', // 보라
];
