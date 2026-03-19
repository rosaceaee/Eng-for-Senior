import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  message: string;
  onPress: () => void;
  direction?: "top" | "bottom";
  bubbleStyle?: ViewStyle;
};

export default function Tooltip({
  message,
  onPress,
  direction = "bottom",
  bubbleStyle,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.overlay}
      onPress={onPress}
      activeOpacity={1}
    >
      <View style={[styles.bubble, bubbleStyle]}>
        <Text style={styles.hint}>확인</Text>
        <Text style={styles.message}>{message}</Text>
        {direction === "bottom" && <View style={styles.tailBottom} />}
        {direction === "top" && <View style={styles.tailTop} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },
  bubble: {
    position: "absolute",
    right: 16,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 14,
    maxWidth: 220,
    minHeight: 100,
    zIndex: 999,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  hint: {
    color: "#AAAAAA",
    fontSize: 16,
    marginTop: 0,
    marginLeft: "auto",
  },
  tailBottom: {
    position: "absolute",
    bottom: -10,
    right: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#1A1A1A",
  },
  tailTop: {
    position: "absolute",
    top: -10,
    right: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#1A1A1A",
  },
});
