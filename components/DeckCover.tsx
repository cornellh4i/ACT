import InnAppropriateEasy from 'assets/deck-icons/innappropriate-content-easy.svg';
import InnAppropriateHard from 'assets/deck-icons/innappropriate-content-hard.svg';
import InnAppropriateMedium from 'assets/deck-icons/innappropriate-content-medium.svg';
import OnlineInteractionsEasy from 'assets/deck-icons/online-interactions-easy.svg';
import OnlineInteractionsHard from 'assets/deck-icons/online-interactions-hard.svg';
import OnlineInteractionsMedium from 'assets/deck-icons/online-interactions-medium.svg';
import PlatformsEasy from 'assets/deck-icons/platforms-and-privacy-easy.svg';
import PlatformsHard from 'assets/deck-icons/platforms-and-privacy-hard.svg';
import PlatformsMedium from 'assets/deck-icons/platforms-and-privacy-medium.svg';
import ScreenTimeEasy from 'assets/deck-icons/screen-time-easy.svg';
import ScreenTimeHard from 'assets/deck-icons/screen-time-hard.svg';
import ScreenTimeMedium from 'assets/deck-icons/screen-time-medium.svg';
import SocialMediaEasy from 'assets/deck-icons/social-media-and-online-health-easy.svg';
import SocialMediaHard from 'assets/deck-icons/social-media-and-online-health-hard.svg';
import SocialMediaMedium from 'assets/deck-icons/social-media-and-online-health-medium.svg';
import React from 'react';
import { Image, Text, View } from 'react-native';

type Catagory =
  | 'online_interactions'
  | 'inappropriate_content'
  | 'social_media_and_mental_health'
  | 'screen_time'
  | 'platforms_and_privacy';
type Difficulty = 'easy' | 'medium' | 'hard';

interface DeckCardProps {
  catagory: Catagory;
  difficulty: Difficulty;
  progress: number;
}

const CATEGORY_LABELS: Record<Catagory, string> = {
  online_interactions: 'Online Interactions',
  inappropriate_content: 'Inappropriate Content',
  social_media_and_mental_health: 'Social Media & Mental Health',
  screen_time: 'Screen Time',
  platforms_and_privacy: 'Platforms & Privacy',
};

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

const BACKGROUND_IMAGES = {
  online_interactions: {
    easy: OnlineInteractionsEasy,
    medium: OnlineInteractionsMedium,
    hard: OnlineInteractionsHard,
  },
  inappropriate_content: {
    easy: InnAppropriateEasy,
    medium: InnAppropriateMedium,
    hard: InnAppropriateHard,
  },
  social_media_and_mental_health: {
    easy: SocialMediaEasy,
    medium: SocialMediaMedium,
    hard: SocialMediaHard,
  },
  screen_time: {
    easy: ScreenTimeEasy,
    medium: ScreenTimeMedium,
    hard: ScreenTimeHard,
  },
  platforms_and_privacy: {
    easy: PlatformsEasy,
    medium: PlatformsMedium,
    hard: PlatformsHard,
  },
} as const;

const PROGRESS_BAR_COLORS = {
  easy: '#0E5336',
  medium: '#8CC5CF',
  hard: '#5D3867',
} as const;

const DeckCard: React.FC<DeckCardProps> = ({ catagory, difficulty, progress }) => {
  const BackgroundComponentOrImage = BACKGROUND_IMAGES[catagory][difficulty] as any;
  const progressPercentage = Math.min(Math.max(progress, 0), 1);
  return (
    <View className="shadow-sm shadow-black/10">
      <View className="relative h-[160px] w-[160px] justify-end">
        <View className="absolute inset-0">
          {typeof BackgroundComponentOrImage === 'number' ? (
            <Image
              source={BackgroundComponentOrImage}
              className="h-full w-full"
              resizeMode="contain"
            />
          ) : (
            <BackgroundComponentOrImage width="100%" height="100%" />
          )}
        </View>
        <View className="absolute bottom-8 left-3 px-2 py-1">
          <Text className="max-w-[120px] font-jost-bold text-[16px] text-white">
            {CATEGORY_LABELS[catagory]}
          </Text>
          <Text className="max-w-[120px] font-jost text-[16px] text-white">
            {DIFFICULTY_LABELS[difficulty]}
          </Text>
        </View>

        <View className="mx-[19px] mb-[17px] mt-auto">
          <View
            className="h-2 overflow-hidden rounded-full"
            style={{ backgroundColor: PROGRESS_BAR_COLORS[difficulty] }}>
            <View
              className="h-full rounded-full bg-[#F5F5F5]"
              style={{ width: `${progressPercentage * 100}%` }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DeckCard;
