import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import DashboardProgress from '../components/DashboardProgress';

export default function DashboardProgressTest() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
        <Text className="mb-8 text-2xl font-semibold">Dashboard Progress Tests</Text>

        {/* Test 1: Medium progress */}
        <View className="mb-8">
          <Text className="mb-2 text-sm text-gray-600">Test 1: 60% Progress</Text>
          <DashboardProgress
            progressBar={0.6}
            cardsRemaining={40}
            completedDecks={9}
            lastCheckin="1 month ago"
          />
        </View>

        {/* Test 2: Low progress */}
        <View className="mb-8">
          <Text className="mb-2 text-sm text-gray-600">Test 2: 20% Progress</Text>
          <DashboardProgress
            progressBar={0.2}
            cardsRemaining={80}
            completedDecks={2}
            lastCheckin="3 days ago"
          />
        </View>

        {/* Test 3: High progress */}
        <View className="mb-8">
          <Text className="mb-2 text-sm text-gray-600">Test 3: 90% Progress</Text>
          <DashboardProgress
            progressBar={0.9}
            cardsRemaining={5}
            completedDecks={25}
            lastCheckin="2 hours ago"
          />
        </View>

        {/* Test 4: Empty progress */}
        <View className="mb-8">
          <Text className="mb-2 text-sm text-gray-600">Test 4: 0% Progress</Text>
          <DashboardProgress
            progressBar={0}
            cardsRemaining={100}
            completedDecks={0}
            lastCheckin="Never"
          />
        </View>

        {/* Test 5: Full progress */}
        <View className="mb-8">
          <Text className="mb-2 text-sm text-gray-600">Test 5: 100% Progress</Text>
          <DashboardProgress
            progressBar={1}
            cardsRemaining={0}
            completedDecks={30}
            lastCheckin="Just now"
          />
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
