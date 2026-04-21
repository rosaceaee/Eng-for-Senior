import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type AlphabetWord = {
  id: number;
  letter: string;
  english: string;
  korean: string;
  emoji: string;
};

type AlphabetData = {
  letter: string;
  words: AlphabetWord[];
};

export const useAlphabetData = () => {
  const [data, setData] = useState<AlphabetData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("alphabet_words")
        .select("*")
        .order("letter");

      if (!error && data) {
        const grouped = (data as AlphabetWord[]).reduce((acc, word) => {
          const existing = acc.find((item) => item.letter === word.letter);
          if (existing) {
            existing.words.push(word);
          } else {
            acc.push({ letter: word.letter, words: [word] });
          }
          return acc;
        }, [] as AlphabetData[]);

        setData(grouped);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return { data, loading };
};
