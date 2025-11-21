import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CardScreen from '../components/Card';
import { getDeckCardsData } from '../services/dataService';

interface CardData {
  id: number;
  question: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  parentTip?: string;
}

interface DeckData {
  id: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cards: CardData[];
}

export default function CardsScreen() {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const [deckData, setDeckData] = useState<DeckData | null>(null);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  useEffect(() => {
    // Load deck 0 (Easy - Platforms and Privacy) and show first card
    const deck = getDeckCardsData(parseInt(deckId));
    if (deck && deck.cards.length > 0) {
      setDifficulty(deck.difficulty as 'Easy' | 'Medium' | 'Hard');
      setDeckData({
        ...deck,
        difficulty: deck.difficulty as 'Easy' | 'Medium' | 'Hard',
        cards: deck.cards.map((card) => ({
          id: card.id,
          question: card.question,
          explanation: card.explain,
          difficulty: deck.difficulty as 'Easy' | 'Medium' | 'Hard',
          parentTip: card.parentTip,
        })),
      });
    }
  }, []);

  if (!deckData) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl">Loading deck...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <CardScreen
        id={deckData.id}
        difficulty={difficulty}
        category={deckData.category}
        cards={deckData.cards}
      />
    </View>
  );
}
