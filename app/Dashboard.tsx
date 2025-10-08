import DashboardProgress from '@/components/DashboardProgress';
import { Pressable, Text, View } from 'react-native';
import FiltersModal from '@/components/FiltersModal';
import UserIcon from '../assets/user.svg';

export default function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-[17.87px]">
      {/* Heading */}
      <View className="inline-flex flex-row items-center justify-between self-stretch">
        <Text className="justify-start font-['Goldplay_Alt'] text-2xl font-semibold leading-loose text-black px-[8px]">
          Progress
        </Text>
        <Pressable className="w-8 h-8 rounded-2xl px-4 py-2 bg-[#D5D6D8] justify-center items-center left-[-8px] " onPress={() => console.log('Hi')}>
          <UserIcon width={15} height={12} fill="#000"/>
        </Pressable>
      </View>
      {/* Dashboard */}
      <DashboardProgress progressBar={0} cardsRemaining={0} completedDecks={0} lastCheckin={''} />
      
      <View className=''></View>
      {/* Recent */}
      <Text className="text-2xl font-semibold">Recent</Text>
      <View className="flex-row">
        <Text className="text-2xl font-semibold">Related Topics</Text>
        <Text className="text-l font-semibold">Explore Decks</Text>
      </View>
    </View>
  );
}
