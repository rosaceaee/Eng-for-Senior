import Tooltip from "@/components/Tooltip";
import { useFontSize } from "@/context/FontSizeContext";
import alphabetData from "@/data/alphabetData.json";
import { useTutorial } from "@/hooks/useTutorial";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ZoomButton from "@/components/ZoomButton";

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
    <View style={styles.container}>
      <ZoomButton />
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
              <Text style={styles.speakIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.quizButton, visible && step === 2 && styles.highlight]}
        onPress={() => router.push(`/alphabet/quiz/${letter}`)}
      >
        <Text style={styles.quizButtonText}>퀴즈 풀기 →</Text>
      </TouchableOpacity>

      {/*  */}

      {/* 툴팁 */}
      {visible && step === 1 && (
        <Tooltip
          message="🔊 버튼을 눌러 발음을 들어보세요"
          direction="top"
          onPress={next}
        />
      )}
      {visible && step === 2 && (
        <Tooltip
          message="퀴즈 풀기 버튼을 눌러 퀴즈를 시작해보세요"
          direction="top"
          onPress={next}
        />
      )}

      {/* 도움말 버튼 */}
      <TouchableOpacity style={styles.helpButton} onPress={restart}>
        <Text style={styles.helpText}>?</Text>
      </TouchableOpacity>
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
  letter: {
    fontSize: 80,
    fontWeight: "bold",
    marginBottom: 30,
  },
  wordList: {
    width: "100%",
    gap: 16,
  },
  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    gap: 24,
  },
  emoji: {
    fontSize: 40,
  },
  wordInfo: {
    flex: 1,
    gap: 4,
  },
  english: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  korean: {
    fontSize: 20,
    color: "#555",
  },
  speakButton: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  speakIcon: {
    fontSize: 28,
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
    bottom: 32,
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
  test: {
    color: C.brand.primary,
  },
});
