import DashboardProgress from '@/components/DashboardProgress';
import { getAllDecks } from '@/services/dataService';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import AngleDown from '../assets/angle-down.svg';
import ExploreDeckIcon from '../assets/explore-deck-icon.svg';
import SwitchUserModal, { visibilityCallback } from '../components/SwitchUserModal';
import { getProfiles, Profile } from '../services/profileService';
import { Link, router } from 'expo-router';
import '../global.css';
import DeckCard from 'components/DeckCover';
import FooterGraphic from '../assets/built-by-h4i.svg';

const CategoryMap = {
  'Platforms and Privacy': 'platforms_and_privacy',
  'Online Interactions': 'online_interactions',
  'Inappropriate Content': 'inappropriate_content',
  'Social Media and Mental Health': 'social_media_and_mental_health',
  Screentime: 'screen_time',
} as const;

const DifficultyMap = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;

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

export default function DashboardScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);

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

  const allDecks = useMemo(() => {
    return getAllDecks()
      .map((deck) => ({
        id: deck.id,
        category: deck.category,
        difficulty: deck.difficulty as 'Easy' | 'Medium' | 'Hard',
        cardCount: deck.cards?.length ?? 0,
      }))
      .sort((a, b) => a.id - b.id);
  }, []);

  const deckProgressMap = useMemo(() => activeProfile?.progress ?? {}, [activeProfile]);

  const unviewedDecks = useMemo(() => {
    return allDecks.filter((deck) => {
      const entry = deckProgressMap[`deck_${deck.id}`];
      return !entry || entry.viewedCount === 0;
    });
  }, [allDecks, deckProgressMap]);

  const inProgressDecks = useMemo(() => {
    return allDecks.filter((deck) => {
      const entry = deckProgressMap[`deck_${deck.id}`];
      if (!entry) return false;
      const total = entry.totalCount || deck.cardCount;
      return total > 0 && entry.viewedCount > 0 && entry.viewedCount < total;
    });
  }, [allDecks, deckProgressMap]);

  const completedDecks = useMemo(() => {
    return allDecks.filter((deck) => {
      const entry = deckProgressMap[`deck_${deck.id}`];
      if (!entry) return false;
      const total = entry.totalCount || deck.cardCount;
      return total > 0 && entry.viewedCount >= total;
    });
  }, [allDecks, deckProgressMap]);

  const totalCards = useMemo(() => allDecks.reduce((sum, deck) => sum + deck.cardCount, 0), [allDecks]);
  const viewedCards = useMemo(() => {
    return allDecks.reduce((sum, deck) => {
      const entry = deckProgressMap[`deck_${deck.id}`];
      if (!entry) return sum;
      const total = entry.totalCount || deck.cardCount;
      return sum + Math.min(entry.viewedCount, total);
    }, 0);
  }, [allDecks, deckProgressMap]);

  const cardsRemaining = Math.max(totalCards - viewedCards, 0);
  const overallProgress = totalCards > 0 ? viewedCards / totalCards : 0;

  const hasInProgress = inProgressDecks.length > 0;
  const hasCompleted = completedDecks.length > 0;
  const hasUnviewed = unviewedDecks.length > 0;

  return (
    <View className="flex-1 relative bg-white pt-16">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 16, paddingBottom: 40 }}>
        <View className="items-center gap-5">
          {/* Heading */}
          <View className="inline-flex flex-row items-center justify-between self-stretch">
            <Text className="font-goldplay-semibold justify-start px-[8px] text-2xl leading-loose text-black">
              Deck Progress
            </Text>
            <SwitchUserModal />
          </View>
          {/* Dashboard */}
          <DashboardProgress
            progressBar={overallProgress}
            cardsRemaining={cardsRemaining}
            completedDecks={completedDecks.length}
            lastCheckin={activeProfile ? formatRelativeTime(activeProfile.lastActiveAt) : ''}
          />

          <Link href="/ExploreDecks" asChild>
            <Pressable className="inline-flex h-16 flex-row items-center self-stretch rounded-[9.93px] bg-slate-700 px-4 py-2 mt-4 mb-2">
              <Text className="font-goldplay-semibold justify-start pr-4 text-xl leading-normal text-white">
                Explore Decks
              </Text>

              <View className="flex-1 flex-row items-center justify-between">
                <ExploreDeckIcon width={31} height={31} fill="#fff" />
                <AngleDown width={24} height={24} fill="#fff" />
              </View>
            </Pressable>
          </Link>

          {/* In Progress */}
          {hasInProgress && (
            <>
              <View className="flex-row justify-between self-stretch">
                <Text className="font-goldplay-semibold text-2xl">In Progress</Text>
              </View>
              <View className="self-stretch">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ columnGap: 12, paddingVertical: 8 }}>
                  {inProgressDecks.map((deck) => {
                    const catKey =
                      CategoryMap[deck.category as keyof typeof CategoryMap] ?? 'platforms_and_privacy';
                    const diffKey = DifficultyMap[deck.difficulty] ?? 'easy';
                    const entry = deckProgressMap[`deck_${deck.id}`];
                    const total = entry?.totalCount || deck.cardCount || 1;
                    const progress =
                      entry && total > 0 ? Math.min(entry.viewedCount / total, 1) : 0;

                    return (
                      <View key={`in-progress-${deck.id}`} style={{ width: 160 }}>
                        <DeckCard
                          catagory={catKey as any}
                          difficulty={diffKey as any}
                          progress={progress}
                          onPress={() =>
                            router.push({ pathname: '/Cards', params: { deckId: deck.id.toString() } })
                          }
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          )}

          {/* Up Next */}
          {hasUnviewed && (
            <>
              <View className="inline-flex flex-row items-center justify-between self-stretch">
                <Text className="font-goldplay-semibold text-2xl">Up Next</Text>
              </View>
              <View className="self-stretch">
                {unviewedDecks.length === 0 ? (
                  <Text className="mt-2 font-goldplay-semibold text-base text-[#374466]">
                    You&apos;ve viewed every deck!
                  </Text>
                ) : (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ columnGap: 12, paddingVertical: 8 }}>
                    {unviewedDecks.map((deck) => {
                      const catKey =
                        CategoryMap[deck.category as keyof typeof CategoryMap] ??
                        'platforms_and_privacy';
                      const diffKey = DifficultyMap[deck.difficulty] ?? 'easy';

                      return (
                        <View key={deck.id} style={{ width: 160 }}>
                          <DeckCard
                            catagory={catKey as any}
                            difficulty={diffKey as any}
                            progress={0}
                            onPress={() =>
                              router.push({
                                pathname: '/Cards',
                                params: { deckId: deck.id.toString() },
                              })
                            }
                          />
                        </View>
                      );
                    })}
                  </ScrollView>
                )}
              </View>
            </>
          )}

          {/* Completed */}
          {hasCompleted && (
            <>
              <View className="inline-flex flex-row items-center justify-between self-stretch">
                <Text className="font-goldplay-semibold text-2xl">Completed</Text>
              </View>
              <View className="self-stretch">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ columnGap: 12, paddingVertical: 8 }}>
                  {completedDecks.map((deck) => {
                    const catKey =
                      CategoryMap[deck.category as keyof typeof CategoryMap] ?? 'platforms_and_privacy';
                    const diffKey = DifficultyMap[deck.difficulty] ?? 'easy';

                    return (
                      <View key={`completed-${deck.id}`} style={{ width: 160 }}>
                        <DeckCard
                          catagory={catKey as any}
                          difficulty={diffKey as any}
                          progress={1}
                          onPress={() =>
                            router.push({ pathname: '/Cards', params: { deckId: deck.id.toString() } })
                          }
                        />
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </>
          )}
        </View>
        <View className="mt-4 mb-0 w-full">
          <FooterGraphic width='100%'/>
        </View>
      </ScrollView>

      {showOverlay && (
        <View className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" pointerEvents="none" />
      )}
      
    </View>
  );
}
