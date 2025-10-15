import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

type Category = 'online_interactions' | 'inappropriate_content' | 'social_media_and_mental_health' | 'screen_time' | 'platforms_and_privacy';
type Difficulty = 'easy' | 'medium' | 'hard';

interface DeckCardProps {
  catagory: Category;
  difficulty: Difficulty;
  progress: number;
  isSelected?: boolean;
}

const BACKGROUND_IMAGES = {
  online_interactions: {
    easy: {
      normal: require('assets/deckBackgrounds/OIE.png'),
      selected: require('assets/deckBackgrounds/OIES.png'),
    },
    medium: {
      normal: require('assets/deckBackgrounds/OIM.png'),
      selected: require('assets/deckBackgrounds/OIMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgrounds/OIH.png'),
      selected: require('assets/deckBackgrounds/OIHS.png'),
    },
  },
  inappropriate_content: {
    easy: {
      normal: require('assets/deckBackgrounds/ICE.png'),
      selected: require('assets/deckBackgrounds/ICES.png'),
    },
    medium: {
      normal: require('assets/deckBackgrounds/ICM.png'),
      selected: require('assets/deckBackgrounds/ICMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgrounds/ICH.png'),
      selected: require('assets/deckBackgrounds/ICHS.png'),
    },
  },
  social_media_and_mental_health: {
    easy: {
      normal: require('assets/deckBackgrounds/SME.png'),
      selected: require('assets/deckBackgrounds/SMES.png'),
    },
    medium: {
      normal: require('assets/deckBackgrounds/SMM.png'),
      selected: require('assets/deckBackgrounds/SMMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgrounds/SMH.png'),
      selected: require('assets/deckBackgrounds/SMHS.png'),
    },
  },
  screen_time: {
    easy: {
      normal: require('assets/deckBackgrounds/STE.png'),
      selected: require('assets/deckBackgrounds/STES.png'),
    },
    medium: {
      normal: require('assets/deckBackgrounds/STM.png'),
      selected: require('assets/deckBackgrounds/STMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgrounds/STH.png'),
      selected: require('assets/deckBackgrounds/STHS.png'),
    },
  },
  platforms_and_privacy:{
    easy: {
      normal: require('assets/deckBackgrounds/PPE.png'),
      selected: require('assets/deckBackgrounds/PPES.png'),
    },
    medium: {
      normal: require('assets/deckBackgrounds/PPM.png'),
      selected: require('assets/deckBackgrounds/PPMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgrounds/PPH.png'),
      selected: require('assets/deckBackgrounds/PPHS.png'),
    },
  },
} as const;

const PROGRESS_BAR_COLORS = {
    easy: '#0E5336',
    medium: '#8CC5CF',
    hard: '#5D3867',
} as const;

const DeckCard: React.FC<DeckCardProps> = ({
  catagory,
  difficulty,
  progress,
  isSelected = false,
}) => {
    const backgroundImage = BACKGROUND_IMAGES[catagory][difficulty][isSelected ? 'selected' : 'normal'];
    const progressPercentage = Math.min(Math.max(progress, 0), 1);
    return (
        <View className="shadow-sm shadow-black/10">
            <ImageBackground
                source={backgroundImage}
                className="w-[160px] h-[160px] justify-end"
                resizeMode="contain"
            >
                <View className="mt-auto mb-[17px] mx-[19px]">
                    <View className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: PROGRESS_BAR_COLORS[difficulty] }}>
                        <View
                        className="h-full bg-[#F5F5F5] rounded-full"
                        style={{ width: `${progressPercentage * 100}%` }}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default DeckCard;