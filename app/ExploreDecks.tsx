import FiltersModalTest from '@/tests/FiltersModalTest';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back-icon.svg';

export default function ExploreDecksScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="ml-4 mt-2">
        <BackIcon width={14} height={24} fill="#000" />
      </TouchableOpacity>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-semibold">Explore Decks</Text>
      </View>
      <FiltersModalTest />
    </SafeAreaView>
  );
}
