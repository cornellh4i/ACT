import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import FiltersModal, { visibilityCallback } from '../components/FiltersModal';
import '../global.css';

export default function App() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    visibilityCallback(setShowOverlay);
  }, []);

  return (
    // TODO: Create and style a button that does something when clicked! :)
    // Use Nativewind for styling and react-native components
    // Simulate it in the Expo Go app on your phone and make a PR with a screenshot!
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-semibold">ACT WHOOP!</Text>
        <FiltersModal />
        <StatusBar style="auto" />
      </View>

      {showOverlay && (
        <View className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" pointerEvents="none" />
      )}
    </>
  );
}
