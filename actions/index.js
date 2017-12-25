export const RECIEVE_DECKS = 'RECIEVE_DECKS';
export const RECIEVE_DECK = 'RECIEVE_DECK';
export const SAVE_DECK = 'SAVE_DECK';
import {getDecks, getDeck, addCardToDeck, saveDeckTitle} from '../utils/api';

export const recieveDecks = decks => ({
  type: RECIEVE_DECKS,
  decks
});

export const fetchDecks = () => dispatch =>
  getDecks().then(data => {
    dispatch(recieveDecks(data));
  });

export const recieveDeck = deck => ({
  type: RECIEVE_DECK,
  deck
});

export const fetchDeck = id => dispatch =>
  getDeck(id).then(data => {
    dispatch(recieveDeck(data));
  });

export const addQuestionToDeckID = deck => dispatch =>
  addCardToDeck(deck).then(data => {
    dispatch(fetchDecks());
  });

export const savedeck = deck => ({
  type: SAVE_DECK,
  deck
});

export const savenewdeck = title => dispatch =>
  saveDeckTitle(title).then(data => {
    dispatch(savedeck(data));
  });
