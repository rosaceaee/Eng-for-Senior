import alphabetData from "@/data/alphabetData.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Word = { english: string; korean: string; emoji: string };
type QuizItem = { word: Word; choices: string[] };

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

const buildQuiz = (words: Word[]): QuizItem[] => {
  const allKorean = alphabetData.flatMap((item) =>
    item.words.map((w) => w.korean)
  );

  return words.map((word) => {
    const wrongs = shuffle(allKorean.filter((k) => k !== word.korean)).slice(
      0,
      2
    );
    const choices = shuffle([word.korean, ...wrongs]);
    return { word, choices };
  });
};

export default function QuizScreen() {
  const { letter } = useLocalSearchParams<{ letter: string }>();
  const router = useRouter();

  const data = alphabetData.find((item) => item.letter === letter);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (data) setQuiz(buildQuiz(data.words));
  }, [letter]);

  if (!data || quiz.length === 0) return null;

  const currentQuiz = quiz[current];
  const isCorrect = selected === currentQuiz.word.korean;

  // asnyc ??
  const handleSelect = (choice: string) => {
    if (selected) return; // 이미 선택한 경우 무시
    setSelected(choice);
    if (choice === currentQuiz.word.korean) {
      setScore((s) => s + 1);
      Speech.speak("Correct!", { language: "en-US" });
    } else {
      Speech.speak("Try again!", { language: "en-US" });
    }
  };

  const handleNext = () => {
    if (current + 1 >= quiz.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  // if (next.length === data.blocks.length) {
  //   const correct = ...;
  //   setIsCorrect(correct);
  //   setFinished(true);

  //   // ✅ 이 줄 추가
  //   await saveAlphabetProgress(letter, correct ? score + 1 : score, quiz.length);
  // }

  // 결과 화면
  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultEmoji}>
          {score === quiz.length ? "🎉" : score >= 2 ? "👍" : "💪"}
        </Text>
        <Text style={styles.resultTitle}>퀴즈 완료!</Text>
        <Text style={styles.resultScore}>
          {quiz.length}문제 중 {score}개 정답
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setQuiz(buildQuiz(data.words));
            setCurrent(0);
            setSelected(null);
            setScore(0);
            setFinished(false);
          }}
        >
          <Text style={styles.buttonText}>다시 풀기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push("/alphabet")}
        >
          <Text style={styles.buttonText}>알파벳 목록으로</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 퀴즈 화면
  return (
    <View style={styles.container}>
      {/* 진행 상황 */}
      <Text style={styles.progress}>
        {current + 1} / {quiz.length}
      </Text>

      {/* 문제 */}
      <View style={styles.questionCard}>
        <Text style={styles.emoji}>{currentQuiz.word.emoji}</Text>
        <Text style={styles.english}>{currentQuiz.word.english}</Text>
        <TouchableOpacity
          onPress={() =>
            Speech.speak(currentQuiz.word.english, {
              language: "en-US",
              rate: 0.8,
            })
          }
        >
          <Text style={styles.speakIcon}>🔊</Text>
        </TouchableOpacity>
        <Text style={styles.questionText}>무슨 뜻일까요?</Text>
      </View>

      {/* 보기 */}
      <View style={styles.choiceList}>
        {currentQuiz.choices.map((choice, idx) => {
          const isSelected = selected === choice;
          const isRight = choice === currentQuiz.word.korean;

          let cardStyle = styles.choiceCard;
          if (selected) {
            if (isRight)
              cardStyle = { ...styles.choiceCard, ...styles.correct };
            else if (isSelected)
              cardStyle = { ...styles.choiceCard, ...styles.wrong };
          }

          return (
            <TouchableOpacity
              key={idx}
              style={cardStyle}
              onPress={() => handleSelect(choice)}
            >
              <Text style={styles.choiceNumber}>{idx + 1}</Text>
              <Text style={styles.choiceText}>{choice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 다음 버튼 — 선택 후에만 표시 */}
      {selected && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {current + 1 >= quiz.length ? "결과 보기" : "다음 문제 →"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 20,
  },
  progress: {
    fontSize: 18,
    color: "#888",
    alignSelf: "flex-end",
  },
  questionCard: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 24,
    gap: 8,
  },
  emoji: {
    fontSize: 56,
  },
  english: {
    fontSize: 36,
    fontWeight: "bold",
  },
  speakIcon: {
    fontSize: 28,
  },
  questionText: {
    fontSize: 18,
    color: "#555",
    marginTop: 4,
  },
  choiceList: {
    width: "100%",
    gap: 12,
  },
  choiceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 14,
    padding: 18,
    gap: 16,
  },
  correct: {
    backgroundColor: "#d4edda",
    borderWidth: 2,
    borderColor: "#28a745",
  },
  wrong: {
    backgroundColor: "#f8d7da",
    borderWidth: 2,
    borderColor: "#dc3545",
  },
  choiceNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888",
    width: 24,
  },
  choiceText: {
    fontSize: 22,
    fontWeight: "500",
  },
  nextButton: {
    width: "100%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 16,
  },
  retryButton: {
    width: "100%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 16,
  },
  homeButton: {
    width: "100%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#888",
    borderRadius: 16,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  resultEmoji: {
    fontSize: 80,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  resultScore: {
    fontSize: 24,
    color: "#555",
  },
});
