import { useFontSize } from "@/context/FontSizeContext";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ZoomButton() {
  const { increaseFontSize } = useFontSize();

  return (
    <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    // backgroundColor: Colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});
