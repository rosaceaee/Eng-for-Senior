import ZoomButton from "@/components/ZoomButton";
import { useFontSize } from "@/context/FontSizeContext";
import { useRouter } from "expo-router";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { fontSizeOffset } = useFontSize();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>영어 공부</Text> */}
      <Text style={[styles.title, { fontSize: 32 + fontSizeOffset }]}>
        {" "}
        영어공부1
      </Text>

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
          <Text style={styles.menuEmoji}>📝</Text>
          <Text style={styles.menuText}>문장 만들기</Text>
          <Text style={styles.menuSubText}>문장을 만들어보세요</Text>
        </TouchableOpacity>

        <ZoomButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "stretch",
    flexDirection: "row",
    gap: 20,
  },
  menuButton: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "red",
  },
  menuEmoji: {
    fontSize: 40,
  },
  menuText: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "left",
  },
  menuSubText: {
    fontSize: 16,
    marginTop: 8,
  },
  menuButtonImage: {
    borderRadius: 16,
    resizeMode: "cover",
    width: 160,
    height: 160,
  },
});
