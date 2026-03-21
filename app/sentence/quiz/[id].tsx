import { useFontSize } from "@/context/FontSizeContext";
import sentenceData from "@/data/sentenceData.json";
import { saveSentenceProgress } from "@/hooks/useProgress";
import { useTutorial } from "@/hooks/useTutorial";
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

import Tooltip from "@/components/Tooltip";
import ZoomButton from "@/components/ZoomButton";

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

  const { fontSizeOffset } = useFontSize();

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
            <View style={styles.resultContainer}>
              <View style={styles.resultWrap}>
                <Image
                  source={require("@/assets/images/smile_g.png")}
                  style={styles.resultImg}
                />
                <View style={styles.resultTitWrap}>
                  <Text style={styles.resultTitle}>
                    정답입니다! 잘 하셨어요!
                  </Text>
                  <Text style={styles.resultTitle}>다시한번 읽어볼까요?</Text>
                </View>
              </View>

              <View style={styles.answerBox}>
                {/* <Text style={styles.hintTxt}>문장 다시보기</Text> */}
                <TouchableOpacity
                  onPress={() =>
                    Speech.speak(data.english, { language: "en-US", rate: 0.6 })
                  }
                >
                  <View style={styles.answerWrap}>
                    <Image
                      source={require("@/assets/images/speaker.png")}
                      style={styles.answerSpeaker}
                    />
                    <Text style={styles.answerEnglish}>{data.english} </Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.answerKorean}>{data.korean}</Text>
              </View>

              <TouchableOpacity style={styles.retryButton} onPress={resetQuiz}>
                <Text style={styles.retryButtonText}>다시 풀기</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => router.push("/sentence")}
                >
                  <Text style={styles.buttonText}>문장 목록으로</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => router.push("/")}
                >
                  <Text style={styles.buttonText}>처음 화면으로</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* <Text style={styles.resultEmoji}>💪</Text> */}
            <View style={styles.resultContainer}>
              <View style={styles.resultWrap}>
                <Image
                  source={require("@/assets/images/smile_eyeclosed_org.png")}
                  style={styles.resultImg}
                />
                <View style={styles.resultTitWrap}>
                  <Text style={styles.resultTitle}>아쉬워요!</Text>
                  <Text style={styles.resultSubTit}>다시 만들어볼까요?</Text>
                </View>
              </View>

              <View style={styles.answerBox}>
                {/* <Text style={styles.hintTxt}>문장 다시보기</Text> */}
                <TouchableOpacity
                  onPress={() =>
                    Speech.speak(data.english, { language: "en-US", rate: 0.6 })
                  }
                >
                  <View style={styles.answerWrap}>
                    <Image
                      source={require("@/assets/images/speaker.png")}
                      style={styles.answerSpeaker}
                    />
                    <Text style={styles.answerEnglish}>{data.english} </Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.answerKorean}>{data.korean}</Text>
              </View>

              <TouchableOpacity style={styles.retryButton} onPress={resetQuiz}>
                <Text style={styles.retryButtonText}>다시 풀기</Text>
              </TouchableOpacity>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => router.push("/sentence")}
                >
                  <Image
                    source={require("@/assets/images/listWh.png")}
                    style={styles.icn}
                  />
                  <Text style={styles.buttonText}>문장 목록으로</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.homeButton}
                  onPress={() => router.push("/")}
                >
                  <Image
                    source={require("@/assets/images/homeWh.png")}
                    style={styles.icn}
                  />
                  <Text style={styles.buttonText}>처음 화면으로</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
    );
  }

  // 퀴즈 화면
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 툴팁 */}
        <TouchableOpacity style={styles.helpButton} onPress={restart}>
          <Image
            source={require("@/assets/images/question.png")}
            style={styles.speakBtn}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.zoomBtnWrap,
            visible && step === 3 && styles.highlight,
          ]}
        >
          <ZoomButton />
          <Text style={styles.zoomTxt}>글자 확대</Text>
        </View>
        {/* // */}
        <View style={styles.questionBox}>
          <Text
            style={[styles.questionLabel, { fontSize: 17 + fontSizeOffset }]}
          >
            흰색 네모를 눌러서 문장을 완성해보세요.
          </Text>
          <Text
            style={[styles.questionLabel, { fontSize: 17 + fontSizeOffset }]}
          >
            사용방법은 주황색 동그라미를 눌러보세요.
          </Text>
        </View>
        <View style={styles.questionContent}>
          <Text
            style={[
              styles.korean,
              { fontSize: 26 + fontSizeOffset },
              visible && step === 1 && styles.highlight,
            ]}
          >
            {data.korean}
          </Text>
          {/* 선택한 블록 */}
          <View style={styles.selectedArea}>
            <Text style={styles.areaLabel}>내 문장</Text>
            <View
              style={[
                styles.blockRow,
                visible && step === 3 && styles.highlight,
              ]}
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
                    <Text
                      style={[
                        styles.blockTextSelected,
                        { fontSize: 17 + fontSizeOffset },
                      ]}
                    >
                      {block}
                    </Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
          {/* 섞인 블록 (보기) */}
          <View style={styles.choiceArea}>
            <Text style={styles.areaLabel}>단어 박스</Text>
            <View
              style={[
                styles.blockRow,
                visible && step === 2 && styles.highlight,
              ]}
            >
              {shuffledBlocks.map((block, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.choiceBlock}
                  onPress={() => handleSelect(block, idx)}
                >
                  <Text
                    style={[
                      styles.blockText,
                      { fontSize: 17 + fontSizeOffset },
                    ]}
                  >
                    {block}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {visible && step === 1 && (
        <Tooltip
          message="영어로 만들 한국어 문장입니다."
          bubbleStyle={{
            right: undefined,
            left: 30,
            top: 60,
          }}
          onPress={next}
        />
      )}
      {visible && step === 2 && (
        <Tooltip
          message="흰색 네모를 순서대로 눌러서 문장을 완성해보세요."
          bubbleStyle={{
            right: undefined,
            left: 60,
            bottom: 200,
          }}
          direction="bottom"
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
          isLast={true}
          onPress={next}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    gap: 20,
  },
  questionBox: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    gap: 5,
    marginTop: 60,
  },
  questionLabel: {
    fontSize: 18,
    color: "#333",
  },
  questionContent: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderStyle: "solid",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  korean: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 30,
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
    marginBottom: 20,
  },
  choiceArea: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    gap: 12,
    padding: 16,
  },
  areaLabel: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
    width: "100%",
  },
  blockRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    minHeight: 48,
    width: "100%",
  },
  placeholder: {
    fontSize: 16,
    color: C.text.hint,
    alignSelf: "center",
  },
  selectedBlock: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: C.text.fff,
  },
  choiceBlock: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    color: C.text.lg,
  },
  blockText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
  },
  blockTextSelected: {
    fontSize: 20,
    fontWeight: "600",
    color: C.text.fff,
  },
  resultEmoji: {
    fontSize: 80,
  },
  resultContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resultTitWrap: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  resultWrap: {
    // flex: 1,
    textAlign: "center",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginTop: -30,
  },
  resultImg: {
    width: 80,
    height: 80,
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
  hintTxt: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  answerBox: {
    width: "100%",
    backgroundColor: C.bg.main,
    borderRadius: 16,
    padding: 10,
    alignItems: "center",
    gap: 20,
    marginTop: 0,
    flex: 1,
    justifyContent: "center",
  },
  answerLabel: {
    fontSize: 16,
    color: "#888",
    textAlign: "left",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  answerWrap: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  answerSpeaker: {
    width: 30,
    height: 30,
  },
  answerEnglish: {
    fontSize: 26,
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
    width: "48%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#888",
    borderRadius: 16,
  },
  retryButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    paddingTop: 10,
  },
  highlight: {
    borderWidth: 5,
    borderColor: "#FFD700",
    borderStyle: "solid",
  },
  helpButton: {
    position: "absolute",
    // bottom: -20,
    top: 10,
    right: 85,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 997,
    borderWidth: 2,
    borderColor: "#FFD700",
    borderStyle: "solid",
  },
  helpText: {
    color: "#333",
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  speakBtn: {
    width: 40,
    height: 40,
  },
  zoomBtnWrap: {
    position: "absolute",
    top: 4,
    right: 20,
    width: 60,
    height: 75,
    alignItems: "center",
  },
  zoomTxt: {
    fontSize: 13,
    alignItems: "center",
    fontWeight: 600,
    paddingTop: 10,
    marginTop: "auto",
  },
  icn: {
    width: 20,
    height: 20,
    paddingTop: 5,
  },
});
