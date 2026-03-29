import "@/constants/globals";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // <FontSizeProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="alphabet/index" options={{ title: "알파벳" }} />
      <Stack.Screen name="alphabet/[letter]" options={{ title: "단어 보기" }} />
      <Stack.Screen name="alphabet/quiz/[letter]" options={{ title: "퀴즈" }} />
      <Stack.Screen name="sentence/index" options={{ title: "문장 연습" }} />

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
