import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Dashboard');
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>MyFilms</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2352c6',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
