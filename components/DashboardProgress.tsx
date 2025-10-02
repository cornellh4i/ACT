import React from 'react';
import { View, Text, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface DashboardProgressProps {
  progressBar: number;
  cardsRemaining: number;
  completedDecks: number;
  lastCheckin: string;
}

interface ProgressCircleProps {
  style?: { height: number };
  progress: number;
  progressColor: string;
  startAngle: number;
  endAngle: number;
  strokeWidth: number;
  backgroundColor?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  style = { height: 320 },
  progress,
  progressColor,
  startAngle,
  endAngle,
  strokeWidth,
  backgroundColor = 'white',
}) => {
  const animatedProgress = useSharedValue(progress);

  React.useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1000 });
  }, [progress]);

  const height = style.height;
  const radius = (height - strokeWidth) / 2;
  const center = height / 2;

  const createArcPath = (progressValue: number, start: number, end: number) => {
    'worklet';
    const totalAngle = end - start;
    const currentAngle = start + totalAngle * progressValue;

    const startX = center + radius * Math.cos(start);
    const startY = center + radius * Math.sin(start);
    const endX = center + radius * Math.cos(currentAngle);
    const endY = center + radius * Math.sin(currentAngle);

    const largeArcFlag = Math.abs(currentAngle - start) > Math.PI ? 1 : 0;

    return `
      M ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
    `;
  };

  const backgroundPath = createArcPath(1, startAngle, endAngle);

  const animatedProps = useAnimatedProps(() => {
    return {
      d: createArcPath(animatedProgress.value, startAngle, endAngle),
    };
  });

  return (
    <Svg width={height} height={height} viewBox={`0 0 ${height} ${height}`}>
      {/* Background arc (unfilled) */}
      <Path
        d={backgroundPath}
        stroke={backgroundColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress arc (filled) */}
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
    </Svg>
  );
};

const DashboardProgress: React.FC<DashboardProgressProps> = ({
  progressBar,
  cardsRemaining,
  completedDecks,
  lastCheckin,
}) => {
  return (
    <View
      className="bg-[#8CC5CF] rounded-3xl"
      style={{ width: 355, height: 175, padding: 24 }}
    >
      <View className="flex-row justify-between items-start">
        {/* Left side - Progress Arc and Cards Remaining */}
        <View className="items-center" style={{ marginTop: 8 }}>
          <View className="relative">
            <ProgressCircle
              style={{ height: 150 }}
              progress={progressBar}
              progressColor="#374466"
              startAngle={-Math.PI}
              endAngle={0}
              strokeWidth={28}
              backgroundColor="white"
            />
            <View className="absolute" style={{ top: 50, left: 0, right: 0, alignItems: 'center' }}>
              <Text
                className="text-[#374466]"
                style={{ fontSize: 40, fontWeight: '900', lineHeight: 48 }}
              >
                {cardsRemaining}
              </Text>
            </View>
          </View>
          <Text
            className="text-[#374466]"
            style={{ fontSize: 13, fontWeight: '600', marginTop: -58 }}
          >
            Total cards remaining
          </Text>
        </View>

        {/* Right side - Stats */}
        <View className="justify-around flex-1" style={{ marginLeft: 32, paddingTop: 5 }}>
          {/* Last check-in */}
          <View className="mb-6">
            <View className="flex-row items-center mb-1">
              <Image
                source={require('../assets/dashboard-progress/clock-rotate-left.png')}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <View>
                <Text
                  className="text-[#374466]"
                  style={{ fontSize: 16, fontWeight: '700', lineHeight: 26 }}
                >
                  {lastCheckin}
                </Text>
                <Text
                  className="text-[#374466]"
                  style={{ fontSize: 13, fontWeight: '600', lineHeight: 16 }}
                >
                  Last check-in
                </Text>
              </View>
            </View>
          </View>

          {/* Completed decks */}
          <View>
            <View className="flex-row items-center">
              <Image
                source={require('../assets/dashboard-progress/trophy.png')}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <View>
                <Text
                  className="text-[#374466]"
                  style={{ fontSize: 16, fontWeight: '700', lineHeight: 26 }}
                >
                  {completedDecks} decks
                </Text>
                <Text
                  className="text-[#374466]"
                  style={{ fontSize: 13, fontWeight: '600', lineHeight: 16 }}
                >
                  Completed
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardProgress;