import MovieService from './movieService';

let movie;

export function getMovieService() {
    if (!movie) {
        movie = new MovieService();
    }
    return movie
}
