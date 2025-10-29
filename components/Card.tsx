import InappropriateEasy from 'assets/deck-covers/inappropriate-content-easy.png';
import InappropriateHard from 'assets/deck-covers/inappropriate-content-hard.png';
import InappropriateMedium from 'assets/deck-covers/inappropriate-content-medium.png';
import { Link } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type screen = 'cover' | 'cards' | 'end';

type Category =
  | 'inappropriateContent'
  | 'onlineInteractions'
  | 'platformsAndPrivacy'
  | 'socialMediaAndMentalHealth'
  | 'screentime';

const BackgroundImages = {
  inappropriateContent: {
    Easy: InappropriateEasy,
    Medium: InappropriateMedium,
    Hard: InappropriateHard,
  },
  onlineInteractions: {
    Easy: InappropriateEasy,
    Medium: InappropriateMedium,
    Hard: InappropriateHard,
  },
  platformsAndPrivacy: {
    Easy: InappropriateEasy,
    Medium: InappropriateMedium,
    Hard: InappropriateHard,
  },
  socialMediaAndMentalHealth: {
    Easy: InappropriateEasy,
    Medium: InappropriateMedium,
    Hard: InappropriateHard,
  },
  screentime: {
    Easy: InappropriateEasy,
    Medium: InappropriateMedium,
    Hard: InappropriateHard,
  },
};

const CategoryLabels: Record<string, Category> = {
  'Online Interactions': 'onlineInteractions',
  'Inappropriate Content': 'inappropriateContent',
  'Platforms and Privacy': 'platformsAndPrivacy',
};

const CardStyles = {
  Easy: {
    bg: 'bg-[#12754C]',
    defaultCard: 'bg-[#E8F1E7] opacity-100 rounded-[24px] p-8',
    questionCard: 'bg-[#FFFFFF] opacity-100 rounded-[24px] p-8',
  },
  Medium: {
    bg: 'bg-[#2C7388]',
    defaultCard: 'bg-[#E7EEF1] opacity-100 rounded-[24px] p-8',
    questionCard: 'bg-[#FFFFFF] opacity-100 rounded-[24px] p-8',
  },
  Hard: {
    bg: 'bg-[#814794]',
    defaultCard: 'bg-[#ECE3F1] opacity-100 rounded-[24px] p-8',
    questionCard: 'bg-[#FFFFFF] opacity-100 rounded-[24px] p-8',
  },
};

const TextStyles = {
  heading: 'text-[#27282A] text-[26px] leading-[32px] font-goldplay-bold',
  pg: 'text-[#27282A] text-[16px] leading-[20px] font-jost-bold',
  pg2: 'text-[#FFFFFF] text-[16px] leading-[20px] font-jost',
  deckHeading: 'text-[#FAFAFB] text-[32px] leading-[40px] font-goldplay-bold',
  deckSubheading: 'text-[#FAFAFB] text-[24px] leading-[32px] font-goldplay-semibold',
  button: 'text-[16px] leading-[20px] font-jost-bold',
};

const ButtonStyles = {
  Easy: {
    continue: 'w-[329px] h-[40px] rounded-[10px] bg-[#FAFAFB] justify-center items-center',
    nextTopic: 'w-[329px] h-[40px] rounded-[10px] bg-[#0E5336] justify-center items-center',
    nextDifficulty: 'w-[329px] h-[40px] rounded-[10px] bg-[#374466] justify-center items-center',
  },
  Medium: {
    continue: 'w-[329px] h-[40px] rounded-[10px] bg-[#FAFAFB] justify-center items-center',
    nextTopic: 'w-[329px] h-[40px] rounded-[10px] bg-[#0E5336] justify-center items-center',
    nextDifficulty: 'w-[329px] h-[40px] rounded-[10px] bg-[#374466] justify-center items-center',
  },
  Hard: {
    continue: 'w-[329px] h-[40px] rounded-[10px] bg-[#FAFAFB] justify-center items-center',
    nextTopic: 'w-[329px] h-[40px] rounded-[10px] bg-[#0E5336] justify-center items-center',
    nextDifficulty: 'w-[329px] h-[40px] rounded-[10px] bg-[#374466] justify-center items-center',
  },
};

interface DeckProps {
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cards: CardProps[];
}

interface CardProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  explanation: string;
  parentTip?: string;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  difficulty,
  question,
  explanation,
  parentTip,
  interactive = true,
}) => {
  const cardStyle = CardStyles[difficulty];
  const [currentPage, setCurrentPage] = useState(0); // 0 = question, 1 = explanation, 2 = parent tip
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [lastBackPage, setLastBackPage] = useState(1); // Remember which back page we were on (1 = explanation, 2 = parent tip)
  const isFlipped = useSharedValue(0);
  const pagerRef = useRef<PagerView>(null);

  // Track touch position to detect swipes vs taps
  const touchStart = useRef({ x: 0, y: 0 });
  const [isSwiping, setIsSwiping] = useState(false);

  // Flip animation - toggle between Question and Explanation/Parent Tip
  const handleFlip = () => {
    // Don't flip if user was swiping
    if (isSwiping) {
      setIsSwiping(false);
      return;
    }

    if (isFlipped.value === 0) {
      // Flip to back side (explanation or parent tip)
      isFlipped.value = 1;
      setIsCardFlipped(true);
      setCurrentPage(lastBackPage); // Return to the last page we were on
      // Set pager to the correct page
      if (pagerRef.current && lastBackPage === 2) {
        setTimeout(() => {
          pagerRef.current?.setPage(1); // Go to parent tip
        }, 50);
      }
    } else {
      // Flip back to question
      // Save which page we're currently on before flipping
      setLastBackPage(currentPage);
      isFlipped.value = 0;
      setIsCardFlipped(false);
      setCurrentPage(0); // Set to question page
    }
  };

  // Front side animation (Question)
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(isFlipped.value, [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration: 600 });

    return {
      transform: [{ perspective: 2000 }, { rotateY: rotateValue }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 10,
    };
  });

  // Back side animation (Explanation/Parent Tip pager)
  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(isFlipped.value, [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration: 600 });

    return {
      transform: [{ perspective: 2000 }, { rotateY: rotateValue }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 10,
    };
  });

  if (!interactive) {
    // Legacy static rendering (not used in new implementation)
    return (
      <View className={cardStyle.bg}>
        <View className={cardStyle.questionCard}>
          <View className="flex-1 justify-center">
            <Text className={TextStyles.heading}>{question}</Text>
          </View>
        </View>
      </View>
    );
  }

  // Carousel indicator component, only shows on explanation/parent tip pages
  const CarouselIndicator = () => {
    if (!isCardFlipped) {
      return null;
    }

    if (!parentTip) {
      return null;
    }

    // Get the background color based on difficulty
    const bgColors = {
      Easy: '#12754C',
      Medium: '#2C7388',
      Hard: '#814794',
    };
    const activeDotColor = bgColors[difficulty];

    // Map currentPage to indicator dots: 1 (explanation) = dot 0, 2 (parent tip) = dot 1
    const indicatorPage = currentPage - 1;

    return (
      <View
        style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          zIndex: 100,
        }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <View
            key={index}
            style={{
              width: indicatorPage === index ? 10 : 8,
              height: indicatorPage === index ? 10 : 8,
              borderRadius: 5,
              backgroundColor: indicatorPage === index ? activeDotColor : '#27282A40',
            }}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ width: '90%', height: 600, zIndex: 1, elevation: 5 }}>
      <View
        className={`${cardStyle.bg} rounded-[26px] p-2`}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <View style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          {/* Front - Question */}
          <Animated.View style={frontAnimatedStyle}>
            <Pressable
              onPress={handleFlip}
              onTouchStart={(e) => {
                touchStart.current = {
                  x: e.nativeEvent.pageX,
                  y: e.nativeEvent.pageY,
                };
                setIsSwiping(false);
              }}
              onTouchMove={(e) => {
                const dx = Math.abs(e.nativeEvent.pageX - touchStart.current.x);
                const dy = Math.abs(e.nativeEvent.pageY - touchStart.current.y);
                // If movement is greater than 10 pixels, consider it a swipe
                if (dx > 10 || dy > 10) {
                  setIsSwiping(true);
                }
              }}
              style={{ width: '100%', height: '100%' }}>
              <View className={cardStyle.questionCard} style={{ width: '100%', height: '100%' }}>
                <View className="flex-1 justify-center">
                  <Text className={TextStyles.heading}>{question}</Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>

          {/* Back - Explanation and Parent Tip*/}
          <Animated.View style={backAnimatedStyle} pointerEvents={isCardFlipped ? 'auto' : 'none'}>
            {parentTip ? (
              <PagerView
                ref={pagerRef}
                style={{ flex: 1 }}
                initialPage={0}
                pageMargin={8}
                onPageSelected={(e) => {
                  // Update current page: 0 = explanation, 1 = parent tip
                  if (isCardFlipped) {
                    setCurrentPage(e.nativeEvent.position + 1);
                  }
                }}>
                {/* Page 1: Explanation */}
                <View key="1" style={{ flex: 1, paddingHorizontal: 4 }}>
                  <Pressable
                    onPress={handleFlip}
                    onTouchStart={(e) => {
                      touchStart.current = {
                        x: e.nativeEvent.pageX,
                        y: e.nativeEvent.pageY,
                      };
                      setIsSwiping(false);
                    }}
                    onTouchMove={(e) => {
                      const dx = Math.abs(e.nativeEvent.pageX - touchStart.current.x);
                      const dy = Math.abs(e.nativeEvent.pageY - touchStart.current.y);
                      // If movement is greater than 10 pixels, consider it a swipe
                      if (dx > 10 || dy > 10) {
                        setIsSwiping(true);
                      }
                    }}
                    style={{ width: '100%', height: '100%' }}>
                    <View
                      className={cardStyle.defaultCard}
                      style={{ width: '100%', height: '100%' }}>
                      <View className="flex-1 justify-center">
                        <Text className={`${TextStyles.heading} mb-4`}>Explanation</Text>
                        <Text className={TextStyles.pg}>{explanation}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>

                {/* Page 2: Parent Tip */}
                <View key="2" style={{ flex: 1, paddingHorizontal: 4 }}>
                  <Pressable
                    onPress={handleFlip}
                    onTouchStart={(e) => {
                      touchStart.current = {
                        x: e.nativeEvent.pageX,
                        y: e.nativeEvent.pageY,
                      };
                      setIsSwiping(false);
                    }}
                    onTouchMove={(e) => {
                      const dx = Math.abs(e.nativeEvent.pageX - touchStart.current.x);
                      const dy = Math.abs(e.nativeEvent.pageY - touchStart.current.y);
                      // If movement is greater than 10 pixels, consider it a swipe
                      if (dx > 10 || dy > 10) {
                        setIsSwiping(true);
                      }
                    }}
                    style={{ width: '100%', height: '100%' }}>
                    <View
                      className={cardStyle.defaultCard}
                      style={{ width: '100%', height: '100%' }}>
                      <View className="flex-1 justify-center">
                        <Text className={`${TextStyles.heading} mb-4`}>Parent Tip</Text>
                        <Text className={TextStyles.pg}>{parentTip}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              </PagerView>
            ) : (
              // If no parent tip, just show explanation
              <Pressable
                onPress={handleFlip}
                onTouchStart={(e) => {
                  touchStart.current = {
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                  };
                  setIsSwiping(false);
                }}
                onTouchMove={(e) => {
                  const dx = Math.abs(e.nativeEvent.pageX - touchStart.current.x);
                  const dy = Math.abs(e.nativeEvent.pageY - touchStart.current.y);
                  // If movement is greater than 10 pixels, consider it a swipe
                  if (dx > 10 || dy > 10) {
                    setIsSwiping(true);
                  }
                }}
                style={{ flex: 1 }}>
                <View className={cardStyle.defaultCard} style={{ width: '100%', height: '100%' }}>
                  <View className="flex-1 justify-center">
                    <Text className={`${TextStyles.heading} mb-4`}>Explanation</Text>
                    <Text className={TextStyles.pg}>{explanation}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          </Animated.View>

          {/* Carousel Indicator */}
          <CarouselIndicator />
        </View>
      </View>
    </View>
  );
};

const CardScreen: React.FC<DeckProps> = ({ category, difficulty, cards }) => {
  const [screen, setScreen] = useState('start');
  const cardStyle = CardStyles[difficulty];
  const buttonStyle = ButtonStyles[difficulty];
  const categoryLabel = CategoryLabels[category];
  const backgroundImage = BackgroundImages[categoryLabel][difficulty];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (screen === 'start') {
    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <View className="flex-1 items-center justify-between">
          <View className="flex-1 flex-col justify-center gap-5 px-8">
            <Text className={TextStyles.deckHeading}>{category}</Text>
            <Text className={TextStyles.deckSubheading}>{difficulty}</Text>
            <Text className={TextStyles.pg2}>Description</Text>
          </View>
          <Pressable onPress={() => setScreen('cards')} className={`${buttonStyle.continue} mb-12`}>
            <Text className={TextStyles.button}>Continue</Text>
          </Pressable>
        </View>
      </ImageBackground>
    );
  }

  if (screen === 'cards') {
    const cardData = cards[currentIndex];
    return (
      <View className={cardStyle.bg} style={{ width: '100%', height: '100%' }}>
        <View className="flex-1 items-center justify-center">
          <Card
            difficulty={cardData.difficulty}
            question={cardData.question}
            explanation={cardData.explanation}
            parentTip={cardData.parentTip}
            interactive={true}></Card>
          <Pressable
            onPress={() => {
              if (currentIndex + 1 >= cards.length) {
                setScreen('end');
              } else {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            className={buttonStyle.continue}>
            <Text className={TextStyles.button}>Next</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  if (screen === 'end') {
    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <View className="flex-1 items-center justify-between">
          <View className="flex-1 flex-col justify-center gap-5 px-8 pt-24">
            <Text className={TextStyles.deckHeading}>Congratulations!</Text>
            <Text className={TextStyles.pg2}>
              You have completed all the cards in the {category} topic, level {difficulty}.
            </Text>
          </View>
          <View style={{ gap: 16, marginBottom: 1 }}>
            <Pressable onPress={() => setScreen('cards')} className={`${buttonStyle.nextTopic}`}>
              <Text className={`${TextStyles.button} text-white`}>Next Topic</Text>
            </Pressable>
            <Pressable
              onPress={() => setScreen('cards')}
              className={`${buttonStyle.nextDifficulty}`}>
              <Text className={`${TextStyles.button} text-white`}>Next Difficulty Level</Text>
            </Pressable>
            <Link href="/" asChild>
              <Pressable className={`${buttonStyle.continue} mb-12`}>
                <Text className={TextStyles.button}>Back to Home</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ImageBackground>
    );
  }
};

export default CardScreen;
