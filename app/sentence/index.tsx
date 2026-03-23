import sentenceData from "@/data/sentenceData.json";
import { useSentenceProgress } from "@/hooks/useProgress";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SentenceScreen() {
  const router = useRouter();
  const { progress, reload } = useSentenceProgress();
  // 화면 돌아올 때마다 진도 새로고침
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>공부할 문장을 선택하세요.</Text>
      <View style={styles.list}>
        {sentenceData.map((item) => {
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
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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
});
