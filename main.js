const api =
  "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
const BE_URL = "http://localhost:5000";
const generateButton = document.querySelector(".btn");
const jokeContainer = document.querySelector(".joke-container");
const jokeText = document.querySelector(".joke-text");
const rating = document.querySelector(".rating");
const likeText = document.getElementById("likeText");
const dislikeText = document.getElementById("dislikeText");
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

let jokeId = null;

async function generateJoke() {
  const response = await fetch(api);
  const data = await response.json();
  jokeId = data.id;

  const res = await fetch(BE_URL + `/${jokeId}`);
  const { doc } = await res.json();

  likeBtn.disabled = false;
  dislikeBtn.disabled = false;

  jokeContainer.classList.add("animated");
  rating.style.display = "flex";
  jokeText.style.opacity = "0";
  jokeText.innerHTML = data.joke;
  likeText.innerHTML = doc.like;
  dislikeText.innerHTML = doc.dislike;
  setTimeout(() => {
    jokeContainer.classList.remove("animated");
    jokeContainer.style.transform = "scale(1)";
    jokeContainer.style.padding = "4rem";
    jokeText.classList.add("joke-text-animated");
  }, 500);

  setTimeout(() => {
    jokeText.classList.remove("joke-text-animated");
    jokeText.style.opacity = "1";
  }, 1200);
}

async function like() {
  console.log(jokeId);
  const response = await fetch(BE_URL + "/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jokeId }),
  });

  const data = await response.json();

  if (response.status === 201) {
    likeText.innerHTML = data.doc.like;
    dislikeText.innerHTML = data.doc.dislike;
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  } else {
    alert(data.message);
  }
}

async function dislike() {
  const response = await fetch(BE_URL + "/dislike", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jokeId }),
  });

  const data = await response.json();

  if (response.status === 201) {
    likeText.innerHTML = data.doc.like;
    dislikeText.innerHTML = data.doc.dislike;
    likeBtn.disabled = true;
    dislikeBtn.disabled = true;
  } else {
    alert(data.message);
  }
}

likeBtn.addEventListener("click", like);
dislikeBtn.addEventListener("click", dislike);

generateButton.addEventListener("click", generateJoke);
