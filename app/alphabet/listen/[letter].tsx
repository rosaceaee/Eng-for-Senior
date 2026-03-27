import alphabetData from "@/data/alphabetData.json";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Word = { english: string; korean: string; emoji: string };

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export default function AlphabetListenQuiz() {
  const { letter } = useLocalSearchParams<{ letter: string }>();
  const router = useRouter();

  const data = alphabetData.find((item) => item.letter === letter);

  if (!data) return null;

  const words: Word[] = data.words;

  return (
    <View style={styles.container}>
      <Text style={styles.letter}>{letter}</Text>
      <Text style={styles.desc}>소리를 듣고 단어를 맞춰보세요</Text>

      {/* 듣기 버튼 */}
      <TouchableOpacity
        style={styles.listenButton}
        onPress={() => Speech.speak("apple", { language: "en-US", rate: 0.8 })}
      >
        <Text style={styles.listenIcon}>🔊</Text>
        <Text style={styles.listenText}>들어보기</Text>
      </TouchableOpacity>

      {/* 보기 */}
      <View style={styles.choiceList}>
        {words.map((word, idx) => (
          <TouchableOpacity key={idx} style={styles.choiceCard}>
            <Text style={styles.choiceEmoji}>{word.emoji}</Text>
            <Text style={styles.choiceText}>{word.english}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  desc: {
    fontSize: 18,
    color: "#555",
  },
  listenButton: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1565C0",
    borderRadius: 16,
    gap: 12,
  },
  listenIcon: {
    fontSize: 32,
  },
  listenText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
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
  choiceEmoji: {
    fontSize: 32,
  },
  choiceText: {
    fontSize: 22,
    fontWeight: "500",
  },
});
