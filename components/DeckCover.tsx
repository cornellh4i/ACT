import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

type Catagory = 'online_interactions' | 'inappropriate_content' | 'social_media_and_mental_health' | 'screen_time' | 'platforms_and_privacy';
type Difficulty = 'easy' | 'medium' | 'hard';

interface DeckCardProps {
  catagory: Catagory;
  difficulty: Difficulty;
  progress: number;
  isSelected?: boolean;
}

const BACKGROUND_IMAGES = {
  online_interactions: {
    easy: {
      normal: require('assets/deckBackgounds/OIE.png'),
      selected: require('assets/deckBackgounds/OIES.png'),
    },
    medium: {
      normal: require('assets/deckBackgounds/OIM.png'),
      selected: require('assets/deckBackgounds/OIMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgounds/OIH.png'),
      selected: require('assets/deckBackgounds/OIHS.png'),
    },
  },
  inappropriate_content: {
    easy: {
      normal: require('assets/deckBackgounds/ICE.png'),
      selected: require('assets/deckBackgounds/ICES.png'),
    },
    medium: {
      normal: require('assets/deckBackgounds/ICM.png'),
      selected: require('assets/deckBackgounds/ICMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgounds/ICH.png'),
      selected: require('assets/deckBackgounds/ICHS.png'),
    },
  },
  social_media_and_mental_health: {
    easy: {
      normal: require('assets/deckBackgounds/SME.png'),
      selected: require('assets/deckBackgounds/SMES.png'),
    },
    medium: {
      normal: require('assets/deckBackgounds/SMM.png'),
      selected: require('assets/deckBackgounds/SMMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgounds/SMH.png'),
      selected: require('assets/deckBackgounds/SMHS.png'),
    },
  },
  screen_time: {
    easy: {
      normal: require('assets/deckBackgounds/STE.png'),
      selected: require('assets/deckBackgounds/STES.png'),
    },
    medium: {
      normal: require('assets/deckBackgounds/STM.png'),
      selected: require('assets/deckBackgounds/STMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgounds/STH.png'),
      selected: require('assets/deckBackgounds/STHS.png'),
    },
  },
  platforms_and_privacy:{
    easy: {
      normal: require('assets/deckBackgounds/PPE.png'),
      selected: require('assets/deckBackgounds/PPES.png'),
    },
    medium: {
      normal: require('assets/deckBackgounds/PPM.png'),
      selected: require('assets/deckBackgounds/PPMS.png'),
    },
    hard: {
      normal: require('assets/deckBackgounds/PPH.png'),
      selected: require('assets/deckBackgounds/PPHS.png'),
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