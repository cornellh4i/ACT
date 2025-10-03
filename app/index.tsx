import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import '../global.css';

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center space-y-6 bg-white">
      <StatusBar style="auto" />
      <View className="items-center gap-6">
        <Text className="text-2xl font-semibold">ACT WHOOP!</Text>

        <Link href="/ExploreDecks" className="rounded bg-blue-800 px-4 py-2 text-white">
          Go to Explore Decks Screen
        </Link>

        <Link href="/Dashboard" className="rounded bg-green-800 px-4 py-2 text-white">
          Go to Dashboard Screen
        </Link>

        <Link href="/Cards" className="rounded bg-red-800 px-4 py-2 text-white">
          Go to Cards Screen
        </Link>
      </View>
    </View>
  );
}
