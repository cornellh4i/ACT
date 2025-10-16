import DeckCard from 'components/DeckCover';
import FiltersModal, { visibilityCallback } from 'components/FiltersModal';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back-icon.svg';

const ExploreDecks: React.FC = () => {
  const decks = [
    { id: 'platforms_easy', category: 'platforms_and_privacy', difficulty: 'easy', progress: 0.0 },
    {
      id: 'platforms_medium',
      category: 'platforms_and_privacy',
      difficulty: 'medium',
      progress: 0.0,
    },
    { id: 'platforms_hard', category: 'platforms_and_privacy', difficulty: 'hard', progress: 0.0 },

    { id: 'online_easy', category: 'online_interactions', difficulty: 'easy', progress: 0.0 },
    { id: 'online_medium', category: 'online_interactions', difficulty: 'medium', progress: 0.0 },
    { id: 'online_hard', category: 'online_interactions', difficulty: 'hard', progress: 0.0 },

    {
      id: 'inappropriate_easy',
      category: 'inappropriate_content',
      difficulty: 'easy',
      progress: 0.0,
    },
    {
      id: 'inappropriate_medium',
      category: 'inappropriate_content',
      difficulty: 'medium',
      progress: 0.0,
    },
    {
      id: 'inappropriate_hard',
      category: 'inappropriate_content',
      difficulty: 'hard',
      progress: 0.0,
    },

    {
      id: 'social_easy',
      category: 'social_media_and_mental_health',
      difficulty: 'easy',
      progress: 0.0,
    },
    {
      id: 'social_medium',
      category: 'social_media_and_mental_health',
      difficulty: 'medium',
      progress: 0.0,
    },
    {
      id: 'social_hard',
      category: 'social_media_and_mental_health',
      difficulty: 'hard',
      progress: 0.0,
    },

    { id: 'screen_easy', category: 'screen_time', difficulty: 'easy', progress: 0.0 },
    { id: 'screen_medium', category: 'screen_time', difficulty: 'medium', progress: 0.0 },
    { id: 'screen_hard', category: 'screen_time', difficulty: 'hard', progress: 0.0 },
  ];

  const { width: screenWidth } = useWindowDimensions();

  const gap = 12;
  const pad = 24;
  const numColumns = 2;
  const itemWidth = Math.floor((screenWidth - pad * 2 - gap * (numColumns - 1)) / numColumns);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    visibilityCallback(setShowOverlay);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F0F0F2]">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2" hitSlop={16}>
          <BackIcon width={22} height={22} />
        </TouchableOpacity>

        <Text
          style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center' }}
          className="font-jost-bold text-xl">
          Explore Decks
        </Text>

        <FiltersModal />
      </View>
      {showOverlay && (
        <View className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" pointerEvents="none" />
      )}

      <FlatList
        data={decks}
        keyExtractor={(item) => `${item.id}`}
        numColumns={numColumns}
        contentContainerStyle={{ paddingHorizontal: pad, paddingTop: 12, paddingBottom: 40 }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        renderItem={({ item, index }) => {
          const isLeftColumn = index % numColumns === 0;
          const hasRightSibling = index + 1 < decks.length;
          const availableRowWidth = screenWidth - pad * 2;
          const fullRowWidth = numColumns * itemWidth + (numColumns - 1) * gap;
          const rowOffset = Math.max(0, Math.floor((availableRowWidth - fullRowWidth) / 2));
          const marginLeft = isLeftColumn && hasRightSibling ? rowOffset : 0;
          const marginRight = isLeftColumn ? gap : 0;

          return (
            <View
              style={{ width: itemWidth, marginBottom: gap, marginRight, marginLeft }}
              className="px-2">
              <DeckCard
                catagory={item.category as any}
                difficulty={item.difficulty as any}
                progress={item.progress}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExploreDecks;
