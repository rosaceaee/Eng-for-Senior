import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useTutorial = (key: string) => {
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

  const next = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(0);
      setVisible(false);
      await AsyncStorage.setItem(`tutorial_${key}`, "done");
    }
  };

  const restart = () => {
    setStep(1);
    setVisible(true);
  };

  return { step, visible, next, restart };
};
