import { bibleText } from '@/constants/bibleText';

export interface DailyVerse {
  reference: string;
  text: string;
  translation?: string;
  book?: string;
  chapter?: number;
  verse?: number;
}

export const getDailyVerse = (): DailyVerse => {
  // 오늘의 날짜를 기준으로 1-365 사이의 숫자 생성
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // 성경 구절 목록에서 오늘의 인덱스 선택
  const verseKeys = Object.keys(bibleText);
  const todayIndex = dayOfYear % verseKeys.length;
  const todayKey = verseKeys[todayIndex];
  
  // 참조에서 책, 장, 절 정보 파싱
  const [bookChapter, verse] = todayKey.split(':');
  const bookMatch = bookChapter.match(/[가-힣]+/);
  const chapterMatch = bookChapter.match(/\d+/);
  
  return {
    reference: todayKey,
    text: bibleText[todayKey as keyof typeof bibleText],
    translation: '', // 번역문은 필요시 추가
    book: bookMatch ? bookMatch[0] : '',
    chapter: chapterMatch ? parseInt(chapterMatch[0], 10) : 0,
    verse: parseInt(verse, 10) || 0,
  };
};

// 테스트용 오늘의 말씀 (개발 중 확인용)
// export const getDailyVerse = (): DailyVerse => ({
//   reference: '시편 119:105',
//   text: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다',
//   translation: 'Your word is a lamp to my feet and a light to my path.',
//   book: '시편',
//   chapter: 119,
//   verse: 105,
// });
