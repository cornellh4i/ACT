import { StatusBar } from 'expo-status-bar';
import { Text, Pressable, View, Alert } from 'react-native';

import '../global.css';

export default function App() {
  return (
    // TODO: Create and style a button that does something when clicked! :)
    // Use Nativewind for styling and react-native components
    // Simulate it in the Expo Go app on your phone and make a PR with a screenshot!
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-semibold">ACT WHOOP!</Text>
      <Pressable
        onPress={() => Alert.alert("Woah Cowboy nice click!")}
        className="flex px-[16px] py-[12px] items-center gap-[8px] bg-[#0006] active:bg-[#0009] rounded-[50px]"
        accessibilityLabel="Totally Click this for cool cool thing"
      >
        <Text
          className="text-[20px] font-semibold text-black"
        >
          Omg Click Me
        </Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
