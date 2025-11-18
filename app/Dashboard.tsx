import DashboardProgress from '@/components/DashboardProgress';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, FlatList, ImageBackground, ScrollView } from 'react-native';
import AngleDown from '../assets/angle-down.svg';
import ExploreDeckIcon from '../assets/explore-deck-icon.svg';
import SwitchUserModal, { visibilityCallback } from '../components/SwitchUserModal';
import { getProfiles, Profile, getCategorizedDecks, Deck, DeckProgress } from '../services/profileService';
import { getAllDecks } from '@/services/dataService';


const formatRelativeTime = (isoDate: string) => {
  if (!isoDate) return 'No activity yet';
  const date = new Date(isoDate);
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (mins > 0) return `${mins} min${mins > 1 ? 's' : ''} ago`;
  return 'Just now';
};

const decks : Deck[] = getAllDecks().map(deckData => ({
  ...deckData,
  viewedCardIds: [],
  viewedCount: 0,
  totalCount: deckData.cards.length,
  lastOpenedAt: undefined,
  completedAt: undefined,
}));

const difficultyImages = {
  easy: require('../assets/deck-covers/inappropriate-content-easy.png'),
  medium: require('../assets/deck-covers/inappropriate-content-medium.png'),
  hard: require('../assets/deck-covers/inappropriate-content-hard.png'),
};

export default function DashboardScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [categorizedDecks, setCategorizedDecks] = useState<DeckProgress | null>(null);

  useEffect (() => {
    async function loadDecks() {
      const result = await getCategorizedDecks(activeProfile? activeProfile.id : 0, decks);
      setCategorizedDecks(result);
    }
  
  loadDecks();}, [activeProfile, decks]);

  useEffect(() => {
    visibilityCallback(setShowOverlay);
  }, []);

  useEffect(() => {
    (async () => {
      const profiles = await getProfiles();
      if (profiles.length === 0) return;

      const mostRecent = profiles.reduce((latest, profile) =>
        !latest || new Date(profile.lastActiveAt) > new Date(latest.lastActiveAt)
          ? profile
          : latest
      );
      setActiveProfile(mostRecent);
    })();
  }, [showOverlay]); 

  return (
    <View className="flex-1 items-center gap-5 bg-white px-[17.87px] pt-16">
      {/* Heading */}
      <View className="inline-flex flex-row items-center justify-between self-stretch">
        <Text className="font-goldplay-semibold justify-start px-[8px] text-2xl leading-loose text-black">
          {activeProfile ? `${activeProfile.name}'s Progress` : 'Progress'}
        </Text>
        <SwitchUserModal />
      </View>
      {/* Dashboard */}
      <DashboardProgress
        progressBar={0}
        cardsRemaining={0}
        completedDecks={0}
        lastCheckin={activeProfile ? formatRelativeTime(activeProfile.lastActiveAt) : ''}
      />

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

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Recent */}
      <View className="flex-col">
      <View className="flex-row justify-between self-stretch">
        <Text className="font-goldplay-semibold text-2xl">Recent</Text>
      </View>      
          <FlatList 
            data={categorizedDecks?.recent}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground 
              source={difficultyImages[item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="flex items-center mr-4 w-48 h-48 rounded-lg overflow-hidden p-4">
              <View className="w-48 h-48 rounded-lg p-4">
                <Text className="font-goldplay-semibold mb-2 text-lg">{item.category}</Text>
                <Text className="font-goldplay-regular mb-4 text-sm text-white">{item.difficulty}</Text>

                {/* Progress bar */}
                <View className="w-full bg-white/30 rounded h-2 overflow-hidden">
                  <View
                    className="bg-white h-3"
                    style={{ width: `${(item.viewedCount / item.totalCount) * 100}%` }}
                  />
                </View>
              </View>
              </ImageBackground>
            )}/>


      {/* Up Next */}
      <View className="flex-col">
      <View className="flex-row justify-between self-stretch">
        <Text className="font-goldplay-semibold text-2xl">Up Next</Text>
      </View>      
          <FlatList 
            data={categorizedDecks?.upNext}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground 
              source={difficultyImages[item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="flex items-center mr-4 w-48 h-48 rounded-lg overflow-hidden p-4">
              <View className="w-48 h-48 rounded-lg p-4">
                <Text className="font-goldplay-semibold mb-2 text-lg">{item.category}</Text>
                <Text className="font-goldplay-regular mb-4 text-sm text-white">{item.difficulty}</Text>

                {/* Progress bar */}
                <View className="w-full bg-white/30 rounded h-2 overflow-hidden">
                  <View
                    className="bg-white h-3"
                    style={{ width: `${(item.viewedCount / item.totalCount) * 100}%` }}
                  />
                </View>
              </View>
              </ImageBackground>
            )}/>
      </View>

      {/* Completed */}
      <View className="flex-col">
      <View className="flex-row justify-between self-stretch">
        <Text className="font-goldplay-semibold text-2xl">Completed</Text>
      </View>      
          <FlatList 
            data={categorizedDecks?.completed}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground 
              source={difficultyImages[item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="flex items-center mr-4 w-48 h-48 rounded-lg overflow-hidden p-4">
              <View className="w-48 h-48 rounded-lg p-4">
                <Text className="font-goldplay-semibold mb-2 text-lg">{item.category}</Text>
                <Text className="font-goldplay-regular mb-4 text-sm text-white">{item.difficulty}</Text>

                {/* Progress bar */}
                <View className="w-full bg-white/30 rounded h-2 overflow-hidden">
                  <View
                    className="bg-white h-3"
                    style={{ width: `${(item.viewedCount / item.totalCount) * 100}%` }}
                  />
                </View>
              </View>
              </ImageBackground>
            )}/>
      </View>
      </View>
      </ScrollView>
    </View>
  );
}
