import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSettingStore } from "../store/settingStore";
import { scale } from "./utills/scale";

export default function SettingsScreen() {
  const {
    fontSizeOffset,
    increaseFontSize,
    resetFontSize,
    ttsRate,
    setTtsRate,
  } = useSettingStore();

  return (
    <View style={styles.container}>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#333",
          paddingBottom: 8,
        }}
      >
        {/* <Text style={styles.title}>설정</Text> */}

        <Text
          style={[
            styles.subTitle,
            { marginTop: 10, marginBottom: 0, fontSize: scale(16) },
          ]}
        >
          글자 크기와 발음 속도를 조절할 수 있어요.
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 4,
            fontSize: scale(16),
            fontWeight: "bold",
          }}
        >
          원하는 글자 크기와 발음 속도를 선택하고 이전 화면으로 돌아가면 설정이
          저장돼요.
        </Text>
      </View>

      {/* 글자 크기 */}
      <View style={styles.section}>
        <Text style={styles.label}>
          1. 글자 크기 ( {fontSizeOffset / 2} 단계, 최대 3단계까지)
        </Text>

        <View style={styles.sampleTxtWrap}>
          <Text
            style={[
              styles.sampleLetter,
              {
                fontSize: 16 + fontSizeOffset,
                color: "#555",
                marginVertical: scale(10),
              },
            ]}
          >
            글자 크기가 이렇게 보일거예요.
          </Text>
        </View>
        {/* <Text
          style={{
            fontSize: 16 + fontSizeOffset,
            color: "#555",
            marginVertical: scale(10),
            marginBottom: scale(20),
          }}
        >
          글자 크기가 이렇게 보일거예요.
        </Text> */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#1565C0" }]}
            onPress={increaseFontSize}
          >
            <View style={{ backgroundColor: "#1565C0" }}>
              <Text
                style={
                  (styles.btnText,
                  { color: "#fff", fontWeight: "bold", fontSize: scale(16) })
                }
              >
                + 글자 크게
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={resetFontSize}>
            <View>
              <Text style={styles.btnText}>초기화</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.subTitWrap}>
          <Text style={styles.subTitle}>
            1. 글자 크기를 조절하면 화면 전체의 글자 크기가 변경됩니다.
          </Text>
          <Text style={styles.subTitle}>
            2. 글자 크기는 최대 3단계까지 키울 수 있어요.
          </Text>
        </View>
      </View>

      {/* TTS 음성 속도 */}
      <View style={styles.section}>
        <Text style={styles.label}>2. 영어 발음 속도</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.btn, ttsRate === 0.6 && styles.btnActive]}
            onPress={() => setTtsRate(0.6)}
          >
            <Text
              style={ttsRate === 0.6 ? styles.btnTextActive : styles.btnTextNo}
            >
              느리게
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, ttsRate === 0.8 && styles.btnActive]}
            onPress={() => setTtsRate(0.8)}
          >
            <Text
              style={ttsRate === 0.8 ? styles.btnTextActive : styles.btnTextNo}
            >
              보통
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, ttsRate === 1.0 && styles.btnActive]}
            onPress={() => setTtsRate(1.0)}
          >
            <Text
              style={ttsRate === 1.0 ? styles.btnTextActive : styles.btnTextNo}
            >
              빠르게
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 24,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    borderBottomColor: "#333",
  },
  subTitWrap: {
    gap: 4,
  },
  subTitle: {
    fontSize: 14,
    color: "#555",
    marginTop: scale(4),
  },
  section: {
    gap: scale(5),
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
  },
  sampleTxtWrap: {
    backgroundColor: C.bg.fff,
    textAlign: "center",
    padding: scale(10),
    marginTop: scale(10),
  },
  sampleLetter: {
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: scale(10),
    marginBottom: scale(10),
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    // borderColor: C.default.loyalblue,
    borderWidth: 1,
    backgroundColor: C.mono.gray200,
  },
  btnBefore: {
    backgroundColor: C.mono.gray200,
    color: C.text.ooo,
  },
  btnActive: {
    backgroundColor: "#1565C0",
    color: C.text.fff,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  btnTextNo: {
    fontSize: 16,
    fontWeight: "600",
    color: C.mono.gray900,
  },
  btnTextActive: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
