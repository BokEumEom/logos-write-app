export type Testament = 'old' | 'new';

export interface TestamentInfo {
  id: Testament;
  title_ko: string;
  title_en: string;
}

export const testaments: TestamentInfo[] = [
  { id: 'old', title_ko: '구약', title_en: 'Old Testament' },
  { id: 'new', title_ko: '신약', title_en: 'New Testament' },
];
