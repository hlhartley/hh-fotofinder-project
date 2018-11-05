
// var searchInput = document.querySelector('.search-bar-input');
// var chooseFileBtn = document.querySelector('.choose-file-btn');
// var viewFavBtn = document.querySelector('.view-favorites-btn');


// Event Listeners
document.querySelector('.add-to-album-btn').addEventListener('click', addToAlbum);
document.querySelector('.title-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.caption-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);

// On page refresh
disableAddToAlbumBtn();
displayPhotos();

// Functions
function addToAlbum(){
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  event.preventDefault();
  const photo = new Photo(titleInput.value, captionInput.value);   
  createCardTemplate(photo.id, photo.title, photo.caption);
  photo.saveToStorage();
  clearInputs();
  updatePhotoArray();
  };

function createCardTemplate(id, title, caption) {
  var cardsContainer = document.querySelector('.cards-container');
  var card = `<div id=${id} class="card">
      <h2 onkeydown="pressEnterKey('title')" onfocusout="saveUserInput('title')" data-titleID="${id}" class="card-title-output" contenteditable="true">${title}</h2>
      <img src="images/waterfall-img.png" class="card-img">
      <p onkeydown="pressEnterKey('caption')" onfocusout="saveUserInput('caption')" data-captionID="${id}" class="card-caption-output" contenteditable="true">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img onclick="deleteCard()" class="delete-btn">
        <img class="favorite-btn">
      </p>
    </div>
  `;
  cardsContainer.innerHTML = card + cardsContainer.innerHTML; 
};

function displayPhotos(){
  Photo.prototype.newPhotoArray().forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption);
  })
}

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
  Photo.prototype.deleteFromStorage(cardToDeleteId);
  displayPhotos();
  updatePhotoArray();
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

function updatePhotoArray() {
  return document.getElementsByClassName('card');
}

function pressEnterKey() {
  const key = event.keyCode;
  if (key === 13) { 
    event.preventDefault();
    saveUserInput();
  }
}

function saveUserInput(element) {
  if(element === 'title') {
    var editedElement = 'title';
    var editedID = event.target.dataset.titleid;
    var editedText = event.target.innerText;
  }
  else if(element === 'caption') {
    var editedElement = 'caption';
    var editedID = event.target.dataset.captionid;
    var editedText = event.target.innerText;
  }
  Photo.prototype.updatePhoto(editedElement, editedID, editedText);
}

function filterSearch() {
  debugger
  console.log('hi');
  var searchBarInput = document.querySelector('.search-bar-input');
  var filterInput = searchBarInput.value.toLowerCase();
  var photoArray = updatePhotoArray();
  for (var i = 0; i < photoArray.length; i++) {
    if (body === -1 && caption === -1) {
      photoArray[i].setAttribute('style', 'display: none');
    } else {
      photoArray[i].setAttribute('style', 'display: block');
  }
}

document.querySelector('.show-more-btn').classList.toggle('more-less-toggle');
document.querySelector('.show-less-btn').classList.toggle('more-less-toggle');

function showMore() {
  var showMoreBtn = document.querySelector('.show-more-btn');
  var showLessBtn = document.querySelector('.show-less-btn');
  if number of cards <= 10 no buttons
  if number of cards > 10/11+ cards then show more button active
    if clicked, display all cards
}

function showLess() {
  var showMoreBtn = document.querySelector('.show-more-btn');
  var showLessBtn = document.querySelector('.show-less-btn');
  if number of cards >= 11+ then can show less button active and show more button is deactivated
    if show less button is clicked, only 10 cards are displayed
}

function favoriteHeartButton () {
  if clicked, active favorite heart button
  becomes one of "favorites"
  changes # favorites on view favorites button
}

function viewFavoritesButtons () {
  if clicked, can see all cards with active favorite heart button
}

// function noGlobVars(string) {
//   return document.querySelector(string);
// };

// var hello = noGlobVars('.guy');
// var  hello = document.querySelector('.guy');

// function hi () {
// var navBar = noGlobVars('.nav-bar');
// navBar.remove()
// }
