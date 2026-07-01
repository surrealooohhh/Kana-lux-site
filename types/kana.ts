export type KanaGroup = "gojuon" | "dakuten" | "handakuten" | "youon";

export interface KanaItem {
  id: string;
  group: KanaGroup;
  row: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  strokeCount: number;
  jlpt: "N5" | "N4" | "N3" | "N2" | "N1";
  zh: string;
  en: string;
  examples: Array<{ word: string; reading: string; meaningZh: string; meaningEn: string }>;
  sentence: { ja: string; zh: string; en: string };
  commonMistake: string;
  mnemonic: string;
}

export interface StudyRecord {
  id: string;
  viewedAt: number;
  correct: number;
  total: number;
}
