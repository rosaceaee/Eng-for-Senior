import { createContext, useContext, useState } from "react";

type FontSizeContextType = {
  fontSizeOffset: number;
  increaseFontSize: () => void;
  resetFontSize: () => void;
};

const FontSizeContext = createContext<FontSizeContextType>({
  fontSizeOffset: 0,
  increaseFontSize: () => {},
  resetFontSize: () => {},
});

export const FontSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  const increaseFontSize = () => {
    setFontSizeOffset((prev) => (prev >= 4 ? 0 : prev + 2)); // 최대 4px까지 글자 확대, 그 이상이면 리셋처리
  };

  const resetFontSize = () => setFontSizeOffset(0);

  return (
    <FontSizeContext.Provider
      value={{ fontSizeOffset, increaseFontSize, resetFontSize }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
