import DashboardProgress from '@/components/DashboardProgress';
import { useEffect, useState } from 'react';
import { Pressable, Text, View, FlatList, ImageBackground, ScrollView } from 'react-native';
import AngleDown from '../assets/angle-down.svg';
import ExploreDeckIcon from '../assets/explore-deck-icon.svg';
import SwitchUserModal, { visibilityCallback } from '../components/SwitchUserModal';
import { getProfiles, Profile, Deck, seedTestProgressForProfile } from '../services/profileService';
import { useDashboardDecks } from '../hooks/useDashboardDecks';
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

const difficultyImages = {
  easy: require('../assets/deck-covers/inappropriate-content-easy.png'),
  medium: require('../assets/deck-covers/inappropriate-content-medium.png'),
  hard: require('../assets/deck-covers/inappropriate-content-hard.png'),
};

export default function DashboardScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  
  const { recent, upNext, completed, refresh } = useDashboardDecks(
    activeProfile?.id ?? null
  );

  useEffect(() => {
  const seedData = async () => {
    // Only seed test data for "Default Child" profile
    if (activeProfile && activeProfile.name === 'Default Child') {
      const allDecks = getAllDecks();
      await seedTestProgressForProfile(activeProfile.id, allDecks);
      console.log('Test progress seeded for:', activeProfile.name);
      refresh();
    }
  };
  seedData();
}, [activeProfile]);

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
      <View className="flex-col mb-6">
      <View className="flex-row justify-between self-stretch">
        <Text className="font-goldplay-semibold text-2xl">Recent</Text>
      </View>      
          <FlatList 
            data={recent}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground 
              source={difficultyImages[item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="relative flex mr-4 w-48 h-48 rounded-lg overflow-hidden">
              <View className="absolute bottom-[20px] mr-14">
                <Text className="bottom-[14px] left-4 text-white font-bold font-['Jost']">{item.category}</Text>
                <Text className="bottom-[10px] text-white text-base left-4 font-normal font-['Jost'] leading-5">{item.difficulty}</Text>
              </View>
              <View className="absolute bottom-4 w-40">
                {/* Progress bar */}
                <View className="left-4 bg-white/30 rounded h-2 overflow-hidden">
                  <View
                    className="bg-white h-3"
                    style={{ width: `${(item.viewedCount / item.totalCount) * 100}%` }}
                  />
                </View>
              </View>
              </ImageBackground>
            )}/>


      {/* Up Next */}
      <View className="flex-col mt-6">
      <View className="flex-row justify-between self-stretch mb-6">
        <Text className="font-goldplay-semibold text-2xl">Up Next</Text>
      </View>      
          <FlatList 
            data={upNext}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground 
              source={difficultyImages[item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="relative flex mr-4 w-48 h-48 rounded-lg overflow-hidden">
              <View className="absolute bottom-[20px] mr-14">
                <Text className="bottom-[14px] left-4 text-white font-bold font-['Jost']">{item.category}</Text>
                <Text className="bottom-[10px] text-white text-base left-4 font-normal font-['Jost'] leading-5">{item.difficulty}</Text>
              </View>
              <View className="absolute bottom-4 w-40">
                {/* Progress bar */}
                <View className="left-4 bg-white/30 rounded h-2 overflow-hidden">
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
      <View className="flex-col mt-6">
      <View className="flex-row justify-between self-stretch mb-6">
        <Text className="font-goldplay-semibold text-2xl">Completed</Text>
      </View>      
          <FlatList 
            data={completed}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ImageBackground 
              source={difficultyImages[item.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard']}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="relative flex mr-4 w-48 h-48 rounded-lg overflow-hidden">
              <View className="absolute bottom-[20px] mr-14">
                <Text className="bottom-[14px] left-4 text-white font-bold font-['Jost']">{item.category}</Text>
                <Text className="bottom-[10px] text-white text-base left-4 font-normal font-['Jost'] leading-5">{item.difficulty}</Text>
              </View>
              <View className="absolute bottom-4 w-40">
                {/* Progress bar */}
                <View className="left-4 bg-white/30 rounded h-2 overflow-hidden">
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
