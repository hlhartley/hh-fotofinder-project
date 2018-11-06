var favoritesCounter = 0;

// Event Listeners
document.querySelector('.add-to-album-btn').addEventListener('click', addToAlbum);
document.querySelector('.title-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.caption-input').addEventListener('keyup', disableAddToAlbumBtn);
document.querySelector('.search-bar-input').addEventListener('keyup', filterSearch);

// On page refresh
disableAddToAlbumBtn();
displayAllPhotos();
showMoreLessCards();
displayNumberOfFavorites();


// Functions
var reader = new FileReader();
window.onload = appendPhotos;

function addToAlbum(){
  let fileInput = document.querySelector('.file');
  if (fileInput.files[0]) {
    reader.readAsDataURL(fileInput.files[0]); 
    reader.onload = addPhoto;
  };
  showMoreLessCards();
};


function addPhoto(e) {
  e.preventDefault();
  var titleInput = document.querySelector('.title-input');
  var captionInput = document.querySelector('.caption-input');
  console.log(e.target.result);
  const photo = new Photo(titleInput.value, captionInput.value, e.target.result);   
  createCardTemplate(photo.id, photo.title, photo.caption, e.target.result);
  photo.saveToStorage();
  clearInputs();
}

function appendPhotos() {
  var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
  imagesArr.forEach(photo => photoGallery.innerHTML += `<img src=${photo.file} />`)
};

function createCardTemplate(id, title, caption, photoresult) {
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
        <img onclick="favoriteHeartButton()" data-photoID="${id}" class="favorite-btn" src="images/favorite.svg">
      </p>
    </div>
  `;
  cardsContainer.innerHTML = card + cardsContainer.innerHTML; 
};

function displayAllPhotos(){
  Photo.prototype.newPhotoArray().forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
  })
}

function displayFilteredPhotos(photos) {
  photos.forEach(function(photo) {
    createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
  }) 
}

function displayFavoritedPhotos() {
  Photo.prototype.newPhotoArray().forEach(function(photo) {
    if (photo.favorite === true) {
      createCardTemplate(photo.id, photo.title, photo.caption, photo.file);
    }
  })
}

function filterSearch() {
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
  displayAllPhotos();
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

function favoriteHeartButton() {
  let foundPhoto = Photo.prototype.saveFavoritePhotos();
  if (foundPhoto.favorite) {
    favoritesCounter++;
    event.target.src = "images/favorite-active.svg";
  } else {
    favoritesCounter--;
    event.target.src = "images/favorite.svg";
  }
  displayNumberOfFavorites();
}

function displayNumberOfFavorites() {
  let numberOfFavs = document.querySelector('.view-favorites-btn');
  numberOfFavs.innerText = `View ${favoritesCounter} Favorites`;
}

var viewFavBtn = document.querySelector('.view-favorites-btn');
viewFavBtn.addEventListener('click', viewFavoritesButton);  

function viewFavoritesButton() {
  clearCardContainer();
  showAllButton();
}

function showAllButton() {
  if (viewFavBtn.innerText === "View All Photos") {
    displayAllPhotos();
    viewFavBtn.innerText = `View ${favoritesCounter} Favorites`;
  } else {
    displayFavoritedPhotos();
    viewFavBtn.innerText = "View All Photos";
  }
}

document.querySelector('.show-more-btn').addEventListener('click', showMoreLessCards);
document.querySelector('.show-less-btn').addEventListener('click', showMoreLessCards);

function showMoreLessCards() {
  var showMoreBtn = document.querySelector('.show-more-btn');
  var showLessBtn = document.querySelector('.show-less-btn');
    showMoreBtn.classList.toggle('more-less-toggle');
    showLessBtn.classList.toggle('more-less-toggle');
}

// view all photos button needs to show all photos again

//   if (Photo.prototype.newPhotoArray().length >= 10) {
//     showMoreBtn.classList.remove('display-none');
//     showLessBtn.classList.add('display-none');
//     showMoreBtn.classList.toggle('more-less-toggle');
//     showLessBtn.classList.toggle('more-less-toggle');
//     click display more => display all id cards
//   } else {
//     showMoreBtn.classList.add('display-none');
//     showLessBtn.classList.remove('display-none');
//     showMoreBtn.classList.toggle('more-less-toggle');
//     showLessBtn.classList.toggle('more-less-toggle');
//     display show less btn
//     show less btn => display id cards 1-10
//   }

// function displayOnlyTenCards() {
//   display id cards 1-10
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
