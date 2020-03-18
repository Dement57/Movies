const modalWin = document.getElementById("add-modal");
const addMovieStart = document.querySelector("header button");
const cnclMovieModalBtn = modalWin.querySelector(".btn--passive");
const addMovieModalBtn = cnclMovieModalBtn.nextElementSibling;
const BackDrop = document.getElementById("backdrop");
const userInputs = document.querySelectorAll("input");
const startDBtext = document.getElementById("entry-text");
const movies = [];

const toggleModalWin = () => {
  modalWin.classList.toggle("visible");
  toggleBackdrop();
};

const toggleBackdrop = () => {
  BackDrop.classList.toggle("visible");
};

const cancelMovieHandler = () => {
  toggleModalWin();
  clearMovieInputs();
};

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const addMovieInList = (title, imageUrl, rating) => {
  const newMovieCreate = document.createElement("li");
  const movieList = document.getElementById("movie-list");
  movieList.append(newMovieCreate);
  newMovieCreate.className = "movie-element";
  newMovieCreate.innerHTML = `
    <div class="movie-element__image">
    <img src = "${imageUrl}" alt = "${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 stars</p>
    </div>`;
};

const addMovieHandler = () => {
  const TitleValue = userInputs[0].value;
  const ImageValue = userInputs[1].value;
  const RatingValue = userInputs[2].value;
  if (
    TitleValue.trim() === "" ||
    ImageValue.trim() === "" ||
    RatingValue.trim() === "" ||
    +RatingValue < 1 ||
    +RatingValue > 5
  ) {
    alert("Please type a valid value(rating must be between 1 and 5).");
    return;
  }

  toggleModalWin();
  const newMovie = {
    Title: TitleValue,
    Image: ImageValue,
    Rating: RatingValue
  };
  movies.push(newMovie);
  console.log(movies);
  clearMovieInputs();
  addMovieInList(newMovie.Title, newMovie.Image, newMovie.Rating)
  updateUI();
};

const updateUI = () => {
  if (movies.length === 0) {
    startDBtext.style.display = "block";
  } else {
    startDBtext.style.display = "none";
  }
};

addMovieStart.addEventListener("click", toggleModalWin);
BackDrop.addEventListener("click", toggleModalWin);
cnclMovieModalBtn.addEventListener("click", cancelMovieHandler);
addMovieModalBtn.addEventListener("click", addMovieHandler);
