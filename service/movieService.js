import {BASE_URL,API_KEY} from "../screens/Common/config"
export default class MovieService {

  getMovie(data) {

    let URL = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${data.sort_by}&include_adult=false&include_video=false&page=${data.page}`;
    
    return fetch(URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    
    })
      .then((res) => {
        return res.json()
      })
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.log('err', err);
      })
  }

  searchMovie(data){
    let URL = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`+data.search+'&page='+data.page;
    
    return fetch(URL, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    
    })
      .then((res) => {
        return res.json()
      })
      .then((responseJSON) => {
        return responseJSON;
      })
      .catch((err) => {
        console.log('err', err);
      })
  }

}





