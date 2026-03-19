import sentenceData from "@/data/sentenceData.json";
import { saveSentenceProgress } from "@/hooks/useProgress";
import { useTutorial } from "@/hooks/useTutorial";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Tooltip from "@/components/Tooltip";

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function SentenceQuiz() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const data = sentenceData.find((item) => item.id === Number(id));
  const { step, visible, next, restart } = useTutorial(
    "senteceQuizTutorial",
    3
  );

  const [shuffledBlocks, setShuffledBlocks] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (data) resetQuiz();
  }, [id]);

  if (!data) return null;

  const resetQuiz = () => {
    setShuffledBlocks(shuffle([...data.blocks]));
    setSelected([]);
    setFinished(false);
    setIsCorrect(false);
  };

  // 블록 선택 (아래 보기 -> 위 정렬칸으로)
  const handleSelect = async (block: string, idx: number) => {
    const next = [...selected, block];
    const remaining = shuffledBlocks.filter((_, i) => i !== idx);
    setSelected(next);
    setShuffledBlocks(remaining);

    // 블록을 다 골랐을 때 채점
    if (next.length === data.blocks.length) {
      const correct = next.join(" ") === data.blocks.join(" ");
      setIsCorrect(correct);
      setFinished(true);
      await saveSentenceProgress(Number(id), correct);

      Speech.speak(correct ? "Excellent!" : data.english, {
        language: "en-US",
        rate: 0.8,
      });
    }
  };

  // 선택한 블록 취소
  const handleDeselect = (block: string, idx: number) => {
    if (finished) return;
    const next = selected.filter((_, i) => i !== idx);
    setSelected(next);
    setShuffledBlocks((prev) => [...prev, block]);
  };

  if (finished) {
    return (
      <View style={styles.container}>
        {isCorrect ? (
          <>
            <Text style={styles.resultEmoji}>🎉</Text>
            <View style={styles.resultWrap}>
              <Text style={styles.resultTitle}>정답입니다! 잘 하셨어요!</Text>
              <Text style={styles.resultTitle}>다시한번 읽어볼까요?</Text>
            </View>

            <View style={styles.answerBox}>
              <Text style={styles.answerLabel}>정답 문장</Text>
              <TouchableOpacity
                onPress={() =>
                  Speech.speak(data.english, { language: "en-US", rate: 0.8 })
                }
              >
                <Text style={styles.answerEnglish}>{data.english} 🔊</Text>
              </TouchableOpacity>
              <Text style={styles.answerKorean}>{data.korean}</Text>
            </View>

            <TouchableOpacity style={styles.retryButton} onPress={resetQuiz}>
              <Text style={styles.buttonText}>다시 풀기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => router.push("/sentence")}
            >
              <Text style={styles.buttonText}>문장 목록으로</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.resultEmoji}>💪</Text>
            <View style={styles.resultWrap}>
              <Text style={styles.resultTitle}>아쉬워요!</Text>
              <Text style={styles.resultSubTit}>다시 만들어볼까요?</Text>
              <Text style={styles.resultSubTit}>옳은 문장은</Text>
            </View>

            <View style={styles.answerBox}>
              <TouchableOpacity
                onPress={() =>
                  Speech.speak(data.english, { language: "en-US", rate: 0.8 })
                }
              >
                <Text style={styles.answerEnglish}>{data.english} 🔊</Text>
              </TouchableOpacity>
              <Text style={styles.answerKorean}>{data.korean}</Text>
            </View>

            <TouchableOpacity style={styles.retryButton} onPress={resetQuiz}>
              <Text style={styles.buttonText}>다시 풀기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => router.push("/sentence")}
            >
              <Text style={styles.buttonText}>문장 목록으로</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
  // 퀴즈 화면
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.questionBox}>
          <Text style={styles.questionLabel}>
            네모를 눌러서 문장을 완성해보세요.
          </Text>
          <Text style={styles.questionLabel}>
            사용방법을 모를 경우 ?를 눌러보세요
          </Text>

          <Text
            style={[styles.korean, visible && step === 1 && styles.highlight]}
          >
            {data.korean}
          </Text>
        </View>
        {/* 선택한 블록 */}
        <View style={styles.selectedArea}>
          <Text style={styles.areaLabel}>내 문장</Text>
          <View
            style={[styles.blockRow, visible && step === 3 && styles.highlight]}
          >
            {selected.length === 0 ? (
              <Text style={styles.placeholder}>
                네모를 눌러 문장을 만들어보세요
              </Text>
            ) : (
              selected.map((block, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.selectedBlock}
                  onPress={() => handleDeselect(block, idx)}
                >
                  <Text style={styles.blockText}>{block}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
        {/* 섞인 블록 (보기) */}
        <View style={styles.choiceArea}>
          <Text style={styles.areaLabel}>단어 박스</Text>
          <View
            style={[styles.blockRow, visible && step === 2 && styles.highlight]}
          >
            {shuffledBlocks.map((block, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.choiceBlock}
                onPress={() => handleSelect(block, idx)}
              >
                <Text style={styles.blockText}>{block}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* 툴팁 */}
      <TouchableOpacity style={styles.helpButton} onPress={restart}>
        <Text style={styles.helpText}>?</Text>
      </TouchableOpacity>
      {visible && step === 1 && (
        <Tooltip
          message="영어로 만들 한국어 문장입니다."
          bubbleStyle={{
            right: undefined,
            left: 30,
            top: 0,
          }}
          onPress={next}
        />
      )}
      {visible && step === 2 && (
        <Tooltip
          message="흰색 네모를 순서대로 눌러서 문장을 완성해보세요."
          bubbleStyle={{
            right: undefined,
            left: 40,
            bottom: -60,
          }}
          direction="top"
          onPress={next}
        />
      )}
      {visible && step === 3 && (
        <Tooltip
          message="흰색 네모를 선택 후 여기에 들어간 단어 조각을 다시 누르면 되돌릴 수 있어요."
          bubbleStyle={{
            left: 50,
            top: undefined,
            bottom: 120,
          }}
          direction="top"
          onPress={next}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
  questionBox: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 10,
  },
  questionLabel: {
    fontSize: 16,
    color: "#333",
  },
  korean: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  selectedArea: {
    width: "100%",
    minHeight: 100,
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
    fontSize: 16,
    color: "#aaa",
    alignSelf: "center",
  },
  selectedBlock: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  choiceBlock: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  blockText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  resultEmoji: {
    fontSize: 80,
  },
  resultWrap: {
    flex: 1,
    textAlign: "left",
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
  },
  resultSubTit: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
  },
  answerBox: {
    width: "100%",
    backgroundColor: "#333",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 10,
    marginTop: -50,
  },
  answerLabel: {
    fontSize: 16,
    color: "#888",
  },
  answerEnglish: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  answerKorean: {
    fontSize: 18,
    color: "#555",
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
  highlight: {
    borderWidth: 5,
    borderColor: "#FFD700",
    borderStyle: "solid",
  },
  helpButton: {
    position: "absolute",
    bottom: -20,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5A623",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 997,
  },
  helpText: {
    color: "#333",
    fontSize: 22,
    fontWeight: "bold",
  },
});
