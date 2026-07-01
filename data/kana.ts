import type { KanaItem } from "@/types/kana";

const baseRows = [
  ["あ", "ア", "a", "あめ", "雨", "rain"], ["い", "イ", "i", "いえ", "家", "house"], ["う", "ウ", "u", "うみ", "海", "sea"], ["え", "エ", "e", "えき", "駅", "station"], ["お", "オ", "o", "おと", "音", "sound"],
  ["か", "カ", "ka", "かさ", "傘", "umbrella"], ["き", "キ", "ki", "き", "木", "tree"], ["く", "ク", "ku", "くも", "雲", "cloud"], ["け", "ケ", "ke", "けさ", "今朝", "morning"], ["こ", "コ", "ko", "こえ", "声", "voice"],
  ["さ", "サ", "sa", "さくら", "桜", "cherry blossom"], ["し", "シ", "shi", "しお", "塩", "salt"], ["す", "ス", "su", "すし", "寿司", "sushi"], ["せ", "セ", "se", "せかい", "世界", "world"], ["そ", "ソ", "so", "そら", "空", "sky"],
  ["た", "タ", "ta", "たび", "旅", "trip"], ["ち", "チ", "chi", "ちず", "地図", "map"], ["つ", "ツ", "tsu", "つき", "月", "moon"], ["て", "テ", "te", "て", "手", "hand"], ["と", "ト", "to", "とり", "鳥", "bird"],
  ["な", "ナ", "na", "なつ", "夏", "summer"], ["に", "ニ", "ni", "にほん", "日本", "Japan"], ["ぬ", "ヌ", "nu", "ぬの", "布", "cloth"], ["ね", "ネ", "ne", "ねこ", "猫", "cat"], ["の", "ノ", "no", "のり", "海苔", "seaweed"],
  ["は", "ハ", "ha", "はな", "花", "flower"], ["ひ", "ヒ", "hi", "ひかり", "光", "light"], ["ふ", "フ", "fu", "ふね", "船", "ship"], ["へ", "ヘ", "he", "へや", "部屋", "room"], ["ほ", "ホ", "ho", "ほし", "星", "star"],
  ["ま", "マ", "ma", "まち", "町", "town"], ["み", "ミ", "mi", "みず", "水", "water"], ["む", "ム", "mu", "むし", "虫", "insect"], ["め", "メ", "me", "め", "目", "eye"], ["も", "モ", "mo", "もり", "森", "forest"],
  ["や", "ヤ", "ya", "やま", "山", "mountain"], ["ゆ", "ユ", "yu", "ゆき", "雪", "snow"], ["よ", "ヨ", "yo", "よる", "夜", "night"],
  ["ら", "ラ", "ra", "りんご", "林檎", "apple"], ["り", "リ", "ri", "りす", "栗鼠", "squirrel"], ["る", "ル", "ru", "るす", "留守", "absence"], ["れ", "レ", "re", "れきし", "歴史", "history"], ["ろ", "ロ", "ro", "ろく", "六", "six"],
  ["わ", "ワ", "wa", "わたし", "私", "I"], ["を", "ヲ", "wo", "を", "を", "object marker"], ["ん", "ン", "n", "ほん", "本", "book"]
] as const;

const rowNames = ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa"];

function makeKana([hiragana, katakana, romaji, word, zhWord, enWord]: (typeof baseRows)[number], index: number): KanaItem {
  const row = index < 35 ? rowNames[Math.floor(index / 5)] : index < 38 ? "ya" : index < 43 ? "ra" : "wa";
  return {
    id: romaji,
    group: "gojuon",
    row,
    hiragana,
    katakana,
    romaji,
    strokeCount: Math.max(1, Math.min(4, hiragana.charCodeAt(0) % 5)),
    jlpt: "N5",
    zh: `${romaji} 行基础假名，用于构成日语音节。`,
    en: `Core ${romaji} kana used in Japanese syllables.`,
    examples: [{ word, reading: word, meaningZh: zhWord, meaningEn: enWord }],
    sentence: { ja: `${word}を みます。`, zh: `我看见${zhWord}。`, en: `I see ${enWord}.` },
    commonMistake: "注意音节短促，不要自动拉成长音。",
    mnemonic: "把字形和例词联系起来记忆，会更稳。"
  };
}

export const gojuon: KanaItem[] = baseRows.map(makeKana);

const marks = [
  ["が", "ガ", "ga", "ka"], ["ぎ", "ギ", "gi", "ki"], ["ぐ", "グ", "gu", "ku"], ["げ", "ゲ", "ge", "ke"], ["ご", "ゴ", "go", "ko"],
  ["ざ", "ザ", "za", "sa"], ["じ", "ジ", "ji", "shi"], ["ず", "ズ", "zu", "su"], ["ぜ", "ゼ", "ze", "se"], ["ぞ", "ゾ", "zo", "so"],
  ["だ", "ダ", "da", "ta"], ["ぢ", "ヂ", "ji", "chi"], ["づ", "ヅ", "zu", "tsu"], ["で", "デ", "de", "te"], ["ど", "ド", "do", "to"],
  ["ば", "バ", "ba", "ha"], ["び", "ビ", "bi", "hi"], ["ぶ", "ブ", "bu", "fu"], ["べ", "ベ", "be", "he"], ["ぼ", "ボ", "bo", "ho"]
] as const;

export const dakuten: KanaItem[] = marks.map(([hiragana, katakana, romaji, base], index) => ({
  ...(gojuon.find((item) => item.id === base) as KanaItem),
  id: `${romaji}-${index}`,
  group: "dakuten",
  hiragana,
  katakana,
  romaji,
  zh: "浊音假名，发音比对应清音更有声带振动。",
  en: "Voiced kana with stronger vocal cord vibration."
}));

export const handakuten: KanaItem[] = [
  ["ぱ", "パ", "pa", "ha"], ["ぴ", "ピ", "pi", "hi"], ["ぷ", "プ", "pu", "fu"], ["ぺ", "ペ", "pe", "he"], ["ぽ", "ポ", "po", "ho"]
].map(([hiragana, katakana, romaji, base], index) => ({
  ...(gojuon.find((item) => item.id === base) as KanaItem),
  id: `${romaji}-${index}`,
  group: "handakuten",
  hiragana,
  katakana,
  romaji,
  zh: "半浊音假名，双唇闭合后释放。",
  en: "Semi-voiced kana produced with clear lip release."
}));

const youonBases = ["き", "ぎ", "し", "じ", "ち", "に", "ひ", "び", "ぴ", "み", "り"] as const;
const youonStem: Record<string, string> = { き: "ky", ぎ: "gy", し: "sh", じ: "j", ち: "ch", に: "ny", ひ: "hy", び: "by", ぴ: "py", み: "my", り: "ry" };
const allBase = [...gojuon, ...dakuten, ...handakuten];
export const youon: KanaItem[] = youonBases.flatMap((base) => {
  const source = allBase.find((item) => item.hiragana === base) as KanaItem;
  return [["ゃ", "ャ", "a"], ["ゅ", "ュ", "u"], ["ょ", "ョ", "o"]].map(([h, k, tail]) => ({
    ...source,
    id: `${youonStem[base]}${tail}`,
    group: "youon" as const,
    hiragana: `${source.hiragana}${h}`,
    katakana: `${source.katakana}${k}`,
    romaji: `${youonStem[base]}${tail}`,
    zh: "拗音由 i 段假名加小 ゃ/ゅ/ょ 组成。",
    en: "Contracted sound formed with an i-row kana and small ya/yu/yo."
  }));
});

export const kanaData = [...gojuon, ...dakuten, ...handakuten, ...youon];
export const getKanaByGroup = (group: KanaItem["group"]) => kanaData.filter((item) => item.group === group);
export const findKana = (query: string) => {
  const value = query.trim().toLowerCase();
  if (!value) return [];
  return kanaData.filter((item) => [item.hiragana, item.katakana, item.romaji, item.row, item.examples[0]?.word].some((field) => field?.toLowerCase().includes(value)));
};
