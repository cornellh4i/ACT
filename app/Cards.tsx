import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Card from '../components/Card';
import { getDeckCardsData } from '../services/dataService';

interface CardData {
  id: number;
  question: string;
  explain: string;
  parentTip?: string;
}

interface DeckData {
  id: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cards: CardData[];
}

export default function CardsScreen() {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  useEffect(() => {
    // Load deck 0 (Easy - Platforms and Privacy) and show first card
    const deck = getDeckCardsData(2);
    if (deck && deck.cards.length > 0) {
      setCardData(deck.cards[0]);
      setDifficulty(deck.difficulty as 'Easy' | 'Medium' | 'Hard');
    }
  }, []);

  if (!cardData) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl">Loading card...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Card
        difficulty={difficulty}
        question={cardData.question}
        explanation={cardData.explain}
        parentTip={cardData.parentTip}
        interactive={true}
      />
    </View>
  );
}
