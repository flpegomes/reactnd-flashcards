import { generateUID } from "../utils/helpers";

export const SET_DECKS = 'SET_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const RECORD_SESSION = 'RECORD_SESSION'
export const STUDY_TIME = 'STUDY_TIME'
export const EDIT_DECK = 'EDIT_DECK'
export const DELETE_DECK = 'DELETE_DECK'

// Set Decks function - after fetching, after sorting, after Asyncing
export function setDecks( decks ) {
  return {
    type: SET_DECKS,
    decks
  }
}

export function handleSortDecks( decks, cards ) {
  return ( dispatch ) => {
    // Delete anything undefined from decks
    Object.keys(decks).forEach(key => decks[key] === undefined && delete decks[key])

    // Turn objects into arrays for easier sorting - maybe easier?
    const deckArray = Object.keys(decks).map(i => decks[i])
    const cardArray = Object.keys(cards).map(i => cards[i])

    // Sort cards into a new array of arrays
    const sortedDecks = deckArray.map((deck) => {
      return cardArray.filter((card) => {
        if (deck.level === card.level) {
          return card.id
        }
      })
    })

    // Place the sorted cards into their respective decks
    Object.keys(decks).forEach((key, i) => {
      // return decks[key].cards = sortedDecks[i] // This returns the whole card object
      return decks[key].cards = sortedDecks[i].map((card) => card.id) // Just store the card IDs, not the whole object
    })

    // Dispatch the sort function to save to Redux state 
    dispatch( setDecks(decks) )
  }
}

// Add deck
function newDeck( deck ) {
  return {
    type: NEW_DECK,
    deck
  }
}

export function handleNewDeck( id, name, description, image ) {
  return async ( dispatch, getState ) => {
    const formattedDeck = formatDeck({ id, name, description, image })
    await dispatch( newDeck( formattedDeck ))
    await dispatch( setDecks( getState().decks ))
  }
}

function formatDeck({ id, name, description, image }) {
  return {
    id,
    name,
    description,
    image,
    cards: []
  }
}

// Add card to deck
export function handleAddCardToDeck( deckId, card ) {
  return async ( dispatch, getState ) => {
    await dispatch( addCardToDeck( deckId, card ) )
    await dispatch( setDecks( getState().decks ))
  }
}

function addCardToDeck( deckId, card ) {
  return {
    type: ADD_CARD_TO_DECK,
    deckId,
    card
  }
}

// Increase study time for either studying cards or doing the quiz
function studyTime( studiedDeckId, time ) {
  return {
    type: STUDY_TIME,
    studiedDeckId,
    time
  }
}

// Study / Quizzing Session
function recordSession( sessionDeckId, sessionType, session ) {
  return {
    type: RECORD_SESSION,
    sessionDeckId,
    sessionType,
    session
  }
}

export function handleRecordSession(  studiedDeckId, sessionType, timeElapsed, dateTime, known, unknown, reviewing, score ) {
    return async ( dispatch, getState ) => {
    await dispatch( studyTime( studiedDeckId, timeElapsed ))
    await dispatch( recordSession( studiedDeckId, sessionType,
      { dateTime, timeElapsed, known, unknown, reviewing, score }
    ))
    await dispatch( setDecks( getState().decks ))
  }
}

// Edit deck
export function editDeck( deckId, name, description, image ) {
  return {
    type: EDIT_DECK,
    deckId,
    name,
    description,
    image
  }
}

// Delete deck
export function deleteDeck( deckId ) {
  return {
    type: DELETE_DECK,
    deckId
  }
}