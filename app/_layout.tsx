import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import '../global.css';

export default function App() {
  const [showGif, setShowGif] = useState(false);

  return (
    // TODO: Create and style a button that does something when clicked! :)
    // Use Nativewind for styling and react-native components
    // Simulate it in the Expo Go app on your phone and make a PR with a screenshot!
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-semibold mb-6">ACT WHOOP!</Text>
      <TouchableOpacity
        className="bg-blue-500 px-6 py-3 rounded-lg mb-4"
        onPress={() => setShowGif(true)}
      >
        <Text className="text-white text-lg font-medium">Press Me!</Text>
      </TouchableOpacity>
      {showGif && (
        <Image
          source={require('../assets/hello.gif')}
          style={{ width: 192, height: 192, marginTop: 24 }}
          resizeMode="contain"
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}
