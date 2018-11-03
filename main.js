// function noGlobVars(string) {
//   return document.querySelector(string);
// };

// var hello = noGlobVars('.guy');
// var  hello = document.querySelector('.guy');

// function hi () {
// var navBar = noGlobVars('.nav-bar');
// navBar.remove()
// }

var searchInput = document.querySelector('.search-bar-input');
var titleInput = document.querySelector('.title-input');
var captionInput = document.querySelector('.caption-input');
var chooseFileBtn = document.querySelector('.choose-file-btn');
var viewFavBtn = document.querySelector('.view-favorites-btn');
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var cardsContainer = document.querySelector('.cards-container');

addToAlbumBtn.addEventListener('click', addToAlbum);

function addToAlbum(){
  event.preventDefault();
  const photo = new Photo(titleInput.value, captionInput.value);   
  createCardTemplate(photo.title, photo.caption);
  clearInputs();
  };

function createCardTemplate(title, caption) {
  var card = `<div class="card">
      <h2 class="card-title-output">${title}</h2>
      <img src="images/waterfall-img.png" class="background-img">
      <p class="card-caption-output">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img src="images/delete.svg" alt="delete button" class="delete-btn">
        <img src="images/favorite.svg" alt="favorite button" class="favorite-btn">
      </p>
    </div>
  `;
  cardsContainer.innerHTML = card + cardsContainer.innerHTML; 
};

function clearInputs() {
  titleInput.value = '';
  captionInput.value = '';
}
