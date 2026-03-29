import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingStore = {
  fontSizeOffset: number;
  ttsRate: number;
  increaseFontSize: () => void;
  resetFontSize: () => void;
  setTtsRate: (rate: number) => void;
};

// 글자 크기, TTS 속도 설정 스토어
export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      fontSizeOffset: 0,
      ttsRate: 0.8,

      increaseFontSize: () =>
        set((state) => ({
          fontSizeOffset:
            state.fontSizeOffset >= 6 ? 0 : state.fontSizeOffset + 2,
        })),

      resetFontSize: () => set({ fontSizeOffset: 0 }),

      setTtsRate: (rate) => set({ ttsRate: rate }),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => AsyncStorage), // 앱 종료해도 설정 유지하기
    }
  )
);
