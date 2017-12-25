import {RECIEVE_DECKS, RECIEVE_DECK, ADD_CARD, SAVE_DECK} from '../actions';
export default function(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DECKS:
      return {
        ...state,
        decks: action.decks
      };
    case RECIEVE_DECK:
      return {
        ...state,
        deck: action.deck
      };
    case SAVE_DECK:
      return {
        ...state,
        decks: action.decks
      };
    default:
      return state;
  }
}
