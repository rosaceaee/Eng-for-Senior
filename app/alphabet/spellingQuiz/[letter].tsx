import { scale } from "@/app/utills/scale";
import alphabetData from "@/data/alphabetData.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function SpellingQuiz() {
  const { letter } = useLocalSearchParams<{ letter: string }>();
  const router = useRouter();

  const data = alphabetData.find((item) => item.letter === letter);

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentWord = data?.words[currentWordIdx];

  useEffect(() => {
    if (currentWord) resetQuiz();
  }, [currentWordIdx]);

  if (!data || !currentWord) return null;

  const resetQuiz = () => {
    const letters = currentWord.english.split("");
    setShuffledLetters(shuffle([...letters]));
    setSelected([]);
    setFinished(false);
    setIsCorrect(false);
  };

  const handleSelect = (letter: string, idx: number) => {
    const next = [...selected, letter];
    const remaining = shuffledLetters.filter((_, i) => i !== idx);
    setSelected(next);
    setShuffledLetters(remaining);

    if (next.length === currentWord.english.length) {
      const correct = next.join("") === currentWord.english;
      setIsCorrect(correct);
      setFinished(true);
      Speech.speak(correct ? "정답!" : currentWord.english, {
        language: "english",
        rate: 0.6,
      });
    }
  };

  const handleDeselect = (letter: string, idx: number) => {
    if (finished) return;
    const next = selected.filter((_, i) => i !== idx);
    setSelected(next);
    setShuffledLetters((prev) => [...prev, letter]);
  };

  const handleNext = () => {
    if (currentWordIdx + 1 >= data.words.length) {
      router.replace(`/alphabet/${letter}`);
    } else {
      setCurrentWordIdx((i) => i + 1);
    }
  };

  // 결과 화면
  if (finished) {
    return (
      <View style={styles.container}>
        <Text style={styles.resultEmoji}>
          {isCorrect ? (
            <>
              <Image
                source={require("@/assets/images/clap.png")}
                style={styles.resultImg}
              />
            </>
          ) : (
            <>
              <Image
                source={require("@/assets/images/smile_eyeclosed_org.png")}
                style={styles.resultImg}
              />
            </>
          )}
        </Text>
        <Text style={styles.resultTitle}>
          {isCorrect ? "정답!" : "아쉬워요!"}
        </Text>
        <View style={styles.answerBox}>
          <TouchableOpacity
            onPress={() =>
              Speech.speak(currentWord.english, {
                language: "en-US",
                rate: 0.5,
              })
            }
          >
            {/* <Text style={styles.answerEnglish}>{currentWord.english} 🔊</Text> */}

            <View style={styles.resultSpeakIcnWrap}>
              {/* <Text style={styles.speakIcon}>🔊</Text> */}
              <Image
                source={require("@/assets/images/speaker.png")}
                style={styles.answerSpeaker}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.answerKorean}>{currentWord.korean}</Text>
        </View>

        <View style={styles.quizBtnWrap}>
          <TouchableOpacity style={styles.quizButton} onPress={resetQuiz}>
            <View>
              <Text style={styles.buttonText}>다시 풀기</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizButton} onPress={handleNext}>
            <View>
              <Text style={styles.buttonText}>
                {currentWordIdx + 1 >= data.words.length
                  ? "완료"
                  : "다음 단어 →"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // 퀴즈 화면
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 진행상황 */}
      <Text style={styles.progress}>
        {currentWordIdx + 1} / {data.words.length}
      </Text>

      {/* 단어 문제 */}
      <Text style={styles.questionText}>
        아래에 있는 단어의 뜻을 세가지 중에서 하나 고르세요.
      </Text>
      <View style={styles.speakIcnWrap}>
        <TouchableOpacity
          onPress={() =>
            Speech.speak(currentWord.english, { language: "en-US", rate: 0.8 })
          }
        >
          {/* <Text style={styles.speakIcon}>🔊</Text> */}
          <Image
            source={require("@/assets/images/speaker.png")}
            style={styles.answerSpeaker}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.questionCard}>
        <Text style={styles.emoji}>{currentWord.emoji}</Text>
        <Text style={styles.korean}>{currentWord.korean}</Text>
      </View>

      {/* 알파벳 선택 영역 */}
      <View style={styles.selectedArea}>
        <Text style={styles.areaLabel}>내 답</Text>
        <View style={styles.blockRow}>
          {selected.length === 0 ? (
            <Text style={styles.placeholder}>
              아래 알파벳 조각을 눌러서 단어를 완성해보세요
            </Text>
          ) : (
            selected.map((l, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.selectedBlock}
                onPress={() => handleDeselect(l, idx)}
              >
                <Text style={styles.blockTextSelected}>{l}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>

      {/* 섞인 알파벳 */}
      <View style={styles.choiceArea}>
        <Text style={styles.areaLabel}>알파벳 블록</Text>
        <View style={styles.blockRow}>
          {shuffledLetters.map((l, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.choiceBlock}
              onPress={() => handleSelect(l, idx)}
            >
              <Text style={styles.blockText}>{l}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    fontSize: scale(18),
    color: C.mono.eight3,
    alignSelf: "flex-end",
  },
  questionCard: {
    width: "100%",
    alignItems: "center",
    backgroundColor: C.bg.card,
    borderRadius: 20,
    padding: scale(10),
    gap: 8,
  },
  emoji: {
    fontSize: 56,
  },
  korean: {
    fontSize: 24,
    fontWeight: "bold",
  },
  speakIcon: {
    fontSize: 28,
  },
  selectedArea: {
    width: "100%",
    minHeight: 80,
    backgroundColor: "#EAF4FF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderStyle: "dashed",
    padding: 16,
    gap: 12,
  },
  choiceArea: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  areaLabel: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
  },
  blockRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    minHeight: 48,
  },
  placeholder: {
    fontSize: 15,
    color: "#aaa",
    alignSelf: "center",
  },
  selectedBlock: {
    backgroundColor: "#4A90E2",
    color: C.text.fff,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  choiceBlock: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  blockText: {
    fontSize: 22,
    fontWeight: "600",
    color: C.mono.sansansan,
  },
  blockTextSelected: {
    fontSize: 20,
    fontWeight: "600",
    color: C.text.fff,
  },
  resultEmoji: {
    fontSize: 80,
    marginTop: scale(30),
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  answerBox: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  answerLabel: {
    fontSize: 16,
    color: "#888",
  },
  answerEnglish: {
    fontSize: 24,
    fontWeight: "bold",
  },
  answerKorean: {
    fontSize: scale(24),
    color: C.mono.sansansan,
    fontWeight: "bold",
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
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: C.text.fff,
  },
  resultImg: {
    width: 80,
    height: 80,
  },
  questionText: {
    fontSize: 18,
    color: C.text.secondary,
    marginTop: 4,
  },
  speakIcnWrap: {
    marginLeft: "auto",
    marginRight: scale(20),
  },
  resultSpeakIcnWrap: {
    marginRight: scale(20),
  },
  answerSpeaker: {
    width: 30,
    height: 30,
  },
  quizButton: {
    width: "50%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.blue.lb,
    borderRadius: 16,
    marginTop: 8,
  },
  quizButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: C.text.fff,
  },
  quizBtnWrap: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    gap: scale(20),
    justifyContent: "center",
    alignItems: "center",
  },
});
