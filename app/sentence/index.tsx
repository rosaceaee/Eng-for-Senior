import sentenceData from "@/data/sentenceData.json";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SentenceScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>공부할 문장을 선택하세요.</Text>
      <View style={styles.list}>
        {sentenceData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.sentenceCard}
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
  list: {
    width: "100%",
    gap: 14,
  },
  sentenceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
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
    color: "#aaa",
  },
});
