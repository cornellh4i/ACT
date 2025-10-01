import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import DeckCover from 'components/DeckCover';

import '../global.css';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-row flex-wrap w-full">
        <View className="w-1/2 p-2">
          <DeckCover
            catagory='online_interactions'
            difficulty='easy'
            progress={0.65}
          />
        </View>
        <View className="w-1/2 p-2">
          <DeckCover
            catagory='online_interactions'
            difficulty='medium'
            progress={0.45}
          />
        </View>
        <View className="w-1/2 p-2">
          <DeckCover
            catagory='online_interactions'
            difficulty='hard'
            progress={0.80}
          />
        </View>
        <View className="w-1/2 p-2">
          <DeckCover
            catagory='inappropriate_content'
            difficulty='easy'
            progress={0.30}
          />
        </View>
        <View className="w-1/2 p-2">
          <DeckCover
            catagory='social_media_and_mental_health'
            difficulty='medium'
            progress={0.55}
          />
        </View>
        <View className="w-1/2 p-2">
          <DeckCover
            catagory='screen_time'
            difficulty='hard'
            progress={0.90}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
