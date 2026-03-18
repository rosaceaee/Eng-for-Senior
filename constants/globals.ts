import { Colors } from "@/constants/colors";

declare global {
  const C: typeof Colors;
}

(globalThis as any).C = Colors;
