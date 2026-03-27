import sentenceData from "@/data/sentenceData.json";
import { useSentenceProgress } from "@/hooks/useProgress";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WrongNote() {
  const router = useRouter();
  const { progress } = useSentenceProgress();

  // 오답 목록 — 풀었지만 정답 아닌 것
  const wrongList = sentenceData.filter(
    (item) => progress[item.id]?.done && !progress[item.id]?.cleared
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>오답 노트</Text>

      {wrongList.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🎉</Text>
          <Text style={styles.emptyText}>오답이 없어요!</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {wrongList.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.wrongCard}
              onPress={() => router.push(`/sentence/quiz/${item.id}`)}
            >
              <View style={styles.cardContent}>
                <Text style={styles.korean}>{item.korean}</Text>
                <Text style={styles.english}>{item.english}</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyBox: {
    alignItems: "center",
    marginTop: 80,
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 60,
  },
  emptyText: {
    fontSize: 20,
    color: "#888",
  },
  list: {
    width: "100%",
    gap: 14,
  },
  wrongCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C62828",
    padding: 20,
    gap: 12,
  },
  cardContent: {
    flex: 1,
    gap: 6,
  },
  korean: {
    fontSize: 20,
    fontWeight: "600",
  },
  english: {
    fontSize: 16,
    color: "#888",
  },
  arrow: {
    fontSize: 22,
    color: "#C62828",
  },
});
