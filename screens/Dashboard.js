import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {ButtonView} from './Common/CommonFunctions';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getMovieService} from '../service/services';
import Modal from 'react-native-modal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      sortingModal: false,
      pages: [],
      sortType: 'By most popular',
      pageNumber: 1,
    };
    this.ButtonView = ButtonView.bind(this);
  }

  componentDidMount() {
    let data = {
      page: 1,
      sort_by: 'popularity.desc',
    };
    getMovieService()
      .getMovie(data)
      .then((res) => {
        console.log('res', res);
        this.setState({data: res.results}, () => {
          this.array_range(1, res.total_pages);
        });
      });
  }

  array_range(start, len) {
    const arr = new Array(len);
    for (let i = 0; i < len; i++, start++) {
      arr[i] = start;
    }
    this.setState({pages: arr});
  }

  onContinue = (title) => {
    if (title == 'By most popular') {
      let data = {search: 1, sort_by: 'popularity.desc'};
      getMovieService()
        .getMovie(data)
        .then((res) => {
          this.setState(
            {
              data: res.results,
              sortingModal: false,
              sortType: 'By most popular',
            },
            () => {
              this.array_range(1, res.total_pages);
            },
          );
        });
    } else if (title == 'By highest rated') {
      let data = {search: 1, sort_by: 'vote_average.asc'};
      getMovieService()
        .getMovie(data)
        .then((res) => {
          this.setState(
            {
              data: res.results,
              sortingModal: false,
              sortType: 'By highest rated',
            },
            () => {
              this.array_range(1, res.total_pages);
            },
          );
        });
    }
  };

  onSearch() {
    let {search} = this.state;
    getMovieService()
      .searchMovie({search: search, sort_by: 'popularity.desc'})
      .then((res) => {
        console.log('res', res);
        this.setState({data: res.results}, () => {
          this.array_range(1, res.total_pages);
        });
      });
  }

  onSort() {
    this.setState({sortingModal: true});
  }

  renderModal() {
    let color = this.state.sortType == 'By most popular' ? 'gray' : '#FFFFFF';
    let color2 = this.state.sortType == 'By highest rated' ? 'gray' : '#FFFFFF';
    return (
      <Modal
        isVisible={this.state.sortingModal}
        style={styles.sortModal}>
        <View
          style={styles.modalGrid}>
          {this.ButtonView('By most popular', color)}
          {this.ButtonView('By highest rated', color2)}
        </View>
      </Modal>
    );
  }

  onChangePage(page) {
    let {search, sortType} = this.state;
    if (search) {
      getMovieService()
        .searchMovie({search: search, page: page})
        .then((res) => {
          this.setState({data: res.results, pageNumber: page}, () => {
            this.array_range(1, res.total_pages);
          });
        });
    } else {
      let data = {
        page: page,
        sort_by: sortType,
      };
      getMovieService()
        .getMovie(data)
        .then((res) => {
          this.setState({data: res.results, pageNumber: page}, () => {
            this.array_range(1, res.total_pages);
          });
        });
    }
  }

  renderPagination() {
    let {pages, pageNumber} = this.state;
    return pages.map((page, index) => {
      return (
        <TouchableOpacity
          key={'page' + index}
          onPress={this.onChangePage.bind(this, page)}
          style={{backgroundColor: pageNumber == page ? '#ffffff' : '#2352c6', height: 20,
          width: 30,
          justifyContent: 'center',
          alignItems: 'center'}}>
          <Text style={styles.pageText}>{page}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        <View style={styles.headerStyle}>
          <TextInput
            style={styles.inputText}
            value={this.state.search}
            onChangeText={(val) => {
              console.log('val', val);
              this.setState({search: val});
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={this.onSearch.bind(this)}>
            <Image
              source={require('./images/loupe.png')}
              style={{height: 30, width: 30}}
              resizeMode={'stretch'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={this.onSort.bind(this)}>
            <Image
              source={require('./images/sort.png')}
              style={{height: 25, width: 25}}
              resizeMode={'stretch'}
            />
            <Text style={styles.sortText}>Sort</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 100,
          }}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('DetailsScreen', {
                    movie: item,
                  });
                }}
                style={styles.movieGrid}>
                <Image
                  style={styles.moviePoster}
                  source={{
                    uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path,
                  }}
                />
                <Text
                  numberOfLines={2}
                  style={styles.movieTitle}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
          <ScrollView horizontal={true}>{this.renderPagination()}</ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2352c6',
    padding: 3,
  },
  headerStyle: {flexDirection: 'row', width: '100%'},
  searchButton: {
    marginTop: 12,
    marginRight: 10,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    height: 40,
    marginTop: 12,
    width: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  sortText: {color: '#000000', textAlign: 'center'},
  movieGrid: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 2,
    width: '100%',
    borderRadius: 5,
  },
  movieTitle:{
    fontSize: 14,
    color: '#000000',
    alignItems: 'center',
    width: 150,
  },

  inputText: {
    height: 45,
    width: '65%',
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: 'lightgray',
    marginTop: '3%',
    borderRadius: 5,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    marginRight: 5,
    backgroundColor: '#ffffff',
  },
  moviePoster:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 5,
  },
  pageGrid:{
    height: 20,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  pageText:{fontSize: 12, color: '#000000'},
  sortModal:{justifyContent: 'center', alignItems: 'center'},
  modalGrid:{
    height: 100,
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
