import {RECIEVE_DECKS} from '../actions';
export default function(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DECKS:
      return {
        ...state,
        decks: action.decks
      };
    default:
      return state;
  }
}
