import Tooltip from "@/components/Tooltip";
import { useFontSize } from "@/context/FontSizeContext";
import alphabetData from "@/data/alphabetData.json";
import { useTutorial } from "@/hooks/useTutorial";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ZoomButton from "@/components/ZoomButton";
import { scale } from "../utils/scale";

export default function AlphabetDetail() {
  const { letter } = useLocalSearchParams<{ letter: string }>();
  const { step, visible, next, restart } = useTutorial("alphabetDetail", 2);
  const { fontSizeOffset } = useFontSize();

  const router = useRouter();

  const data = alphabetData.find((item) => item.letter === letter);

  const speak = (word: string) => {
    Speech.speak(word, { language: "en-US", rate: 0.8 });
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>잠시 문제가 발생했어요! 연락해주세요.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 도움말 버튼 */}

      <TouchableOpacity style={styles.helpButton} onPress={restart}>
        {/* <Text style={styles.helpText}>?</Text> */}
        <Image
          source={require("@/assets/images/question.png")}
          style={styles.questionBtn}
        />
      </TouchableOpacity>
      <View
        style={[styles.zoomBtnWrap, visible && step === 3 && styles.highlight]}
      >
        <ZoomButton />
        <Text style={styles.zoomTxt}>글자 확대</Text>
      </View>

      <Text style={styles.letter}>{letter}</Text>
      <View style={styles.wordList}>
        {data.words.map((word) => (
          <View key={word.english} style={styles.wordCard}>
            <Text style={styles.emoji}>{word.emoji}</Text>
            <View style={styles.wordInfo}>
              <Text style={[styles.english, { fontSize: 24 + fontSizeOffset }]}>
                {word.english}
              </Text>
              <Text style={[styles.korean, { fontSize: 20 + fontSizeOffset }]}>
                {word.korean}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.speakButton,
                visible && step === 1 && styles.highlight,
              ]}
              onPress={() => speak(word.english)}
            >
              {/* <Text style={styles.speakIcon}>🔊</Text> */}
              <Image
                source={require("@/assets/images/speaker.png")}
                style={styles.speakBtn}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.quizButton, visible && step === 2 && styles.highlight]}
        onPress={() => router.replace(`/alphabet/quiz/${letter}`)}
      >
        <Text style={styles.quizButtonText}>퀴즈 풀기 →</Text>
      </TouchableOpacity>
      {/* 툴팁 */}
      {visible && step === 1 && (
        <Tooltip
          message="노란 테두리의 확성기 버튼을 눌러 발음을 들어보세요"
          // direction="bottom"
          bubbleStyle={{
            left: "auto",
            top: 100,
            right: 30,
          }}
          onPress={next}
        />
      )}
      {visible && step === 2 && (
        <Tooltip
          message="단어 공부를 다 했다면 퀴즈 풀기 버튼을 눌러 문제를 풀어보세요"
          bubbleStyle={{
            right: undefined,
            left: 70,
            bottom: 150,
          }}
          isLast={true}
          // isLast={step === maxStep}
          onPress={next}
        />
      )}
      {/* {visible && step === 3 && (
        <Tooltip
          message="누르면 글자를 크게 볼 수 있어요."
          bubbleStyle={{
            top: 0,
            left: 40,
            right: undefined,
          }}
          onPress={next}
        />
      )} */}
    </ScrollView>
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
  zoomBtnWrap: {
    position: "absolute",
    top: 0,
    right: 20,
    alignItems: "center",
    width: scale(40),
    height: scale(30),
  },
  zoomTxt: {
    fontSize: scale(14),
    alignItems: "center",
    fontWeight: 600,
    paddingTop: 10,
    marginBottom: 20,
    width: scale(35),
    height: scale(50),
  },
  letter: {
    fontSize: scale(45),
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  wordList: {
    width: "100%",
    gap: scale(10),
  },
  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: scale(14),
    gap: scale(20),
    borderWidth: 1,
    borderColor: C.brand.primary,
  },
  emoji: {
    fontSize: scale(35),
  },
  wordInfo: {
    flex: 1,
    gap: 4,
  },
  english: {
    fontSize: scale(20),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  korean: {
    fontSize: scale(18),
    color: "#555",
  },
  speakButton: {
    width: scale(45),
    height: scale(45),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 28,
    borderWidth: 2,
    borderColor: C.brand.primary,
  },
  speakIcon: {
    fontSize: 28,
  },
  speakBtn: {
    width: scale(20),
    height: scale(20),
  },
  questionBtn: {
    width: 40,
    height: 40,
  },
  quizButton: {
    width: "100%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 16,
    marginTop: 8,
  },
  quizButtonText: {
    fontSize: 22,
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
    top: 10,
    right: 90,
    width: scale(35),
    height: scale(35),
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
    fontSize: scale(16),
    fontWeight: "bold",
  },
  test: {
    color: C.brand.primary,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
