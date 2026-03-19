import { useFontSize } from "@/context/FontSizeContext";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { fontSizeOffset } = useFontSize();
  const openKakao = () => {
    Linking.openURL("https://open.kakao.com/o/sBRT26Zh");
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>영어 공부</Text> */}
      {/* <ZoomButton /> */}

      <View style={styles.mainTop}>
        <Text style={[styles.title, { fontSize: 32 + fontSizeOffset }]}>
          영어공부
        </Text>
        <Text style={styles.subTit}>
          기초부터 간단한 문장까지 공부할 수 있어요.
        </Text>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push("/alphabet")}
        >
          {/* <Text style={styles.menuEmoji}>🔤</Text>
        <Text style={styles.menuText}>알파벳</Text> */}

          <ImageBackground
            source={require("@/assets/images/bg_word.png")}
            style={styles.menuButton}
            imageStyle={styles.menuButtonImage}
          >
            <Text style={styles.menuText}>알파벳</Text>
            <Text style={styles.menuSubText}>기초부터</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => router.push("/sentence")}
        >
          {/* <Text style={styles.menuEmoji}>📝</Text> */}
          <ImageBackground
            source={require("@/assets/images/bg_word.png")}
            style={styles.menuButton}
            imageStyle={styles.menuButtonImage}
          >
            <Text style={styles.menuText}>문장 만들기</Text>
            <Text style={styles.menuSubText}>문장을 만들어보세요</Text>{" "}
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={openKakao}>
        {/* <Image
            source={require('@/assets/images/kakao_icon.png')}
            style={styles.kakaoIcon}
          /> */}
        <Text style={styles.btnToKatalk}>딸램한테 연락하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 24,
  },
  mainTop: {
    backgroundColor: C.brand.primary,
    minWidth: 240,
    height: 360,
    marginTop: 0,
    marginBottom: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 160,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 20,
        spreadDistance: 0,
        color: "#F5A623",
      },
    ],
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1.6,
  },
  subTit: {
    fontSize: 16,
    color: "#fff",
    textAlign: "left",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "row",
    gap: 20,
  },
  menuButton: {
    width: 150,
    height: 150,
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#1A3A5C",
    boxShadow: [
      {
        offsetX: 1,
        offsetY: 3,
        blurRadius: 2,
        spreadDistance: 0,
        color: "#1A3A5C",
      },
    ],
  },
  menuEmoji: {
    fontSize: 40,
  },
  menuText: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 30,
    textAlign: "left",
    paddingLeft: 16,
    letterSpacing: 2,
  },
  menuSubText: {
    fontSize: 16,
    marginTop: 4,
    paddingLeft: 16,
  },
  menuButtonImage: {
    borderRadius: 16,
    resizeMode: "cover",
    width: 160,
    height: 160,
  },
  btnToKatalk: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
