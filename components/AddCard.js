import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {addQuestionToDeckID} from '../actions';
import {white, purple} from '../utils/colors';
import {NavigationActions} from 'react-navigation';

function SubmitBtn({onPress}) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
}
class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return {
      title: `Add card to ${title}`
    };
  };
  submit = () => {
    const {question, answer} = this.state;
    const {title} = this.props.navigation.state.params;
    if (question === '' || answer === '') {
      Alert.alert('Please enter a Question and Answer');
    } else {
      const deck = {
        title,
        card: {
          question,
          answer
        }
      };
      this.props.addQuestionToDeckID(deck).then(data => {
        this.setState({question: ''});
        this.setState({answer: ''});
        this.toDeckDetail();
      });
    }
  };
  toDeckDetail = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Question</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Question"
          onChangeText={question => this.setState({question})}
        />
        <Text>Answer</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Answer"
          onChangeText={answer => this.setState({answer})}
        />
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
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

const mapStateToProps = ({decks}, ownProps) => ({
  decks: decks || []
});
const mapDispatchToProps = dispatch => ({
  addQuestionToDeckID: deck => dispatch(addQuestionToDeckID(deck))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
