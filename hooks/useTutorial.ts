import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export const useTutorial = (key: string, maxStep: number = 2) => {
  const [step, setStep] = useState<number | null>(null); // null = 로딩중
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = async () => {
      const done = await AsyncStorage.getItem(`tutorial_${key}`);
      if (!done) {
        setStep(1);
        setVisible(true);
      } else {
        setStep(0);
        setVisible(false);
      }
    };
    check();
  }, [key]);

  // const next = async () => {
  //   if (step === 1) {
  //     setStep(2);
  //   } else if (step === 2) {
  //     setStep(0);
  //     setVisible(false);
  //     await AsyncStorage.setItem(`tutorial_${key}`, "done");
  //   }
  // };
  const next = async () => {
    if (step === null) return; // null일때 암것도 안함

    if (step < maxStep) {
      setStep((s) => (s ?? 0) + 1);
    } else {
      setStep(0);
      setVisible(false);
      await AsyncStorage.setItem(`tutorial_${key}`, "done");
    }
  };

  // const restart = () => {
  //   setStep(1);
  //   setVisible(true);
  // };

  // ui 구조 변경으로 수정: 렌더링 될 때마다 새로운 참조를 가질 수 있으니 useCallback으로 상태 감쌌음
  const restart = useCallback(() => {
    setStep(1);
    setVisible(true);
  }, []);

  return { step, visible, next, restart };
};
