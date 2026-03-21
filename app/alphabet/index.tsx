import { useAlphabetProgress } from "@/hooks/useProgress";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetScreen() {
  const router = useRouter();
  const { progress } = useAlphabetProgress();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>알파벳을 선택하세요</Text>
      <View style={styles.grid}>
        {ALPHABETS.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={styles.letterButton}
            onPress={() => router.replace(`/alphabet/${letter}`)}
          >
            <Text style={styles.letterText}>{letter}</Text>
            {progress[letter]?.done && (
              <Text style={styles.doneText}>
                {progress[letter].score}/{progress[letter].total}
              </Text>
            )}
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 30,
    padding: 20,
  },
  letterButton: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: C.brand.primary,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#F5A623",
  },
  letterText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  doneText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "600",
  },
});
