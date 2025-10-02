import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { useState } from 'react'

import '../global.css';


export default function App() {

  const [count, setCount] = useState(0)
  const increaseCount = () => {
    setCount(count => count + 1)
  }

  return (
    // TODO: Create and style a button that does something when clicked! :)
    // Use Nativewind for styling and react-native components
    // Simulate it in the Expo Go app on your phone and make a PR with a screenshot!
    <View className="flex-1 items-center justify-center bg-white">
      <Button onPress={increaseCount} title="Press Me" color="#b3cde0"/>
      <Text>{count}</Text>
    </View>
  );
}
