import { markOnboardingSeen } from '@/services/onboardingService';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';
import {
  Pressable,
  Text,
  View,
  Image,
} from 'react-native';

type OnboardingSlide = {
  id: string;
  paragraphs: { text: string; bold?: boolean }[][];
};

const slides: OnboardingSlide[] = [
  {
    id: 'slide-1',
    paragraphs: [
      [
        { text: 'Children & youth need ' },
        { text: 'support and guidance', bold: true },
        { text: ' to stay safe online.' },
      ],
      [
        { text: 'Starting conversations early and having them often is the best thing you can do to ' },
        { text: 'keep your child safe online.', bold: true },
      ],
    ],
  },
  {
    id: 'slide-2',
    paragraphs: [
      [
        { text: 'Use these cards to learn how to talk about tough topics and ' },
        { text: 'create boundaries together', bold: true },
        { text: '.' },
      ],
      [
        { text: 'Join your child/children and ' },
        { text: 'discuss', bold: true },
        { text: ' these questions ' },
        { text: 'together.', bold: true },
      ],
    ],
  },
  {
    id: 'slide-3',
    paragraphs: [
      [
        { text: 'Flip to the back of the cards for ' },
        { text: 'tips', bold: true },
        { text: ' and ' },
        { text: 'resources', bold: true },
        { text: '.' },
      ],
      [
        { text: 'You can ' },
        { text: 'skip any cards', bold: true },
        { text: " you don't want to use." },
      ],
    ],
  },
];

export default function OnboardingScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finishOnboarding = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    await markOnboardingSeen();
    router.replace('/Dashboard');
  };

  const handleNext = () => {
    if (currentIndex >= slides.length - 1) return;
    const nextIndex = currentIndex + 1;
    pagerRef.current?.setPage(nextIndex);
  };

  const handlePageSelected = (event: { nativeEvent: { position: number } }) => {
    setCurrentIndex(event.nativeEvent.position);
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <View className="flex-1 bg-[#FAFAFB] pt-20 pb-10">
      <View className="mt-32 justify-center items-center">
        <Image source={require('../assets/act-icon.png')} style={{ width: 200, height: 130 }} />
        <Text className="mt-16 font-goldplay-semibold text-3xl text-[#101828]">Welcome</Text>
      </View>

      <View className="flex-1">
        <PagerView
          ref={pagerRef}
          style={{ flex: 1 }}
          initialPage={0}
          onPageSelected={handlePageSelected}>
          {slides.map((item) => (
            <View key={item.id} className="px-6">
              <View className="h-full px-6 py-8">
                {item.paragraphs.map((paragraph, paragraphIndex) => (
                  <Text
                    key={`paragraph-${item.id}-${paragraphIndex}`}
                    className="mt-5 font-jost text-lg leading-7 text-[#344054]">
                    {paragraph.map((part, partIndex) => (
                      <Text
                        key={`part-${item.id}-${paragraphIndex}-${partIndex}`}
                        className={part.bold ? 'font-jost-semibold text-[#101828]' : undefined}>
                        {part.text}
                      </Text>
                    ))}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </PagerView>
      </View>
      <View className="mb-32">
        <View className="mt-6 flex-row items-center justify-center gap-2">
          {slides.map((slide, index) => (
            <View
              key={slide.id}
              className={index === currentIndex ? 'h-2 w-2 rounded-full bg-[#374466]' : 'h-2 w-2 rounded-full bg-[#CBD5E1]'}
            />
          ))}
        </View>

        <View className="mt-8 flex-row items-center justify-center px-6">
          <Pressable
            className="h-12 w-full rounded-xl bg-[#2598BB] px-5 items-center justify-center"
            onPress={isLastSlide ? finishOnboarding : handleNext}
            disabled={isSubmitting}>
            <Text className="font-jost-semibold text-lg text-base text-white">
              {isSubmitting ? 'Loading...' : isLastSlide ? 'Get Started' : 'Continue'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
