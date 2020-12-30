import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
// import moment from "moment";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
    };
    }
  componentDidMount() {
     this.setState({movie: this.props.route.params.movie});
  }
 
  render() {
    let {movie} = this.state;
    return (
      <View style={[styles.container, {backgroundColor: '#2352c6'}]}>
        <Text style={styles.yourDetails}>Movie Details</Text>
        <View style={styles.innerContentView}>
          <ScrollView style={{height: '100%', width: '100%'}}>
            <View style={styles.movieDetailView}>
              <Text
                style={styles.title}>
                {movie.title}
              </Text>
              <Image

                source={{
                  uri: 'https://image.tmdb.org/t/p/w500/' + movie.poster_path,
                }}
                style={styles.posterStyle}
                resizeMode={'stretch'}
              />
              <Text
                style={styles.subtitleStyle}>
                {movie.overview}
              </Text>
              <Text
                style={styles.subtitleStyle}>
                {`User Rating:${movie.vote_average}`}
              </Text>
              <Text
                style={styles.subtitleStyle}>
                {/* {`Release on${moment(movie.release_date).format('MMM DD YYYY')}`} */}
                {`Release on ${movie.release_date}`} 
              </Text>

            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(245,245,245)',
  },
  movieDetailView:{justifyContent: 'center', alignItems: 'center',padding:5},
  title:{fontSize: 16, fontWeight: 'bold', color: '#000000'},
  posterStyle:{height: 250, width: 250,borderRadius:5},
  subtitleStyle:{fontSize: 16,  color: '#000000'},
  
});
