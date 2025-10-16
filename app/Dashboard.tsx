import DashboardProgress from '@/components/DashboardProgress';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import AngleDown from '../assets/angle-down.svg';
import ExploreDeckIcon from '../assets/explore-deck-icon.svg';
import SwitchUserModal, { visibilityCallback } from '../components/SwitchUserModal';

export default function DashboardScreen() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    visibilityCallback(setShowOverlay);
  }, []);

  return (
    <View className="flex-1 items-center gap-5 bg-white px-[17.87px] pt-16">
      {/* Heading */}
      <View className="inline-flex flex-row items-center justify-between self-stretch">
        <Text className="font-goldplay-semibold justify-start px-[8px] text-2xl leading-loose text-black">
          Progress
        </Text>
        <SwitchUserModal />
      </View>
      {/* Dashboard */}
      <DashboardProgress progressBar={0} cardsRemaining={0} completedDecks={0} lastCheckin={''} />
      <View className="inline-flex h-16 flex-row items-center self-stretch rounded-[9.93px] bg-slate-700 px-4 py-2">
        <Text className="font-goldplay-semibold justify-start pr-4 text-xl leading-normal text-white">
          Explore Decks
        </Text>

        <View className="flex-1 flex-row items-center justify-between">
          <ExploreDeckIcon width={31} height={31} fill="#fff" />
          <Pressable onPress={() => console.log('Pressed')}>
            <AngleDown width={24} height={24} fill="#fff" />
          </Pressable>
        </View>
      </View>
      {/* Recent */}
      <View className="flex-row justify-between self-stretch">
        <Text className="font-goldplay-semibold text-2xl">Recent</Text>
      </View>

      {/* Related */}
      <View className="inline-flex flex-row items-center justify-between self-stretch">
        <Text className="font-goldplay-semibold text-2xl">Related Topics</Text>
        <Text className="text-l font-goldplay-semibold">Explore Decks</Text>
      </View>

      {showOverlay && (
        <View className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" pointerEvents="none" />
      )}
    </View>
  );
}
