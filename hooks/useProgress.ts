import { useSentenceData } from "@/hooks/useSentenceData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export type AlphabetProgress = {
  done: boolean;
  score: number; // 맞춘 개수
  total: number; // 전체 문제 수
  lastPlayed: string; // ISO 날짜
};

export type SentenceProgress = {
  done: boolean;
  cleared: boolean; // 정답 여부
  lastPlayed: string;
};

const KEYS = {
  alphabet: (letter: string) => `progress_alphabet_${letter}`,
  sentence: (id: number) => `progress_sentence_${id}`,
};

// 알파벳 퀴즈 진도 저장
export const saveAlphabetProgress = async (
  letter: string,
  score: number,
  total: number
) => {
  const data: AlphabetProgress = {
    done: true,
    score,
    total,
    lastPlayed: new Date().toISOString(),
  };
  await AsyncStorage.setItem(KEYS.alphabet(letter), JSON.stringify(data));
};

// 문장 퀴즈 진도 저장
export const saveSentenceProgress = async (id: number, cleared: boolean) => {
  const data: SentenceProgress = {
    done: true,
    cleared,
    lastPlayed: new Date().toISOString(),
  };
  await AsyncStorage.setItem(KEYS.sentence(id), JSON.stringify(data));
};

// 알파벳 전체 진도 불러오기
export const useAlphabetProgress = () => {
  const [progress, setProgress] = useState<Record<string, AlphabetProgress>>(
    {}
  );

  const load = useCallback(async () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const entries = await Promise.all(
      letters.map(async (letter) => {
        const raw = await AsyncStorage.getItem(KEYS.alphabet(letter));
        return [letter, raw ? JSON.parse(raw) : null] as const;
      })
    );
    const result: Record<string, AlphabetProgress> = {};
    entries.forEach(([letter, data]) => {
      if (data) result[letter] = data;
    });
    setProgress(result);
  }, []);

  useEffect(() => {
    load();
  }, []);

  return { progress, reload: load };
};

// 문장 전체 진도 불러오기
export const useSentenceProgress = () => {
  const [progress, setProgress] = useState<Record<number, SentenceProgress>>(
    {}
  );
  const { data: sentenceData, loading } = useSentenceData();

  const load = useCallback(async () => {
    // const ids = Array.from({ length: 15 }, (_, i) => i + 1);
    const ids = sentenceData.map((item) => item.id);

    const entries = await Promise.all(
      ids.map(async (id) => {
        const raw = await AsyncStorage.getItem(KEYS.sentence(id));
        return [id, raw ? JSON.parse(raw) : null] as const;
      })
    );
    const result: Record<number, SentenceProgress> = {};
    entries.forEach(([id, data]) => {
      if (data) result[id] = data;
    });
    setProgress(result);
  }, []);

  useEffect(() => {
    load();
  }, []);

  return { progress, reload: load };
};
