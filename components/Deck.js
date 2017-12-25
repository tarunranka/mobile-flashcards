import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {fetchDecks} from '../actions';
import {white, purple} from '../utils/colors';
class Deck extends Component {
  componentDidMount() {
    this.props.getDecks();
  }
  renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('DeckDetail', {title: item.title})}
        >
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cardCount}>
            {`${item.questions.length} cards`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  _keyExtractor = (item, index) => index;
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.decks}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

function mapStateToProps({decks}, ownProps) {
  return {
    decks: decks ? Object.keys(decks).map(key => decks[key]) : []
  };
}

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(fetchDecks())
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },
  title: {
    fontSize: 30
  },
  cardCount: {
    fontSize: 16
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Deck);
