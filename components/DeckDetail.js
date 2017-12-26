import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform
} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {white, purple} from '../utils/colors';
import {fetchDecks} from '../actions';

class DeckDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return {
      title: title
    };
  };
  componentDidMount() {
    this.props.getDecks();
  }
  toAddCard = () => {
    const {title} = this.props.navigation.state.params;
    this.props.navigation.navigate('AddCard', {
      title: title
    });
  };
  toStartQuiz = () => {
    const {title} = this.props.navigation.state.params;
    this.props.navigation.navigate('StartQuiz', {
      title: title
    });
  };
  render() {
    const navigation = this.props.navigation;
    const title = navigation.state.params.title;
    const deck = this.props.decks[title];
    if (typeof deck === 'undefined' && deck.length === 0) {
      return <ActivityIndicator style={{marginTop: 30}} />;
    } else {
      const questions = deck['questions'];
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>
            {`${deck.questions.length} cards`}
          </Text>
          <TouchableOpacity
            onPress={this.toAddCard}
            style={[
              Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn,
              {marginTop: 10}
            ]}
          >
            <Text style={styles.submitBtnText}>Add Card</Text>
          </TouchableOpacity>
          {questions.length != 0 && (
            <TouchableOpacity
              onPress={this.toStartQuiz}
              style={[
                Platform.OS === 'ios'
                  ? styles.iosSubmitBtn
                  : styles.AndroidSubmitBtn,
                {marginTop: 10}
              ]}
            >
              <Text style={styles.submitBtnText}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
  }
}
const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(fetchDecks())
});

const mapStateToProps = ({decks}, ownProps) => ({
  decks: decks || []
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
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);
