import DashboardProgress from '@/components/DashboardProgress';
import { Pressable, Text, View } from 'react-native';
import UserIcon from '../assets/user.svg';

export default function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-[17.87px] gap-5">
      {/* Heading */}
      <View className="inline-flex flex-row items-center justify-between self-stretch">
        <Text className="justify-start px-[8px] font-['Goldplay_Alt'] text-2xl font-semibold leading-loose text-black">
          Progress
        </Text>
        <Pressable
          className="left-[-8px] h-8 w-8 items-center justify-center rounded-2xl bg-[#D5D6D8] px-4 py-2 "
          onPress={() => console.log('Hi')}>
          <UserIcon width={15} height={12} fill="#000" />
        </Pressable>
      </View>
      {/* Dashboard */}
      <DashboardProgress progressBar={0} cardsRemaining={0} completedDecks={0} lastCheckin={''} />
      <View className='self-stretch h-16 px-4 py-2 bg-slate-700 rounded-[9.93px]'>
        <Text className="justify-start font-['Goldplay_Alt'] text-xl font-semibold leading-normal text-white">
          Explore Decks
        </Text>
      </View>
      {/* Recent */}
      <View>
        <Text className="text-2xl font-semibold">Recent</Text>
      </View>
      {/* Related */}
      <View className="inline-flex flex-row items-center justify-between self-stretch">
        <Text className="text-2xl font-semibold">Related Topics</Text>
        <Text className="text-l font-semibold">Explore Decks</Text>
      </View>
    </View>
  );
}
