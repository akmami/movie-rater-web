export class API {
    
    static loginUser(body) {
        return fetch(`https://movie-rater-tutorial-akmami.herokuapp.com/auth/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( response => response.json() )
    }

    static registerUser(body) {
        return fetch(`https://movie-rater-tutorial-akmami.herokuapp.com/api/users/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then( response => response.json() )
    }

    static getMovies(token) {
        return fetch("https://movie-rater-tutorial-akmami.herokuapp.com/api/movies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then( response => response.json())
        .catch( error => console.log(error));
    }

    static updateMovie(movie_id, body, TOKEN) {
        return fetch(`https://movie-rater-tutorial-akmami.herokuapp.com/api/movies/${movie_id}/`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
        .then( response => response.json() )
    }

    static createMovie(body, TOKEN) {
        return fetch(`https://movie-rater-tutorial-akmami.herokuapp.com/api/movies/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify(body)
        })
        .then( response => response.json() )
    }

    static deleteMovie(movie_id, TOKEN) {
        return fetch(`https://movie-rater-tutorial-akmami.herokuapp.com/api/movies/${movie_id}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${TOKEN}`
            }
        })
    }
}