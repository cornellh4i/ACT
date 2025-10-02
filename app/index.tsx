import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

import '../global.css';

export default function App() {
  const [counter, setCount] = useState(0);
  const increaseCount = () => {
    setCount((counter) => counter + 1);
  };
  return (
    // TODO: Create and style a button that does something when clicked! :)
    // Use Nativewind for styling and react-native components
    // Simulate it in the Expo Go app on your phone and make a PR with a screenshot!
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-semibold">ACT WHOOP!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={() => {
          increaseCount();
          Alert.alert('Counter', `${counter}`);
        }}
        title="Click to increase the counter!"
        color="#ff0000ff"
      />
    </View>
  );
}
