import { scale } from "@/app/utills/scale";
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
    width: scale(35),
    height: scale(35),
    borderRadius: 24,
    // backgroundColor: Colors.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 996,
  },
  icon: {
    width: scale(35),
    height: scale(35),
    resizeMode: "contain",
  },
});
