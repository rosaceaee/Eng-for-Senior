import "@/constants/globals";
import { Stack } from "expo-router";
import { Text, TextInput } from "react-native";

// 디바이스 시스템 설정 글자 크기 무시함. (앱에서 세팅한 글자 크기로 고정)
interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;

interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;
//

export default function RootLayout() {
  return (
    // <FontSizeProvider>
    <Stack
      screenOptions={{
        headerTitle: ({ children }) => (
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: -10 }}>
            {children}
          </Text>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="alphabet/index" options={{ title: "알파벳" }} />
      <Stack.Screen name="alphabet/[letter]" options={{ title: "단어 보기" }} />
      <Stack.Screen name="alphabet/quiz/[letter]" options={{ title: "퀴즈" }} />
      <Stack.Screen name="sentence/index" options={{ title: "문장 연습" }} />
      <Stack.Screen
        name="alphabet/spellingQuiz/[letter]"
        options={{ title: "철자 맞추기" }}
      />

      <Stack.Screen
        name="sentence/quiz/[id]"
        options={{ title: "문장 퀴즈" }}
      />

      <Stack.Screen
        name="alphabet/listen/[letter]"
        options={{ title: "듣기 퀴즈" }}
      />
      <Stack.Screen
        name="sentence/wrongNote"
        options={{ title: "오답 노트" }}
      />
      <Stack.Screen name="settings" options={{ title: "설정" }} />
    </Stack>
    // </FontSizeProvider>
  );
}

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/use-color-scheme';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
