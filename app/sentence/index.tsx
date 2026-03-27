import WrongNoteBtn from "@/components/ui/WrongNoteBtn";
import sentenceData from "@/data/sentenceData.json";
import { useSentenceProgress } from "@/hooks/useProgress";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "../utills/scale";

export default function SentenceScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { progress, reload } = useSentenceProgress();
  const [selectedLevel, setSelectedLevel] = useState<"기초" | "실전">("기초");

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <WrongNoteBtn />,
    });
  }, []);

  // 화면 돌아올 때마다 진도 새로고침
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );
  //

  //
  const filtered = sentenceData.filter((item) => item.level === selectedLevel);
  //

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>공부할 문장을 선택하세요.</Text>
      {/* 난이도 탭 */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, selectedLevel === "기초" && styles.tabActive]}
          onPress={() => setSelectedLevel("기초")}
        >
          <Text style={styles.tabTxt}>기초</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedLevel === "실전" && styles.tabActive]}
          onPress={() => setSelectedLevel("실전")}
        >
          <Text style={styles.tabTxt}>실전</Text>
        </TouchableOpacity>
      </View>
      {/* // */}

      <View style={styles.list}>
        {filtered.map((item) => {
          const isDone = progress[item.id]?.done;

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.sentenceCard}
              onPress={() => router.replace(`/sentence/quiz/${item.id}`)}
            >
              {/* 완료 체크 */}
              {isDone && (
                <Image
                  source={require("@/assets/images/checkedGrn.png")}
                  style={styles.checkedImg}
                />
              )}
              {/* // */}
              <View style={styles.cardContent}>
                <Text style={styles.korean}>{item.korean}</Text>
                <Text style={styles.english}>{item.english}</Text>
              </View>
              <View style={styles.arrowCircle}>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: scale(24),
    paddingHorizontal: scale(24),
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 10,
  },
  list: {
    width: "100%",
    gap: 14,
  },
  sentenceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.default.loyalblue,
    borderColor: C.mono.ooo,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  cardContent: {
    flex: 1,
    gap: 0,
  },
  korean: {
    fontSize: 20,
    fontWeight: "600",
    color: C.text.fff,
    letterSpacing: 0.8,
  },
  english: {
    fontSize: 16,
    color: C.text.lg,
    letterSpacing: 0.8,
  },
  arrowCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: C.text.fff,
    borderWidth: 3,
    borderStyle: "solid",
    backgroundColor: C.bg.gaenari,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    fontSize: 22,
    fontWeight: 700,
    color: C.text.fff,
  },
  checkedImg: {
    position: "absolute",
    top: -10,
    left: 17,
    width: 30,
    height: 30,
    resizeMode: "contain",
    zIndex: 1,
  },
  tabRow: {
    // backgroundColor: C.bg.fff,
    // borderColor: C.mono.ooo,
    // borderWidth: 2,
    // borderStyle: "solid",
    // borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    gap: scale(20),
    padding: scale(10),
  },
  tab: {
    backgroundColor: C.mono.ooo,
    fontSize: scale(26),
    padding: scale(10),
    borderRadius: scale(10),
  },
  tabTxt: {
    fontSize: scale(20),
    padding: scale(5),
    color: C.text.fff,
  },
  tabActive: {
    backgroundColor: C.default.loyalblue,
    color: C.text.fff,
    borderColor: C.default.gaenari,
    borderWidth: 3,
  },
});
