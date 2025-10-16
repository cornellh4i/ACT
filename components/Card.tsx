import React from 'react';
import { Text, View } from 'react-native';

const CardStyles = {
  Easy: {
    bg: 'bg-[#12754C]',
    defaultCard: 'bg-[#E8F1E7] w-[80%] h-[60em] opacity-100 rotate-0 rounded-[24px] p-8',
    questionCard: 'bg-[#FFFFFF] w-[80%] h-[60em] opacity-100 rotate-0 rounded-[24px] p-8',
  },
  Medium: {
    bg: 'bg-[#2C7388]',
    defaultCard: 'bg-[#E7EEF1] w-[80%] h-[60em] opacity-100 rotate-0 rounded-[24px] p-8',
    questionCard: 'bg-[#FFFFFF] w-[80%] h-[60em] opacity-100 rotate-0 rounded-[24px] p-8',
  },
  Hard: {
    bg: 'bg-[#814794]',
    defaultCard: 'bg-[#ECE3F1] w-[80%] h-[60em] opacity-100 rotate-0 rounded-[24px] p-8',
    questionCard: 'bg-[#FFFFFF] w-[80%] h-[60em] opacity-100 rotate-0 rounded-[24px] p-8',
  },
};

const TextStyles = {
  header: 'text-[#27282A] font-bold text-[26px] leading-[32px] font-[GoldplayAlt]',
  pg: 'text-[#27282A] font-bold text-[16px] leading-[20px] font-[Jost]',
};

interface CardProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  question: string;
  explanation: string;
  parentTip: string | undefined;
  state: 'question' | 'explanation' | 'parentTip';
}

const Card: React.FC<CardProps> = ({
  difficulty,
  question,
  explanation,
  parentTip,
  state = 'question',
}) => {
  const cardStyle = CardStyles[difficulty];
  const getContent = () => {
    switch (state) {
      case 'question':
        return (
          <View className={cardStyle.questionCard}>
            <View className="flex-1 justify-center">
              <Text className={TextStyles.header}>{question}</Text>
            </View>
          </View>
        );
      case 'explanation':
        return (
          <View className={cardStyle.defaultCard}>
            <View className="flex-1 justify-center">
              <Text className={`${TextStyles.header} mb-4`}>Explanation</Text>
              <Text className={TextStyles.pg}>{explanation}</Text>
            </View>
          </View>
        );
      case 'parentTip':
        if (!parentTip) return null;
        return (
          <View className={cardStyle.defaultCard}>
            <View className="flex-1 justify-center">
              <Text className={`${TextStyles.header} mb-4`}>Parent Tip</Text>
              <Text className={TextStyles.pg}>{parentTip}</Text>
            </View>
          </View>
        );
    }
  };
  return <View className={cardStyle.bg}>{getContent()}</View>;
};

export default Card;
