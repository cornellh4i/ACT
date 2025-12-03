import { useState, useEffect, useCallback } from 'react';
import { getCategorizedDecks, Deck, DeckProgress } from '@/services/profileService';
import { getAllDecks } from '@/services/dataService';

export const useDashboardDecks = (profileId: number | null) => {
  const [recent, setRecent] = useState<Deck[]>([]);
  const [upNext, setUpNext] = useState<Deck[]>([]);
  const [completed, setCompleted] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!profileId) {
      // Don't clear the arrays, just return early
      return;
    }

    setLoading(true);
    try {
      const allDeckData = getAllDecks();
      const decksWithDefaults: Deck[] = allDeckData.map(deckData => ({
        ...deckData,
        viewedCardIds: [],
        viewedCount: 0,
        totalCount: deckData.cards.length,
        lastOpenedAt: undefined,
        completedAt: undefined,
      }));

      const result = await getCategorizedDecks(profileId, decksWithDefaults);
      
      if (result) {
        setRecent(result.recent);
        setUpNext(result.upNext);
        setCompleted(result.completed);
      }
    } catch (error) {
      console.error('Error loading categorized decks:', error);
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    recent,
    upNext,
    completed,
    refresh,
    loading,
  };
};