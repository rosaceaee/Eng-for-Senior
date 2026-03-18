import alphabetData from "@/data/alphabetData.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AlphabetDetail() {
  const { letter } = useLocalSearchParams<{ letter: string }>();
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
      <Text style={styles.letter}>{letter}</Text>

      <View style={styles.wordList}>
        {data.words.map((word) => (
          <View key={word.english} style={styles.wordCard}>
            <Text style={styles.emoji}>{word.emoji}</Text>
            <View style={styles.wordInfo}>
              <Text style={styles.english}>{word.english}</Text>
              <Text style={styles.korean}>{word.korean}</Text>
            </View>
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => speak(word.english)}
            >
              <Text style={styles.speakIcon}>🔊</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push(`/alphabet/quiz/${letter}`)}
      >
        <Text style={styles.quizButtonText}>퀴즈 풀기 →</Text>
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
  },
  wordList: {
    width: "100%",
    gap: 16,
  },
  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 16,
    gap: 16,
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
});
