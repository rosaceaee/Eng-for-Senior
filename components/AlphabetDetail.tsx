import { useAlphabetData } from "@/hooks/useAlphabetData";
import { useTutorial } from "@/hooks/useTutorial";
import * as Speech from "expo-speech";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  letter: string;
};

export default function AlphabetDetail({ letter }: Props) {
  const { data: alphabetData, loading } = useAlphabetData();
  const data = alphabetData.find((item) => item.letter === letter);
  // if (data) {
  //   Alert.alert("words 수", `${data.words.length}개`);
  // }
  const { step, visible, next, restart } = useTutorial("alphabetDetail", 2);
  const speak = (word: string) => {
    Speech.speak(word, { language: "en-US", rate: 0.8 });
  };

  if (loading) return <Text>잠시만 기다려주세요</Text>;
  if (!data) return null;

  // const { fontSizeOffset } = useSettingStore();

  // const [tooltipPosition, setTooltipPosition] = useState<
  //   Record<number, { x: number; y: number }>
  // >({});

  return (
    <View style={styles.container}>
      {data.words.map((word, idx) => (
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
            <Image
              source={require("@/assets/images/speaker.png")}
              style={styles.answerSpeaker}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    marginHorizontal: 16,
  },
  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.bg.fff,
    borderRadius: 16,
    padding: 16,
    gap: 16,
    width: "100%",
    borderColor: C.default.lb,
    borderWidth: 2,
  },
  emoji: {
    fontSize: 24,
  },
  wordInfo: {
    flex: 1,
    gap: 4,
  },
  english: {
    fontSize: 22,
    fontWeight: "bold",
  },
  korean: {
    fontSize: 18,
    color: C.text.ooo,
  },
  speakButton: {
    width: 40,
    height: 40,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.bg.fff,
    borderColor: C.default.lb,
    borderWidth: 2,
    borderRadius: 24,
  },
  speakIcon: {
    fontSize: 24,
  },
  quizButton: {
    width: "50%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.blue.lb,
    borderRadius: 16,
    marginTop: 8,
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: C.text.fff,
  },
  highlight: {
    borderWidth: 5,
    borderColor: C.default.yl,
    borderStyle: "solid",
  },
  rightContainer: {
    alignItems: "center",
    // paddingVertical: 32,
    paddingHorizontal: 5,
    gap: 10,
    paddingBottom: 0,
    width: "100%",
    flex: 1,
  },
  answerSpeaker: {
    width: 24,
    height: 24,
  },
});
