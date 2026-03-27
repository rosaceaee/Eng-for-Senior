import { scale } from "@/app/utils/scale";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function WrongNoteBtn() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/sentence/wrongNote")}
    >
      <Text style={styles.text}>오답노트</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#C62828",
    marginRight: scale(16),
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
