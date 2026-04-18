import { scale } from "@/app/utills/scale";
import { Colors } from "@/constants/colors";
import * as Speech from "expo-speech";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
type Props = {
  visible: boolean;
  word: {
    english: string;
    korean: string;
    emoji: string;
    letter: string;
  } | null;
  onDismiss: () => void;
};

export default function DailyWordModal({ visible, word, onDismiss }: Props) {
  if (!word) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.header}>오늘의 단어 복습</Text>

          {/* 단어 */}
          <View style={styles.wordBox}>
            <Text style={styles.emoji}>{word.emoji}</Text>

            <View style={styles.wordBoxInner}>
              <Text style={styles.english}>{word.english}</Text>
              <Text style={styles.korean}>{word.korean}</Text>
            </View>

            {/* 음성 버튼 */}
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() =>
                Speech.speak(word.english, { language: "en-US", rate: 0.6 })
              }
            >
              <Image
                source={require("@/assets/images/speaker.png")}
                style={styles.answerSpeaker}
              />
            </TouchableOpacity>
          </View>

          {/* 하단 */}
          <TouchableOpacity onPress={onDismiss}>
            <View style={styles.closeModalBtn}>
              <Image
                source={require("@/assets/images/x_circle_red.png")}
                style={styles.icn}
              />
              <Text style={styles.skipText}>이 상자를 닫기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
    gap: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text.primary,
  },
  wordBox: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  wordBoxInner: {
    padding: 10,
    alignItems: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 56,
  },
  english: {
    fontSize: 32,
    fontWeight: "bold",
    color: C.text.primary,
  },
  korean: {
    fontSize: 22,
    color: "#555",
  },
  letter: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 4,
  },
  speakButton: {
    width: "35%",
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.bg.fff,
    borderRadius: 14,
  },
  speakText: {
    fontSize: 18,
    fontWeight: "600",
    color: C.text.hint,
  },
  skipText: {
    fontSize: 16,
    color: C.text.ooo,
  },
  answerSpeaker: {
    width: 24,
    height: 24,
  },
  icn: {
    width: 20,
    height: 20,
  },
  closeModalBtn: {
    marginTop: scale(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    // borderTopColor: C.mono.white,
    // borderLeftColor: C.mono.white,
    // borderRightColor: C.mono.white,
    // borderBottomColor: C.default.loyalblue,
    padding: 5,
  },
});
