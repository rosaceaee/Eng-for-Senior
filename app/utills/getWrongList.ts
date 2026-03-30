import { SentenceProgress } from "@/hooks/useProgress";

type Item = {
  id: number;
  korean: string;
  english: string;
  blocks: string[];
};

export const getWrongList = (
  data: Item[],
  progress: Record<number, SentenceProgress>
) => {
  return data.filter(
    (item) => progress[item.id]?.done && !progress[item.id]?.cleared
  );
};

// export const wrongList = sentenceData.filter(
//   (item) => progress[item.id]?.done && !progress[item.id]?.cleared
// );
