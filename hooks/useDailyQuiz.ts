import alphabetData from "@/data/alphabetData.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type DailyWord = {
  english: string;
  korean: string;
  emoji: string;
  letter: string;
};

const getTodayKey = () => {
  const today = new Date();
  return `daily_word_${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`;
};

const getRandomWord = (): DailyWord => {
  const allWords = alphabetData.flatMap((item) =>
    item.words.map((word) => ({ ...word, letter: item.letter }))
  );
  const random = allWords[Math.floor(Math.random() * allWords.length)];
  return random;
};

export const useDailyQuiz = () => {
  const [word, setWord] = useState<DailyWord | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const check = async () => {
      const todayKey = getTodayKey();
      const seen = await AsyncStorage.getItem(todayKey);

      if (!seen) {
        const daily = getRandomWord();
        await AsyncStorage.setItem(todayKey, JSON.stringify(daily));
        setWord(daily);
        setShowModal(true);
      }
    };
    check();
  }, []);

  const dismiss = async () => {
    setShowModal(false);
  };

  return { word, showModal, dismiss };
};
