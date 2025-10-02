import { StatusBar } from 'expo-status-bar';
import { Button, Text, View, Alert } from 'react-native';

import '../global.css';

export default function App() {
  return (
    // TODO: Create and style a button that does something when clicked! :)
    // Use Nativewind for styling and react-native components
    // Simulate it in the Expo Go app on your phone and make a PR with a screenshot!
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-semibold">ACT WHOOP!</Text>
      <StatusBar style="auto" />
      <Button
      title = "Press me!"
      onPress={() => Alert.alert("Adjust color")}
      />
    </View>
  );
}
