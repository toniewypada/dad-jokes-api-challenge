const endpoint = 'https://icanhazdadjoke.com/';
const request = new XMLHttpRequest();
const button = document.querySelector('button');
const jokeSection = document.getElementById('joke');
const errorContainer = document.getElementById('error-container');
const errorMsg = document.getElementById('error-message');

const showJoke = (joke) =>{
    jokeSection.innerHTML = joke;
    
}

const showError = (error) => {
    errorContainer.style.display = 'block';
    errorMsg.innerHTML = error;
}

const getJoke = () =>{
    request.open('GET', endpoint);
    request.setRequestHeader('Accept', 'application/json');
    request.responseType = 'json';
    
    request.onload = () =>{
        showJoke(request.response.joke);
    }

    request.onerror = () =>{
        showError('An error occured, please try again.')
    }

    request.send();
}

button.addEventListener('click', () =>{
    getJoke();
})