import { scale } from "@/app/utils/scale";
import alphabetData from "@/data/alphabetData.json";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

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

  const handleSelect = (choice: string) => {
    if (selected) return; // 이미 선택한 경우 무시
    setSelected(choice);
    if (choice === currentQuiz.word.korean) {
      setScore((s) => s + 1);
      Speech.speak("정답!", { language: "ko" });
    } else {
      Speech.speak("땡!", { language: "ko", rate: 1 });
    }

    // 퀴즈에서 답안 선택 후 다음 문제 버튼으로 포커스
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleNext = () => {
    if (current + 1 >= quiz.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  };

  // 결과 화면
  if (finished) {
    return (
      <View style={styles.container}>
        <View style={styles.resultEmoji}>
          {score === quiz.length ? (
            <>
              <Image
                source={require("@/assets/images/clap.png")}
                style={styles.resultImg}
              />
            </>
          ) : score >= 2 ? (
            <Image
              source={require("@/assets/images/smile_g.png")}
              style={styles.resultImg}
            />
          ) : (
            <Image
              source={require("@/assets/images/smile_eyeclosed_org.png")}
              style={styles.resultImg}
            />
          )}
          {/* {score === quiz.length ? "🎉" : score >= 2 ? "👍" : "💪"} */}
        </View>
        <Text style={styles.resultTitle}>퀴즈 완료!</Text>
        <Text style={styles.resultScore}>
          {quiz.length}문제 중 {score}개를 맞췄어요!
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
          <Text style={styles.retryButtonText}>다시 풀기</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              router.replace("/alphabet");
            }}
          >
            <Image
              source={require("@/assets/images/listWh.png")}
              style={styles.icn}
            />
            <Text style={styles.buttonText}>목록으로</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              router.replace("/");
            }}
          >
            <Image
              source={require("@/assets/images/homeWh.png")}
              style={styles.icn}
            />
            <Text style={styles.buttonText}>처음 화면으로</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 퀴즈 화면
  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
      {/* 진행 상황 */}
      <View style={styles.progressBar}>
        {quiz.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.progressSegment,
              { backgroundColor: idx <= current ? "#1565C0" : "#E1E0DA" },
            ]}
          />
        ))}
      </View>

      {/* 문제 */}

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>
          아래에 있는 단어의 뜻을 세가지 중에서 하나 고르세요.
        </Text>

        {/* <Text style={styles.emoji}>{currentQuiz.word.emoji}</Text> */}
        <Text style={styles.english}>{currentQuiz.word.english}</Text>
        <View style={styles.speakIcnWrap}>
          <TouchableOpacity
            onPress={() =>
              Speech.speak(currentQuiz.word.english, {
                language: "en-US",
                rate: 0.5,
              })
            }
          >
            {/* <Text style={styles.speakIcon}>🔊</Text> */}
            <Image
              source={require("@/assets/images/speaker.png")}
              style={styles.answerSpeaker}
            />
          </TouchableOpacity>
        </View>
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
          <Text style={styles.buttonTextNext}>
            {current + 1 >= quiz.length ? "결과 보기" : "다음 문제 →"}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: scale(20),
    paddingHorizontal: 24,
    gap: scale(10),
  },
  progress: {
    fontSize: scale(10),
    color: C.mono.eight3,
    alignSelf: "flex-end",
  },
  questionCard: {
    width: "100%",
    alignItems: "center",
    backgroundColor: C.bg.card,
    borderRadius: 20,
    padding: scale(14),
    gap: 8,
  },
  emoji: {
    fontSize: 56,
  },
  english: {
    fontSize: scale(34),
    fontWeight: "bold",
    marginTop: scale(10),
  },
  speakIcnWrap: {
    marginLeft: "auto",
  },
  speakIcon: {
    fontSize: 28,
  },
  answerSpeaker: {
    width: 30,
    height: 30,
  },
  questionText: {
    fontSize: 18,
    color: C.text.secondary,
    marginTop: 4,
  },
  choiceList: {
    width: "100%",
    gap: 12,
  },
  choiceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.bg.fff,
    borderWidth: 1,
    borderColor: C.default.loyalblue,
    borderRadius: 14,
    padding: 18,
    gap: 16,
  },
  correct: {
    backgroundColor: C.bg.correct,
    borderWidth: 2,
    borderColor: "#28a745",
  },
  wrong: {
    backgroundColor: C.bg.wrong,
    borderWidth: 2,
    borderColor: "#dc3545",
  },
  choiceNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: C.bg.card,
    backgroundColor: C.default.loyalblue,
    width: 50,
    borderWidth: 2,
    borderColor: C.default.loyalblue,
    textAlign: "center",
    padding: 10,
    borderRadius: 50,
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
    backgroundColor: C.default.lb,
    borderRadius: 16,
  },
  homeButton: {
    width: "45%",
    // height: scale(70),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.mono.eight3,
    borderRadius: 16,
    padding: scale(10),
  },
  retryButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: C.text.fff,
  },
  buttonText: {
    fontSize: scale(16),
    color: C.text.fff,
    fontWeight: "bold",
    paddingTop: 10,
  },
  buttonTextNext: {
    fontSize: scale(18),
    color: C.text.fff,
    fontWeight: "bold",
    paddingTop: 0,
  },
  resultEmoji: {
    // fontSize: 80,
    width: 80,
    height: 80,
  },
  resultImg: {
    width: 80,
    height: 80,
  },
  resultTitle: {
    fontSize: scale(26),
    fontWeight: "bold",
  },
  resultScore: {
    fontSize: 24,
    color: C.mono.ooo,
    marginBottom: 40,
  },
  progressBar: {
    flexDirection: "row",
    gap: 8,
  },
  progressSegment: {
    borderRadius: 16,
    width: scale(30),
    height: scale(10),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: scale(10),
  },
  icn: {
    width: 20,
    height: 20,
    paddingTop: 5,
  },
});
