import { scale } from "@/app/utills/scale";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import ZoomButton from "../ZoomButton";

type Props = {
  onPress?: () => void;
};
export default function GuideBtn({ onPress }: Props) {
  const router = useRouter();

  return (
    <>
      <View style={styles.navBtnWrap}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require("@/assets/images/question.png")}
            style={styles.helpButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sentence/wrongNote")}
        >
          <ZoomButton />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navBtnWrap: {
    right: scale(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 998,
    width: scale(120),
  },
  button: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  helpButton: {
    width: scale(35),
    height: scale(35),
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#333",
    borderStyle: "solid",
  },
  helpText: {
    color: "#333",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
