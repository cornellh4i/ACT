import safetyData from '../data/act_safety_decks.json';

export const getCardData = (cardId: number) => {
  // TODO: Implement this function to find the card in safetyData that has id equal to cardId,
  // and return specific data about the card (that will be helpful when implementing your card UI)
  // return type should be:
  //   {
  //     id: card.id,
  //     question: ...,
  //     explain: ...,
  //     parent tip: ...,
  //     difficulty: found in deck.difficulty
  //   }
  // If a card with id == cardId does not exist, return null
  // Pseudocode:
  // iterate through all decks:
  //   iterate through all of current deck's cards
  //     check if card id == cardId, return json of card data if true
  // if no card found return null
  // good luck y'all!!
  throw new Error('Not implemented yet');
};

export const getCardDifficulty = (cardId: number) => {
  // TODO: Implement this function to return the card in safetyData that has id equal to cardId
  // If a card with id == cardId does not exist, return null
  // Pseudocode:
  // iterate through all decks:
  //   iterate through all of current deck's cards
  //     check if card id == cardId, return card if true
  // if no card found return null
  // good luck y'all!!
  throw new Error('Not implemented yet');
};