import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList } from 'react-native'
import { Container, Content } from 'native-base'
import FlashcardItem from '../shared/FlashcardItem'
import FloatingActionButton from '../shared/FloatingActionButton'

class CardList extends Component {
  render() {
    const { decks, cards } = this.props

    return (
      <Container>
        <Content padder>
          <FlatList
            keyExtractor={(item, i) => {return i.toString()}}
            data={cards}
            renderItem={(card) =>
              <FlashcardItem card={card} />
            }
          >
          </FlatList>
        </Content>

        <FloatingActionButton />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20
  }
})

function mapStateToProps(state) {
  return { cards: state.cards }
}

export default connect(mapStateToProps)(CardList)