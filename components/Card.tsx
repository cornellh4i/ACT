import {
  Deck,
  getCurrentProfile,
  getProfileProgress,
  updateDeckProgress,
} from '@/services/profileService';
import InappropriateEasy from 'assets/deck-covers/inappropriate-content-easy.png';
import InappropriateHard from 'assets/deck-covers/inappropriate-content-hard.png';
import InappropriateMedium from 'assets/deck-covers/inappropriate-content-medium.png';
import RightArrow from 'assets/right-pointing-arrow.png';
import ExitIcon from 'assets/x-exit.png';
import { Link } from 'expo-router';
import { default as React, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ImageBackground, Pressable, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  interpolate,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

type screen = 'start' | 'cards' | 'end';

type Category =
  | 'inappropriateContent'
  | 'onlineInteractions'
  | 'platformsAndPrivacy'
  | 'socialMediaAndMentalHealth'
  | 'screentime';

// TODO: add images for other categories
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
  id: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cards: CardProps[];
}

interface CardProps {
  id: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  explanation: string;
  parentTip?: string;
  interactive?: boolean;
  onFirstFlip?: () => void;
}

const Card: React.FC<CardProps> = ({
  difficulty,
  question,
  explanation,
  parentTip,
  interactive = true,
  onFirstFlip,
}) => {
  const { width: screenWidth } = Dimensions.get('window');
  const cardWidth = screenWidth * 0.9;
  const bleedOffset = (screenWidth - cardWidth) / 2;
  const containerPadding = 8; // matches `p-2`
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
      // Notify parent on first flip attempt
      if (onFirstFlip) {
        onFirstFlip();
      }
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
    <View style={{ width: '100%', height: 600, zIndex: 1, elevation: 5, alignItems: 'center' }}>
      <View
        className={`${cardStyle.bg} rounded-[26px] p-2`}
        style={{ width: '90%', height: '100%', overflow: 'visible' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'visible',
            elevation: 10,
            zIndex: 20,
          }}>
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
          <Animated.View
            style={[backAnimatedStyle, { overflow: 'visible' }]}
            pointerEvents={isCardFlipped ? 'auto' : 'none'}>
            {parentTip ? (
              <PagerView
                ref={pagerRef}
                style={{
                  flex: 1,
                  width: screenWidth,
                  marginLeft: -(bleedOffset + containerPadding),
                }}
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
                      style={{ width: cardWidth, alignSelf: 'center', height: '100%' }}>
                      <View className="flex-1 justify-center">
                        <Text className={`${TextStyles.heading} mb-4`}>Explanation</Text>
                        <Text className={TextStyles.pg}>{explanation}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>

                {/* Page 2: Parent Tip */}
                <View key="2" style={{ flex: 1 }}>
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
                      style={{ width: cardWidth, alignSelf: 'center', height: '100%' }}>
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

const CardScreen: React.FC<DeckProps> = ({ id, category, difficulty, cards }) => {
  const [screen, setScreen] = useState('start');
  const cardStyle = CardStyles[difficulty];
  const buttonStyle = ButtonStyles[difficulty];
  const categoryLabel = CategoryLabels[category];
  const backgroundImage = BackgroundImages[categoryLabel][difficulty];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedProgress, setFlippedProgress] = useState<boolean[]>(() => cards.map(() => false));
  const [currentProfile, setCurrentProfile] = useState<number | null>(null);
  const [profileProgress, setProfileProgress] = useState<Record<string, Deck> | null>(null);
  const [deckProgressData, setDeckProgressData] = useState<Deck>({
    id: `deck_${id}`,
    viewedCardIds: [],
    viewedCount: 0,
    totalCount: cards.length,
    lastOpenedAt: '',
    completedAt: '',
  });

  useEffect(() => {
    (async () => {
      const profile = await getCurrentProfile();
      setCurrentProfile(profile);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentProfile == null) return;

      const progress = await getProfileProgress(currentProfile);
      if (!progress || !progress['progress']) return;

      setProfileProgress(progress);

      const existingDeck = progress[`deck_${id}`];

      if (existingDeck) {
        setDeckProgressData(existingDeck);
      }
    })();
  }, [currentProfile, id, cards.length]);

  const ExitToHome = () => (
    <SafeAreaView
      edges={['top']}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
      <Link href="/" asChild>
        <Pressable style={{ alignSelf: 'flex-start', marginTop: 0, marginLeft: 16, padding: 8 }}>
          <Image source={ExitIcon} style={{ width: 16, height: 16 }} />
        </Pressable>
      </Link>
    </SafeAreaView>
  );

  const DeckHeader = React.useMemo(
    () => (
      <SafeAreaView
        edges={['top']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Link href="/" asChild>
            <Pressable style={{ position: 'absolute', left: 16, marginTop: 0, padding: 8 }}>
              <Image source={ExitIcon} style={{ width: 16, height: 16 }} />
            </Pressable>
          </Link>
          <Text
            className={`${TextStyles.button} text-white`}
            style={{ marginTop: 0 }}>{`${currentIndex + 1}/${cards.length}`}</Text>
        </View>
        <View style={{ height: 8, width: '100%', backgroundColor: '#FFFFFF', marginTop: 16 }}>
          <View
            style={{
              height: '100%',
              width: `${(flippedProgress.filter(Boolean).length / Math.max(cards.length, 1)) * 100}%`,
              backgroundColor: ((): string => {
                if (difficulty === 'Easy') return '#0E5336';
                if (difficulty === 'Medium') return '#184755';
                return '#470E53';
              })(),
            }}
          />
        </View>
      </SafeAreaView>
    ),
    [currentIndex, flippedProgress, cards.length, difficulty],
  );

  if (screen === 'start') {
    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <ExitToHome />
        <View className="flex-1 items-center justify-between">
          <View className="flex-1 flex-col justify-center gap-5 px-8">
            <Text className={TextStyles.deckHeading}>{category}</Text>
            <Text className={TextStyles.deckSubheading}>{difficulty}</Text>
            <Text className={TextStyles.pg2}>Description</Text>
          </View>
          <Pressable
            onPress={() => {
              setDeckProgressData((prev) => {
                const updated = { ...prev, lastOpenedAt: new Date().toISOString() };
                if (currentProfile !== null)
                  updateDeckProgress(currentProfile, updated.id, updated);
                return updated;
              });
              setScreen('cards');
            }}
            className={`${buttonStyle.continue} mb-12`}>
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
        {DeckHeader}
        <View className="flex-1 items-center justify-center" style={{ paddingTop: 24 }}>
          <Animated.View
            key={`card-${currentIndex}`}
            entering={SlideInRight.duration(200)}
            exiting={SlideOutLeft.duration(200)}
            style={{ width: '100%', alignItems: 'center' }}>
            <Card
              id={cardData.id}
              key={currentIndex}
              difficulty={cardData.difficulty}
              question={cardData.question}
              explanation={cardData.explanation}
              parentTip={cardData.parentTip}
              interactive={true}
              onFirstFlip={() => {
                if (!flippedProgress[currentIndex]) {
                  setFlippedProgress((prev) => {
                    const next = [...prev];
                    next[currentIndex] = true;
                    return next;
                  });
                  setDeckProgressData((prev) => {
                    const updated = {
                      ...prev,
                      viewedCardIds: [...prev.viewedCardIds, cardData.id],
                      viewedCount: prev.viewedCount + 1,
                    };
                    if (currentProfile !== null)
                      updateDeckProgress(currentProfile, updated.id, updated);
                    return updated;
                  });
                  setScreen('cards');
                }
              }}
            />
          </Animated.View>
          <Text
            style={{ color: '#E4E5E7', fontSize: 16, marginTop: 16, fontFamily: 'Jost-Regular' }}>
            Tap to Flip
          </Text>
        </View>
        <Pressable
          onPress={() => {
            // If current card hasn't been flipped, mark it as flipped so progress advances
            if (!flippedProgress[currentIndex]) {
              setFlippedProgress((prev) => {
                const next = [...prev];
                next[currentIndex] = true;
                return next;
              });
            }
            if (currentIndex + 1 >= cards.length) {
              setScreen('end');
            } else {
              setCurrentIndex(currentIndex + 1);
            }
            setDeckProgressData((prev) => {
              if (!prev.viewedCardIds.includes(cardData.id)) {
                // If current card hasn't been flipped, update deck progress
                const updated = {
                  ...prev,
                  viewedCardIds: [...prev.viewedCardIds, cardData.id],
                  viewedCount: prev.viewedCount + 1,
                  ...(currentIndex + 1 >= cards.length && {
                    completedAt: new Date().toISOString(),
                  }),
                };
                if (currentProfile !== null) {
                  updateDeckProgress(currentProfile, updated.id, updated);
                }
                return updated;
              } else if (
                prev.viewedCardIds.includes(cardData.id) &&
                currentIndex + 1 >= cards.length
              ) {
                const updated = {
                  ...prev,
                  completedAt: new Date().toISOString(),
                };
                if (currentProfile !== null) {
                  updateDeckProgress(currentProfile, updated.id, updated);
                }
                return updated;
              }
              return prev;
            });
          }}
          style={{
            position: 'absolute',
            bottom: 48,
            right: 48,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <Text className={`${TextStyles.button} text-white`} style={{ fontSize: 20 }}>
            Next
          </Text>
          <Image source={RightArrow} style={{ width: 28, height: 28, marginTop: -4 }} />
        </Pressable>
      </View>
    );
  }

  if (screen === 'end') {
    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <ExitToHome />
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
