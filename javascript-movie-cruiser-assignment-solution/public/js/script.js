
const arrayToObj = (arrayObj) => {
	if (!Array.isArray(arrayObj) || arrayObj.length <= 0) {
		return null;
	}
	return arrayObj.reduce((obj, item) => {
		obj[item.id] = item;
		return obj;
	}, {});
};

// START - GetMovies JS
let moviesResponse;
function addMoviesDataToHtml(movies) {
	let movieHtmlText = '';
	const movieListElement = document.getElementById('moviesList');

	movies.forEach(movie => {
		movieHtmlText = movieHtmlText +
		`<li class="col-md-6 hover-effect">
			<img src=${movie.posterPath} class="img-fluid">
			<div class="overlay">${movie.title}</div>
			<button class="btn btn-primary" 
			onclick="addFavourite(${movie.id})">Add to Favourite</button>		
		</li>`;
	});
	movieListElement.innerHTML = movieHtmlText;
}

function getMovies() {
	return fetch('http://localhost:3000/movies')
		.then((response) => {
			if (response.ok && response.status === 200) {
				return Promise.resolve(response.json());
			}
			return Promise.reject(
				new Error('Error occurred while fetching movie data'));
		}).then((movies) => {
			addMoviesDataToHtml(movies);
			moviesResponse = movies;
			return Promise.resolve(movies);
		}).catch(error => {
			return Promise.reject(error);
		});
}
// END - GetMovies JS

// START - GetFavourites JS
let favouriteResponse;
function addfavouriteMoviesDataToHtml(favouriteMovies) {
	let favouritesHtmlText = '';
	const favouritesListElement = document.getElementById('favouritesList');

	favouriteMovies.forEach(movie => {
		favouritesHtmlText = favouritesHtmlText +
		`<li class="col-md-6 hover-effect">
			<img src=${movie.posterPath} class="img-fluid">
			<div class="overlay">${movie.title}</div>
		</li>`;
	});
	favouritesListElement.innerHTML = favouritesHtmlText;
}

function getFavourites() {
	return fetch('http://localhost:3000/favourites')
	.then((response) => {
		if (response.ok && response.status === 200) {
			return Promise.resolve(response.json());
		}
		return Promise.reject(
			new Error('Error occurred while fetching favourite movies data'));
	}).then((favourites) => {
		addfavouriteMoviesDataToHtml(favourites);
		favouriteResponse = favourites;
		return Promise.resolve(favourites);
	}).catch(error => {
		return Promise.reject(error);
	});
}
// END - GetFavourites JS

// START - AddFavourite JS
function addFavourite(movieId) {
	let favouriteMovieArrObj = arrayToObj(favouriteResponse);
	if (favouriteMovieArrObj !== null && typeof favouriteMovieArrObj[movieId] !== 'undefined') {
		return Promise.reject(new Error('Movie is already added to favourites'));
	}
	let movieArrObj = arrayToObj(moviesResponse);
	let postRequestParam = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(movieArrObj[movieId])
	};
	return fetch('http://localhost:3000/favourites', postRequestParam)
	.then((response) => {
		if (response.ok) {
			return response.json();
		}
		return Promise.reject(new Error('Error occurred while adding movie to favourites'));
	}).then((movieData) => {
		favouriteResponse.push(movieData);
		addfavouriteMoviesDataToHtml(favouriteResponse);
		return Promise.resolve(favouriteResponse);
	}).catch(error => {
		return Promise.reject(error);
	});
}
// END - AddFavourite JS

module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


