export const RECIEVE_DECKS = 'RECIEVE_DECKS';

import {getDecks, addCardToDeck, saveDeckTitle} from '../utils/api';

export const recieveDecks = decks => ({
  type: RECIEVE_DECKS,
  decks
});

export const fetchDecks = () => dispatch =>
  getDecks().then(data => {
    dispatch(recieveDecks(data));
  });

export const addQuestionToDeckID = deck => dispatch =>
  addCardToDeck(deck).then(data => {
    dispatch(fetchDecks());
  });

export const savenewdeck = title => dispatch =>
  saveDeckTitle(title).then(data => {
    dispatch(fetchDecks());
  });
