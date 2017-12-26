import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {savenewdeck, fetchDecks} from '../actions';
import {white, purple} from '../utils/colors';

class NewDeck extends Component {
  state = {
    title: ''
  };

  handleSubmit = () => {
    const {title} = this.state;
    if (title === '') {
      Alert.alert('Please enter a new deck title');
    } else {
      this.props.savenewdeck({title});
      this.props.getDecks();
      this.props.navigation.goBack();
      this.setState({
        title: ''
      });
    }
  };

  render() {
    const {title} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Deck</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Title"
          onChangeText={title => this.setState({title})}
        />
        <TouchableOpacity
          onPress={this.handleSubmit}
          style={
            Platform.OS === 'ios' ? (
              styles.iosSubmitBtn
            ) : (
              styles.AndroidSubmitBtn
            )
          }
        >
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  savenewdeck: title => dispatch(savenewdeck(title)),
  getDecks: () => dispatch(fetchDecks())
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  input: {
    height: 100,
    fontSize: 20
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

export default connect(null, mapDispatchToProps)(NewDeck);
