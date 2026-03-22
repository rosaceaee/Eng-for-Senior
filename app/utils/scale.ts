import { Dimensions } from "react-native";

// width 360px 이하인 소형 디바이스에서 UI 요소의 크기를 조절
const BASE_WIDTH = 360;
const { width } = Dimensions.get("window");

export const scale = (size: number) => (width / BASE_WIDTH) * size;
