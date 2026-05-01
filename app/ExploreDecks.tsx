import DeckCard from 'components/DeckCover';
import FiltersModal, { visibilityCallback } from 'components/FiltersModal';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back-icon.svg';
import { getProfiles, DeckProgress } from '@/services/profileService';
import { useDecks } from 'components/DecksContext';
import FooterGraphic from '../assets/built-by-h4i.svg';

const CategoryMap = {
  'Platforms and Privacy': 'platforms_and_privacy',
  'Online Interactions': 'online_interactions',
  'Inappropriate Content': 'inappropriate_content',
  'Social Media and Mental Health': 'social_media_and_mental_health',
  'Screentime': 'screen_time',
} as const;

const DifficultyMap = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

const ExploreDecks: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [profileProgress, setProfileProgress] = useState<Record<string, DeckProgress>>({});
  const { filteredDecks, clearFilters } = useDecks();
  const { width: screenWidth } = useWindowDimensions();
  const gap = 12;
  const pad = 24;
  const numColumns = 2;
  const itemWidth = Math.floor((screenWidth - pad * 2 - gap * (numColumns - 1)) / numColumns);
  const deckList = useMemo(() => {
    return filteredDecks.map((deck) => ({
      id: deck.id,
      category: CategoryMap[deck.category as keyof typeof CategoryMap] ?? 'platforms_and_privacy',
      difficulty: DifficultyMap[deck.difficulty as keyof typeof DifficultyMap] ?? 'easy',
      cardCount: deck.cards?.length ?? 0,
    }));
  }, [filteredDecks]);

  useEffect(() => {
    visibilityCallback(setShowOverlay);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      clearFilters();
    }, [clearFilters])
  );

  useEffect(() => {
    (async () => {
      const profiles = await getProfiles();
      if (profiles.length === 0) return;
      const mostRecent = profiles.reduce((latest, profile) =>
        !latest || new Date(profile.lastActiveAt) > new Date(latest.lastActiveAt)
          ? profile
          : latest
      );
      setProfileProgress(mostRecent.progress || {});
    })();
  }, []);

  return (
    <SafeAreaView edges = {['top']} className="flex-1 bg-[#F0F0F2]">
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity
          onPress={() => router.push('/Dashboard')}
          className="p-2"
          style={{ padding: 8, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} >
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
        data={deckList}
        keyExtractor={(item) => `${item.id}`}
        numColumns={numColumns}
        contentContainerStyle={{ paddingHorizontal: pad, paddingTop: 12, paddingBottom: 24 }}
        ListFooterComponent={
          <View className="mt-4 mb-0 w-full">
            <FooterGraphic width="100%" />
          </View>
        }
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        renderItem={({ item, index }) => {
          const isLeftColumn = index % numColumns === 0;
          const hasRightSibling = index + 1 < deckList.length;
          const availableRowWidth = screenWidth - pad * 2;
          const fullRowWidth = numColumns * itemWidth + (numColumns - 1) * gap;
          const rowOffset = Math.max(0, Math.floor((availableRowWidth - fullRowWidth) / 2));
          const marginLeft = isLeftColumn && hasRightSibling ? rowOffset : 0;
          const marginRight = isLeftColumn ? gap : 0;
          const progressEntry = profileProgress[`deck_${item.id}`];
          const totalCards = progressEntry?.totalCount || item.cardCount || 0;
          const progressValue =
            progressEntry && totalCards > 0
              ? Math.min(progressEntry.viewedCount / totalCards, 1)
              : 0;
          return (
            <View
              style={{ width: itemWidth, marginBottom: gap, marginRight, marginLeft }}
              className="px-2">
              <DeckCard
                catagory={item.category as any}
                difficulty={item.difficulty as any}
                progress={progressValue}
                onPress={() =>
                  router.push({ pathname: '/Cards', params: { deckId: item.id.toString() } })
                }
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ExploreDecks;
