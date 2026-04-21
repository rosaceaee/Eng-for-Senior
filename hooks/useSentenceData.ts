import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

type Sentence = {
  id: number;
  korean: string;
  english: string;
  blocks: string[];
  level: string;
};

export const useSentenceData = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data: result, error } = await supabase
        .from("sentences")
        .select("*")
        .order("id");
      if (!error && result) setSentences(result as Sentence[]);
      setLoading(false);
    };
    fetch();
  }, []);

  return { data: sentences, loading };
};
