import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

import {
  Animated,
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "./utils/scale";

// 타임 체크
type TimeSlot = "morning" | "day" | "night";

const getTimeSlot = (): TimeSlot => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour <= 10) return "morning";
  if (hour >= 11 && hour <= 18) return "day";
  return "night";
};

const timeConfig = {
  morning: {
    innerWrapColor: "#687A5F",
    image: require("@/assets/images/sunHalf.png"),
    iconTranslateY: 10,
  },
  day: {
    innerWrapColor: "#E7C9CD",
    image: require("@/assets/images/sun.png"),
    iconTranslateY: -60,
  },
  night: {
    innerWrapColor: "#1A3A5C",
    image: require("@/assets/images/moon.png"),
    iconTranslateY: -60,
  },
};
//

export default function HomeScreen() {
  const router = useRouter();
  // const { fontSizeOffset } = useFontSize();

  const openTel = () => {
    const tel =
      // Constants.expoConfig?.extra?.contactTel ??
      process.env.EXPO_PUBLIC_CONTACT_TEL;
    Linking.openURL(`tel:${tel}`);
  };

  const timeSlot = getTimeSlot();
  const config = timeConfig[timeSlot];

  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: config.iconTranslateY,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[styles.innerWrap, { backgroundColor: config.innerWrapColor }]}
      >
        <View style={styles.iconArea}>
          <Animated.Image
            source={config.image}
            style={[
              styles.iconImg,
              {
                opacity,
                transform: [{ translateY }],
              },
            ]}
          />
        </View>

        <View style={styles.titWrap}>
          <Text style={styles.title}>영어공부</Text>
          <Text style={styles.subTit}>
            기초부터 간단한 문장까지 공부할 수 있어요.
          </Text>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => router.push("/alphabet")}>
              <ImageBackground
                source={require("@/assets/images/Letter.png")}
                style={styles.menuButton}
                imageStyle={styles.menuButtonImage}
              >
                <Text style={styles.menuText}>알파벳</Text>
                <Text style={styles.menuSubText}>기초부터</Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/sentence")}>
              <ImageBackground
                source={require("@/assets/images/docu.png")}
                style={styles.menuButton}
                imageStyle={styles.menuButtonImage}
              >
                <Text
                  style={styles.menuText}
                  // style={[
                  //   styles.menuText,
                  //   { textAlign: "right", width: "100%", paddingRight: 20 },
                  // ]}
                >
                  문장 연습
                </Text>
                <Text style={styles.menuSubText}>문장을 만들어보세요</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity onPress={openTel}>
            <View style={styles.btmWrap}>
              <Image
                source={require("@/assets/images/phone.png")}
                style={styles.telIcn}
              />
              <Text style={{ textAlign: "center" }}>물어보기</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
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
    backgroundColor: C.default.loyalblue,
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
        color: C.bg.gaenari,
      },
    ],
  },
  titWrap: {
    marginTop: 10,
    marginBottom: 50,
    borderWidth: 3,
    borderColor: C.default.yl,
    borderStyle: "solid",
    borderTopRightRadius: 160,
    borderTopLeftRadius: 160,
    width: "100%",
    height: "80%",
    paddingVertical: 50,
    backgroundColor: C.bg.fff,
  },
  innerWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: C.mono.sansansan,
    height: "100%",
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: C.default.yl,
    borderStyle: "solid",
    paddingTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconArea: {
    height: 190,
  },
  iconImg: {
    width: 100,
    height: 100,
    marginTop: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    color: C.mono.sansansan,
    textAlign: "center",
    letterSpacing: 1.6,
  },
  subTit: {
    fontSize: 16,
    color: C.mono.sansansan,
    textAlign: "center",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    marginTop: 60,
  },
  menuButtonAlpha: {
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: C.bg.fff,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: C.text.primary,
    boxShadow: [
      {
        offsetX: 1,
        offsetY: 3,
        blurRadius: 2,
        spreadDistance: 0,
        color: C.text.primary,
      },
    ],
  },
  menuButton: {
    // width: 140,
    // height: 150,
    width: scale(130),
    height: scale(160),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: C.default.navy,
    boxShadow: [
      {
        offsetX: 1,
        offsetY: 3,
        blurRadius: 2,
        spreadDistance: 0,
        color: C.default.navy,
      },
    ],
  },
  menuButtonRight: {
    textAlign: "center",
  },
  menuEmoji: {
    fontSize: 40,
  },
  menuText: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginTop: 60,
    textAlign: "center",
    letterSpacing: 0.6,
    paddingTop: 10,
  },
  menuSubText: {
    fontSize: scale(13),
    marginTop: 4,
  },
  menuButtonImage: {
    borderRadius: 16,
    top: 10,
    left: "auto",
    right: "auto",
    width: 60,
    height: 60,
  },
  menuButtonImageDocu: {
    top: 10,
    left: "auto",
    right: "auto",
    width: 60,
    height: 60,
  },
  telIcn: {
    width: 20,
    height: 20,
  },
  btmWrap: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    paddingVertical: 20,
    marginTop: 60,
  },
});
