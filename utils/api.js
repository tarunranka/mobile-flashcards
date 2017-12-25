import {AsyncStorage} from 'react-native';
import {QUIZ_STORAGE_KEY, formatQuizResults} from './helper';

export function getDecks() {
  return AsyncStorage.getItem(QUIZ_STORAGE_KEY).then(formatQuizResults);
}

export function getDeck({title}) {
  return getDecks().then(decks => decks[title]);
}

export function addCardToDeck({title, card}) {
  return getDeck({title}).then(deck => {
    deck.questions.push(card);

    return AsyncStorage.mergeItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({[title]: deck})
    );
  });
}

export function saveDeckTitle({title}) {
  return AsyncStorage.mergeItem(
    QUIZ_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        questions: []
      }
    })
  );
}
