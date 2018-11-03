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
var chooseFileBtn = document.querySelector('.choose-file-btn');
var viewFavBtn = document.querySelector('.view-favorites-btn');


// Event Listeners
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
addToAlbumBtn.addEventListener('click', addToAlbum);

// Functions
function addToAlbum(){
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  event.preventDefault();
  const photo = new Photo(1, titleInput.value, captionInput.value);   
  createCardTemplate(photo.id, photo.title, photo.caption);
  clearInputs();
  };

function createCardTemplate(id, title, caption) {
  var cardsContainer = document.querySelector('.cards-container');
  var card = `<div id=${id} class="card">
      <h2 class="card-title-output">${title}</h2>
      <img src="images/waterfall-img.png" class="background-img">
      <p class="card-caption-output">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img onclick="deleteCard()" src="images/delete.svg" alt="delete button" class="delete-btn">
        <img src="images/favorite.svg" alt="favorite button" class="favorite-btn">
      </p>
    </div>
  `;
  cardsContainer.innerHTML = card + cardsContainer.innerHTML; 
};

function clearInputs() {
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  titleInput.value = '';
  captionInput.value = '';
}

function deleteCard() {
  if (event.target.classList.contains('delete-btn')) {
   event.target.closest('div').remove();
   var cardToDeleteId = event.target.closest('div').id;
  }
}
