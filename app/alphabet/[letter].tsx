import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Tooltip from "@/components/Tooltip";
import GuideBtn from "@/components/ui/GuideBtn";

// import { useFontSize } from "@/context/FontSizeContext";

// import alphabetData from "@/data/alphabetData.json";
import { useAlphabetData } from "@/hooks/useAlphabetData";
import { useTutorial } from "@/hooks/useTutorial";
import { useSettingStore } from "@/store/settingStore";

import { scale } from "../utills/scale";
const { width, height } = Dimensions.get("window");

export default function AlphabetDetail() {
  const { letter } = useLocalSearchParams<{ letter: string }>();
  const { step, visible, next, restart } = useTutorial("alphabetDetail", 2);
  // const { fontSizeOffset } = useFontSize();
  const { fontSizeOffset } = useSettingStore();
  const { data: alphabetData, loading } = useAlphabetData();

  const [tooltipPosition, setTooltipPosition] = useState<
    Record<number, { x: number; y: number }>
  >({});

  // const [targetY, setTargetY] = useState(0);
  // const [tooltipPosition, setTooltipPosition] = useState(
  //   [{
  //     positionY: 0,
  //     positionX: 0
  //     }
  //   ]
  // );

  const router = useRouter();
  const navigation = useNavigation();

  const data = alphabetData.find((item) => item.letter === letter);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <GuideBtn onPress={restart} />,
    });
  }, [restart]);

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
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.letter}>{letter}</Text>
        <View style={styles.wordList}>
          {data.words.map((word) => (
            <View key={word.english} style={styles.wordCard}>
              <Text style={styles.emoji}>{word.emoji}</Text>
              <View style={styles.wordInfo}>
                <Text
                  style={[styles.english, { fontSize: 24 + fontSizeOffset }]}
                >
                  {word.english}
                </Text>
                <Text
                  style={[styles.korean, { fontSize: 20 + fontSizeOffset }]}
                >
                  {word.korean}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.speakButton,
                  visible && step === 1 && styles.highlight,
                ]}
                onLayout={(e) => {
                  const { x, y } = e.nativeEvent.layout;
                  setTooltipPosition((prev) => ({ ...prev, 1: { x, y } }));
                }}
                onPress={() => speak(word.english)}
              >
                {/* <Text style={styles.speakIcon}>🔊</Text> */}
                <Image
                  source={require("@/assets/images/speaker.png")}
                  style={styles.speakBtn}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* 하단 버튼 */}
      <View
        style={[styles.quizBtnWrap, visible && step == 2 && styles.highlight]}
      >
        <TouchableOpacity
          style={styles.quizButton}
          onLayout={(e) => {
            const { x, y } = e.nativeEvent.layout;
            setTooltipPosition((prev) => ({ ...prev, 2: { x, y } }));
          }}
          onPress={() => router.replace(`/alphabet/quiz/${letter}`)}
        >
          <View>
            <Text style={styles.quizButtonText}>단어 퀴즈 풀기</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onLayout={(e) => {
            const { x, y } = e.nativeEvent.layout;
            setTooltipPosition((prev) => ({ ...prev, 2: { x, y } }));
          }}
          onPress={() => router.replace(`/alphabet/spellingQuiz/${letter}`)}
        >
          <View>
            <Text style={styles.quizButtonText}>단어 완성하기</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 툴팁 */}
      {visible && step === 1 && (
        <Tooltip
          message="노란 테두리의 확성기 버튼을 눌러 발음을 들어보세요"
          // direction="bottom"
          // bubbleStyle={{
          //   left: "auto",
          //   top: 100,
          //   right: 30,
          // }}
          // bubbleStyle={{ top: targetY - 430 }}
          bubbleStyle={{
            top: (tooltipPosition[step]?.y ?? 0) + 40,
          }}
          direction="bottom"
          onPress={next}
        />
      )}
      {visible && step === 2 && (
        <Tooltip
          message="단어 공부를 다 했다면 퀴즈 풀기 버튼을 눌러 문제를 풀어보세요"
          // bubbleStyle={{
          //   right: undefined,
          //   left: 70,
          //   bottom: scale(150),
          // }}
          // bubbleStyle={{ top: targetY - 150 }}
          bubbleStyle={{
            top: (tooltipPosition[step]?.y ?? 0) + scale(330),
            left: (tooltipPosition[step]?.x ?? 0) + 0,
          }}
          isLast={true}
          // isLast={step === maxStep}
          onPress={next}
        />
      )}
      {/* {visible && step === 3 && (
        <Tooltip
          message="누르면 글자를 크게 볼 수 있어요."
          bubbleStyle={{
            top: 0,
            left: 40,
            right: undefined,
          }}
          onPress={next}
        />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 20,
    paddingBottom: scale(220),
  },
  zoomBtnWrap: {
    position: "absolute",
    top: 0,
    right: 20,
    alignItems: "center",
    width: scale(40),
    height: scale(30),
  },
  zoomTxt: {
    fontSize: scale(14),
    alignItems: "center",
    fontWeight: 600,
    paddingTop: 10,
    marginBottom: 20,
    width: scale(35),
    height: scale(50),
  },
  letter: {
    fontSize: scale(45),
    fontWeight: "bold",
    marginBottom: scale(20),
  },
  wordList: {
    width: "100%",
    gap: scale(10),
  },
  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.bg.fff,
    borderRadius: 16,
    padding: scale(14),
    gap: scale(20),
    borderWidth: 1,
    borderColor: C.default.loyalblue,
  },
  emoji: {
    fontSize: scale(35),
  },
  wordInfo: {
    flex: 1,
    gap: 4,
  },
  english: {
    fontSize: scale(20),
    fontWeight: "bold",
    letterSpacing: 1,
  },
  korean: {
    fontSize: scale(18),
    color: C.text.ooo,
  },
  speakButton: {
    width: scale(45),
    height: scale(45),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.bg.fff,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: C.default.loyalblue,
  },
  speakIcon: {
    fontSize: 28,
  },
  speakBtn: {
    width: scale(20),
    height: scale(20),
  },
  questionBtn: {
    width: 40,
    height: 40,
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
    fontSize: scale(18),
    fontWeight: "bold",
    color: C.text.fff,
  },
  highlight: {
    borderWidth: 5,
    borderColor: C.default.yl,
    borderStyle: "solid",
  },
  helpButton: {
    position: "absolute",
    top: 10,
    right: 90,
    width: scale(35),
    height: scale(35),
    borderRadius: 24,
    backgroundColor: C.bg.fff,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 997,
    borderWidth: 2,
    borderColor: C.default.yl,
    borderStyle: "solid",
  },
  helpText: {
    color: C.mono.sansansan,
    fontSize: scale(16),
    fontWeight: "bold",
  },
  test: {
    color: C.default.loyalblue,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  quizBtnWrap: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    gap: scale(20),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: scale(56),
    paddingTop: scale(10),
    marginBottom: 0,
    backgroundColor: C.bg.fff,
  },
});
