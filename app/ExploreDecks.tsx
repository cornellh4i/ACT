import DeckCard from 'components/DeckCover';
import FiltersModal, { visibilityCallback } from 'components/FiltersModal';
import { DecksProvider, useDecks } from 'components/DecksContext';
import { router } from 'expo-router';
import React, { useEffect, useState, useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back-icon.svg';

const categoryToDeckCardFormat: { [key: string]: string } = {
  'Platforms and Privacy': 'platforms_and_privacy',
  'Online Interactions': 'online_interactions',
  'Inappropriate Content': 'inappropriate_content',
  'Social Media and Mental Health': 'social_media_and_mental_health',
  'Screentime': 'screen_time',
};

const difficultyToDeckCardFormat = (difficulty: string): 'easy' | 'medium' | 'hard' => {
  const lower = difficulty.toLowerCase();
  if (lower === 'easy') return 'easy';
  if (lower === 'medium') return 'medium';
  if (lower === 'hard') return 'hard';
  return 'easy'; // default
};

const ExploreDecksContent: React.FC = () => {
  const { filteredDecks } = useDecks();

  const decks = useMemo(() => {
    return filteredDecks.map((deck) => ({
      id: `deck_${deck.id}`,
      category: categoryToDeckCardFormat[deck.category] || deck.category.toLowerCase().replace(/\s+/g, '_'),
      difficulty: difficultyToDeckCardFormat(deck.difficulty),
      progress: 0.0, // Default progress
    }));
  }, [filteredDecks]);

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
          className="font-goldplay-bold text-xl">
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

const ExploreDecks: React.FC = () => {
  return (
    <DecksProvider>
      <ExploreDecksContent />
    </DecksProvider>
  );
};

export default ExploreDecks;
