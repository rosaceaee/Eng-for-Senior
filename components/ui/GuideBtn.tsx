import { scale } from "@/app/utils/scale";
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

import ZoomButton from "../ZoomButton";

type Props = {
  onPress?: () => void;
};
export default function GuideBtn({ onPress }: Props) {
  const router = useRouter();

  return (
    <>
      {" "}
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
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginRight: scale(16),
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  helpButton: {
    position: "absolute",
    top: 10,
    right: 90,
    width: scale(35),
    height: scale(35),
    borderRadius: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 997,
    borderWidth: 2,
    borderColor: "#fff",
    borderStyle: "solid",
  },
  helpText: {
    color: "#333",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
