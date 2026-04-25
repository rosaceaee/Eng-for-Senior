import AlphabetDetail from "@/components/AlphabetDetail";
import { useAlphabetData } from "@/hooks/useAlphabetData";
import { useAlphabetProgress } from "@/hooks/useProgress";

import { useSettingStore } from "@/store/settingStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("A");

  const { fontSizeOffset } = useSettingStore();
  const { data: alphabetData, loading } = useAlphabetData();

  const [tooltipPosition, setTooltipPosition] = useState<
    Record<number, { x: number; y: number }>
  >({});

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   <Text style={styles.title}>알파벳을 선택하세요</Text>
    //   <View style={styles.grid}>
    //     {ALPHABETS.map((letter) => (
    //       <TouchableOpacity
    //         key={letter}
    //         style={styles.letterButton}
    //         onPress={() => router.replace(`/alphabet/${letter}`)}
    //       >
    //         <Text style={styles.letterText}>{letter}</Text>
    //         {progress[letter]?.done && (
    //           <Text style={styles.doneText}>
    //             {progress[letter].score}/{progress[letter].total}
    //           </Text>
    //         )}
    //       </TouchableOpacity>
    //     ))}
    //   </View>
    // </ScrollView>

    <View style={styles.container}>
      {/* 왼쪽 탭 */}
      <ScrollView style={styles.tabList}>
        {ALPHABETS.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[
              styles.tabItem,
              activeTab === letter && styles.tabItemActive,
            ]}
            onPress={() => setActiveTab(letter)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === letter && styles.tabTextActive,
              ]}
            >
              {letter}
            </Text>
            {progress[letter]?.done && <Text style={styles.doneText}>✓</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 오른쪽  */}
      <View style={styles.content}>
        <Text style={styles.contentLetter}>{activeTab}</Text>

        <ScrollView
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ paddingBottom: 200 }}
        >
          <AlphabetDetail letter={activeTab} />
        </ScrollView>

        <View style={styles.quizBtnWrap}>
          <TouchableOpacity
            style={styles.quizButton}
            onLayout={(e) => {
              const { x, y } = e.nativeEvent.layout;
              setTooltipPosition((prev) => ({ ...prev, 2: { x, y } }));
            }}
            onPress={() => router.replace(`/alphabet/quiz/${activeTab}`)}
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
            onPress={() =>
              router.replace(`/alphabet/spellingQuiz/${activeTab}`)
            }
          >
            <View>
              <Text style={styles.quizButtonText}>단어 완성하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tabList: {
    width: "20%",

    backgroundColor: "#1565C0",
  },
  tabItem: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  tabItemActive: {
    backgroundColor: C.bg.fff,
    borderColor: "none",
    borderRightWidth: 0,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: C.bg.fff,
  },
  tabTextActive: {
    color: C.mono.ooo,
  },
  doneText: {
    fontSize: 10,
    color: "#4CAF50",
  },
  content: {
    padding: 0,
    justifyContent: "center",

    flexGrow: 2,
    backgroundColor: "#fff",
  },
  contentLetter: {
    fontSize: scale(50),
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    paddingVertical: 10,
    paddingBottom: 20,
    paddingTop: 20,
  },
  quizButton: {
    width: "60%",
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1565C0",
    borderRadius: 14,
    marginTop: 16,
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  quizBtnWrap: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 0,
    gap: scale(0),
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
  rightContainer: {
    alignItems: "center",
    // paddingVertical: 32,
    paddingHorizontal: 5,
    gap: 10,
    paddingBottom: scale(320),
    width: "100%",
    flex: 1,
  },
});
