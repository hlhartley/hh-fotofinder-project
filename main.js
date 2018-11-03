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
document.querySelector('.add-to-album-btn');addEventListener('click', addToAlbum);
document.querySelector('.title-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.caption-input').addEventListener('keyup', disableAddToAlbumBtn);

disableAddToAlbumBtn();

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
      <img src="images/waterfall-img.png" class="card-img">
      <p class="card-caption-output">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img onclick="deleteCard()" class="delete-btn">
        <img class="favorite-btn">
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

function disableAddToAlbumBtn() {
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  var addToAlbumBtn = document.querySelector('.add-to-album-btn');
   
  if (titleInput.value === '' || captionInput.value === '') {
    addToAlbumBtn.disabled = true;
  } else {
    addToAlbumBtn.disabled = false;
  }
}


