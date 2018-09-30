import { SET_DECKS, NEW_DECK, ADD_CARD_TO_DECK, EDIT_DECK, DELETE_DECK } from '../actions/decks'
import { AsyncStorage } from 'react-native'

export default (state = {}, action) => {
  switch ( action.type ) {

    case SET_DECKS:
      // save sortedDecks in AsyncStorage
      if ( action.decks ) {
        AsyncStorage.setItem( 'KBH:Decks', JSON.stringify(action.decks) )
          console.log('Sorted decks saved to storage.', action.decks)
      }
      return {
        ...state,
        ...action.decks
      }

    case NEW_DECK:
      // save new deck in AsyncStorage
      // if ( action.deck ) {
      //   AsyncStorage.setItem('decks', [...state.decks, action.deck])
      // }
      const { deck } = action
      return {
        ...state,
        [deck.id]: deck
      }

    case ADD_CARD_TO_DECK:
      const { deckId, card } = action
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          cards: state[deckId].cards.concat([card])
        }
      }

    default: 
      return state
  }
}