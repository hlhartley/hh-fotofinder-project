// Event Listeners
document.querySelector('.add-to-album-btn').addEventListener('click', addToAlbum);
document.querySelector('.title-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.caption-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);

// On page refresh
disableAddToAlbumBtn();
displayPhotos();

// Functions
var reader = new FileReader();
window.onload = appendPhotos;

function addToAlbum(){
  let fileInput = document.querySelector('.file');
    if (fileInput.files[0]) {
      reader.readAsDataURL(fileInput.files[0]); 
      reader.onload = addPhoto;
    };
  };

function addPhoto(e) {
  const photoGallery = document.querySelector('.file-display-area');
  const imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
  const newPhoto = new Photo(Date.now(), e.target.result);
    photoGallery.innerHTML += `<img src=${e.target.result} />`;
    imagesArr.push(newPhoto);
    newPhoto.saveToStorage(imagesArr)
};

function addPhoto(e) {
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  event.preventDefault();
  const photo = new Photo(titleInput.value, captionInput.value);   
  createCardTemplate(photo.id, photo.title, photo.caption, e.target.result);
  photo.saveToStorage();
  clearInputs();
}

function appendPhotos() {
  var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
  imagesArr.forEach(photo => photoGallery.innerHTML += `<img src=${photo.file} />`)
};

function createCardTemplate(id, title, caption, photoresult) {
  console.log(photoresult);
  var cardsContainer = document.querySelector('.cards-container');
  var card = `<div id=${id} class="card">
      <h2 onkeydown="pressEnterKey('title')" onfocusout="saveUserInput('title')" data-titleID="${id}" class="card-title-output" contenteditable="true">${title}</h2>
      <div class="file-display-area">
        <img src="${photoresult}" class="card-img">
      </div>
      <p onkeydown="pressEnterKey('caption')" onfocusout="saveUserInput('caption')" data-captionID="${id}" class="card-caption-output" contenteditable="true">${caption}
      </p>
      <p class="trash-fav-button-container">
        <img onclick="deleteCard()" class="delete-btn">
        <img onclick="favoriteHeartButton()" data-photoID="${id}" class="favorite-btn">
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

function displayFilteredPhotos(photos) {
  photos.forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption);
  }) 
}

function filterSearch() {
  console.log('hi');
  var searchBarInput = document.querySelector('.search-bar-input');
  var filterInput = searchBarInput.value.toLowerCase();

  var filteredPhotos = Photo.prototype.newPhotoArray().filter(function(photo) {
    return photo.title.toLowerCase().includes(filterInput) || photo.caption.toLowerCase().includes(filterInput);
  })
  clearCardContainer();
  displayFilteredPhotos(filteredPhotos);
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
  clearCardContainer();
  displayPhotos();
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

function pressEnterKey() {
  const key = event.keyCode;
  if (key === 13) { 
    event.preventDefault();
    saveUserInput();
  }
}

function saveUserInput(element) {
  if (element === 'title') {
    var editedElement = 'title';
    var editedID = event.target.dataset.titleid;
    var editedText = event.target.innerText;
  }
  else if (element === 'caption') {
    var editedElement = 'caption';
    var editedID = event.target.dataset.captionid;
    var editedText = event.target.innerText;
  }
  Photo.prototype.updatePhoto(editedElement, editedID, editedText);
}

function clearCardContainer() {
  var cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = '';
}

function favoriteHeartButton () {
  Photo.prototype.saveFavoritePhotos();
}
 

var viewFavBtn = document.querySelector('.view-favorites-btn');
viewFavBtn.addEventListener('click', viewFavoritesButton);  

function viewFavoritesButton () {
  clearCardContainer();
  Photo.prototype.newPhotoArray().forEach(function(photo) {
    if (photo.favorite === true) {
      createCardTemplate(photo.id, photo.title, photo.caption);
    }
  })
}

// document.querySelector('.show-more-btn').classList.toggle('more-less-toggle');
// document.querySelector('.show-less-btn').classList.toggle('more-less-toggle');

// function showMore() {
//   var showMoreBtn = document.querySelector('.show-more-btn');
//   var showLessBtn = document.querySelector('.show-less-btn');
  
//   Photo.prototype.newPhotoArray().length

//   if number of cards <= 10 no buttons
//   if number of cards > 10/11+ cards then show more button active
//     if clicked, display all cards
// }

// function showLess() {
//   var showMoreBtn = document.querySelector('.show-more-btn');
//   var showLessBtn = document.querySelector('.show-less-btn');
//   if number of cards >= 11+ then can show less button active and show more button is deactivated
//     if show less button is clicked, only 10 cards are displayed
// }




// function noGlobVars(string) {
//   return document.querySelector(string);
// };

// var hello = noGlobVars('.guy');
// var  hello = document.querySelector('.guy');

// function hi () {
// var navBar = noGlobVars('.nav-bar');
// navBar.remove()
// }
