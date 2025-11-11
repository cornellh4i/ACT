import safetyData from '../data/act_safety_decks.json';


/**
 * Get all decks from the JSON file.
 */
export const getAllDecks = () => {
  return safetyData.decks || [];
};


export const getFilteredDecks = (selectedTopics?: string[], selectedDifficulties?: string[]) => {
  let filtered = safetyData.decks;

  if (selectedTopics && selectedTopics.length > 0) {
    filtered = filtered.filter((deck) => selectedTopics.includes(deck.category));
  }

  if (selectedDifficulties && selectedDifficulties.length > 0) {
    filtered = filtered.filter((deck) => selectedDifficulties.includes(deck.difficulty));
  }

  return filtered;
};

/**
 * Return a list of unique topic categories.
 */
export const getUniqueTopics = () => {
  const allDecks = getAllDecks();
  const topics = allDecks.map((deck) => deck.category);
  return Array.from(new Set(topics));
};

/**
 * Return a list of unique difficulty levels.
 */
export const getUniqueDifficulties = () => {
  const allDecks = getAllDecks();
  const difficulties = allDecks.map((deck) => deck.difficulty);
  return Array.from(new Set(difficulties));
};



export const getCardData = (cardId: number) => {
  for (const deck of safetyData["decks"]) {
     for (const card of deck["cards"]) {
      if (card.id == cardId) {
        return {
          id: card.id,
          question: card.question,
          explanation: card.explain,
          parentTip: card.parentTip,
          difficulty: deck.difficulty
        }
      }
     }
  }
  return null;
};

export const getDeckCardsData = (deckId: number) => {
  // TODO: Implement this function to find a deck by deckId and return deck data, including a list of the card data
  // from the cards in that deck.
  // return type should be:
  //   { id: deck.id
  //     category: deck.category
  //     difficulty: deck.difficulty
  //     cards:
  //     [
  //       cardId: card.id,
  //       question: ...,
  //       explain: ...,
  //       parent tip: ...,
  //     ],
  //     ...
  //   }
  // If a deck with id == deckId does not exist, return null

  for (const deck of safetyData["decks"]) {
    if (deckId == deck.id) {
      return {
        id: deck.id,
        category: deck.category,
        difficulty: deck.difficulty,
        cards: deck.cards
      }
    }
  }
  return null;
};