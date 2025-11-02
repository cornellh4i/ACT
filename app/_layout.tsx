import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function Layout() {
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

  if (!fontsLoaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
