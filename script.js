//endpoint and request
const endpoint = "https://icanhazdadjoke.com/";
const request = new XMLHttpRequest();

//selectors
const button = document.querySelector("button");
const buttonCtaSelector = document.getElementById("cta");
const jokeSection = document.getElementById("joke");
const errorContainer = document.getElementById("error-container");
const errorMsg = document.getElementById("error-message");
const loader = document.getElementById("loader");

const setDisabledUIState = (isDisabled) => {
  if (isDisabled) {
    setLoaderState(false);
    setButtonState(false);
  } else {
    setButtonState(true);
    setLoaderState(true);
  }
};

const showJoke = (joke) => {
  setDisabledUIState(true);
  jokeSection.innerHTML = joke;
};

const showError = (error) => {
  setDisabledUIState(true);
  errorContainer.style.display = "block";
  errorMsg.innerHTML = error;
};

const setLoaderState = (isVisible) => {
  const displayState = isVisible ? "block" : "none";
  loader.style.display = displayState;
};

const setButtonState = (isDisabled) => {
  if (isDisabled) {
    button.setAttribute("disabled", "disabled");
  } else {
    button.removeAttribute("disabled");
  }

  const buttonState = isDisabled ? "none" : "block";
  buttonCtaSelector.style.display = buttonState;
};

const setButtonCta = (isError) => {
  const buttonCta = isError ? "Please try again" : "Get another joke!";

  buttonCtaSelector.innerHTML = buttonCta;
};

const getJoke = () => {
  request.open("GET", endpoint);
  request.setRequestHeader("Accept", "application/json");
  request.responseType = "json";

  request.onload = () => {
    showJoke(request.response.joke);
    setButtonCta(false);
  };

  request.onerror = () => {
    showError("An error occured, please try again.");
    setButtonCta(true);
  };

  request.send();
};

button.addEventListener("click", () => {
  setDisabledUIState(false);
  getJoke();
});
