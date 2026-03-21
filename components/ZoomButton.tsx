import { useFontSize } from "@/context/FontSizeContext";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ZoomButton() {
  const { increaseFontSize } = useFontSize();

  return (
    <TouchableOpacity style={styles.button} onPress={increaseFontSize}>
      <Image
        source={require("@/assets/images/zoominbtn.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 28,
    // backgroundColor: Colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 996,
  },
  icon: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
});
