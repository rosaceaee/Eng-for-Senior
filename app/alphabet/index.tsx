import { useAlphabetProgress } from "@/hooks/useProgress";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "../utills/scale";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetScreen() {
  const router = useRouter();
  const { progress } = useAlphabetProgress();
  const { letter } = useLocalSearchParams<{ letter: string }>();

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
    justifyContent: "center",
    gap: 30,
    padding: 20,
  },
  letterButton: {
    width: scale(55),
    height: scale(55),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: C.default.loyalblue,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: C.default.gaenari,
  },
  letterText: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: C.text.fff,
  },
  doneText: {
    fontSize: 12,
    color: C.default.lb,
    fontWeight: "600",
  },
});
