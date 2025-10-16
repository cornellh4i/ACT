import safetyData from '../data/act_safety_decks.json';

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

  throw new Error("Not implemented yet!")
};