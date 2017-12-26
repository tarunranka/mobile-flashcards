import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform
} from 'react-native';
import {connect} from 'react-redux';
import {fetchDeck} from '../actions';
import {white, purple} from '../utils/colors';
import {clearLocalNotification} from '../utils/helper';

class StartQuiz extends Component {
  state = {
    currentcount: 0,
    correctcount: 0,
    complete: false
  };
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params;
    return {
      title: `Start Quiz on ${title}`
    };
  };
  showAnswer = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  };
  CommonSubmit() {
    const {currentcount, complete} = this.state;
    const navigation = this.props.navigation;
    const title = navigation.state.params.title;
    const deck = this.props.decks[title];
    const questions = deck['questions'];
    this.setState({currentcount: currentcount + 1});
    if (currentcount + 1 === questions.length) {
      this.setState({complete: true});
      clearLocalNotification();
    }
  }
  correctSubmit = () => {
    const {correctcount} = this.state;
    this.setState(() => ({correctcount: correctcount + 1}));
    this.CommonSubmit();
  };
  IncorrectSubmit = () => {
    this.CommonSubmit();
  };
  restartQuiz = () => {
    this.setState(state => {
      return {
        currentcount: 0,
        correctcount: 0,
        complete: false
      };
    });
  };
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({value}) => {
      this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
  }

  render() {
    const navigation = this.props.navigation;
    const title = navigation.state.params.title;
    const deck = this.props.decks[title];
    const questions = deck['questions'];
    const frontAnimatedStyle = {
      transform: [{rotateY: this.frontInterpolate}]
    };
    const backAnimatedStyle = {
      transform: [{rotateY: this.backInterpolate}]
    };
    if (!this.state.complete) {
      return (
        <View style={styles.container}>
          <View style={styles.breadCrumd}>
            <Text>{this.state.currentcount + 1}</Text>
            <Text>/</Text>
            <Text>{questions.length}</Text>
          </View>
          <View style={styles.center}>
            <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
              <Text style={styles.question}>
                {questions[this.state.currentcount].question}
              </Text>
              <Text style={styles.answer} onPress={this.showAnswer}>
                Answer
              </Text>
            </Animated.View>
            <Animated.View
              style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}
            >
              <Text>{questions[this.state.currentcount].answer}</Text>
              <Text style={styles.answer} onPress={this.showAnswer}>
                Question
              </Text>
            </Animated.View>
            <TouchableOpacity
              onPress={this.correctSubmit}
              style={[
                Platform.OS === 'ios'
                  ? styles.iosSubmitBtn
                  : styles.AndroidSubmitBtn,
                {marginTop: 10}
              ]}
            >
              <Text style={styles.submitBtnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.IncorrectSubmit}
              style={[
                Platform.OS === 'ios'
                  ? styles.iosSubmitBtn
                  : styles.AndroidSubmitBtn,
                {marginTop: 10}
              ]}
            >
              <Text style={styles.submitBtnText}>InCorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      let total = 0;
      if (this.state.correctcount !== 0) {
        total = Math.round(this.state.correctcount / questions.length * 100);
      }
      return (
        <View style={styles.container}>
          <Text style={styles.question}>You have completed quiz.</Text>
          <Text style={styles.answer}>Correct percentage {total}%</Text>
          <Text style={styles.answer}>
            {this.state.correctcount} question(s) have been answered correctly
            outof {questions.length}
          </Text>
          <TouchableOpacity
            onPress={this.restartQuiz}
            style={[
              Platform.OS === 'ios'
                ? styles.iosSubmitBtn
                : styles.AndroidSubmitBtn,
              {marginTop: 10}
            ]}
          >
            <Text style={styles.submitBtnText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = ({decks}, ownProps) => ({
  decks: decks || []
});

const mapDispatchToProps = dispatch => ({
  getDeck: id => dispatch(fetchDeck(id))
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  breadCrumd: {
    flex: 1,
    flexDirection: 'row'
  },
  center: {
    flex: 1,
    alignItems: 'center'
  },
  question: {
    fontSize: 30,
    textAlign: 'center'
  },
  answer: {
    fontSize: 15,
    marginTop: 5,
    textAlign: 'center'
  },
  flipCard: {
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    position: 'absolute',
    top: 0
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

export default connect(mapStateToProps, mapDispatchToProps)(StartQuiz);
