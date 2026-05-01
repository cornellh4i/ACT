import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { DecksProvider } from '../components/DecksContext';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore if already prevented during fast refresh.
});

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

export default function Layout() {
  const splashDelayMs = 1000;
  const [fontsLoaded] = useFonts({
    'Jost-Thin': require('../assets/fonts/Jost-Thin.ttf'),
    'Jost-ThinItalic': require('../assets/fonts/Jost-ThinItalic.ttf'),
    'Jost-ExtraLight': require('../assets/fonts/Jost-ExtraLight.ttf'),
    'Jost-ExtraLightItalic': require('../assets/fonts/Jost-ExtraLightItalic.ttf'),
    'Jost-Light': require('../assets/fonts/Jost-Light.ttf'),
    'Jost-LightItalic': require('../assets/fonts/Jost-LightItalic.ttf'),
    'Jost-Regular': require('../assets/fonts/Jost-Regular.ttf'),
    'Jost-Italic': require('../assets/fonts/Jost-Italic.ttf'),
    'Jost-Medium': require('../assets/fonts/Jost-Medium.ttf'),
    'Jost-MediumItalic': require('../assets/fonts/Jost-MediumItalic.ttf'),
    'Jost-SemiBold': require('../assets/fonts/Jost-SemiBold.ttf'),
    'Jost-SemiBoldItalic': require('../assets/fonts/Jost-SemiBoldItalic.ttf'),
    'Jost-Bold': require('../assets/fonts/Jost-Bold.ttf'),
    'Jost-BoldItalic': require('../assets/fonts/Jost-BoldItalic.ttf'),
    'Jost-ExtraBold': require('../assets/fonts/Jost-ExtraBold.ttf'),
    'Jost-ExtraBoldItalic': require('../assets/fonts/Jost-ExtraBoldItalic.ttf'),
    'Jost-Black': require('../assets/fonts/Jost-Black.ttf'),
    'Jost-BlackItalic': require('../assets/fonts/Jost-BlackItalic.ttf'),
    'Goldplay-Bold': require('../assets/fonts/Goldplay-Alt-Bold.otf'),
    'Goldplay-SemiBold': require('../assets/fonts/Goldplay-Alt-SemiBold.otf'),
    'Goldplay-Regular': require('../assets/fonts/Goldplay-Alt-Regular.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    const timeoutId = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {
        // Ignore if already hidden during refresh/navigation.
      });
    }, splashDelayMs);

    return () => clearTimeout(timeoutId);
  }, [fontsLoaded, splashDelayMs]);

  if (!fontsLoaded) return null;

  return (
    <DecksProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="Onboarding" options={{ animation: 'fade' }} />
        <Stack.Screen name="Dashboard" options={{ animation: 'slide_from_left' }} />
      </Stack>
    </DecksProvider>
  );
}
